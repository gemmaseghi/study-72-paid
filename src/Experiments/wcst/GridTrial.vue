<template>
  <Screen>
    <div class="wcst-layout">
      <header class="trial-header">
        <h2>Sortiere die Karte</h2>
      </header>

      <!-- Current stimulus card -->
      <div class="current-card-area">
        <img
          v-if="currentCard"
          class="current-card"
          :src="currentCard.image"
          :alt="currentCard.card_id"
        />
      </div>

      <!-- Feedback -->
      <div class="feedback-area">
        <p
          v-if="feedback"
          :class="[
            'feedback-message',
            feedback === 'Richtig' ? 'correct' : 'incorrect'
          ]"
        >
          {{ feedback }}
        </p>
      </div>

      <!-- Four clickable reference cards -->
      <div class="reference-cards">
        <button
          v-for="deck in referenceCards"
          :key="deck.deck_id"
          type="button"
          class="reference-card-button"
          :disabled="responseLocked || !currentCard"
          @click="selectDeck(deck)"
        >
          <img
            class="reference-card"
            :src="deck.image"
            :alt="deck.card_id"
          />
        </button>
      </div>
    </div>
  </Screen>
</template>

<script>
import {
  allCards,
  referenceCards,
  createRuleSequence,
  shuffle
} from "./trials";

export default {
  name: "WCSTGrid",

  data() {
    return {
      referenceCards,

      /*
       * One shuffled deck containing all 64 cards.
       * The task ends after the final card and is not reshuffled.
       */
      activeDeck: shuffle(allCards),
      currentDeckIndex: 0,

      /*
       * Fixed sequence:
       * color → shape → number → color → shape → number
       */
      ruleSequence: createRuleSequence(),
      currentRuleIndex: 0,

      /*
       * A category is completed after 10 consecutive
       * correct responses.
       */
      trialsInCurrentRule: 0,
      correctResponsesInCurrentRule: 0,

      totalMistakes: 0,
      totalTrialNumber: 1,

      feedback: "",
      responseLocked: false,
      trialStartTime: null,

      responses: []
    };
  },

  computed: {
    currentCard() {
      return this.activeDeck[this.currentDeckIndex] || null;
    },

    currentRule() {
      return this.ruleSequence[this.currentRuleIndex] || null;
    },

    currentRuleBlock() {
      return this.currentRuleIndex + 1;
    }
  },

  mounted() {
    this.trialStartTime = performance.now();

    console.log("WCST component mounted");
    console.log("Number of cards:", this.activeDeck.length);
    console.log("Rule sequence:", this.ruleSequence);
  },

  methods: {
    /*
     * Finds the reference card matching the stimulus card
     * according to the currently active sorting rule.
     */
    getCorrectDeck(card) {
      if (!card || !this.currentRule) {
        return null;
      }

      return this.referenceCards.find(deck => {
        return deck[this.currentRule] === card[this.currentRule];
      });
    },

    selectDeck(selectedDeck) {
      if (
        this.responseLocked ||
        !this.currentCard ||
        !this.currentRule
      ) {
        return;
      }

      this.responseLocked = true;

        /*
        * Save the current trial state before changing any counters.
        */
      const stimulusCard = this.currentCard;
      const activeRule = this.currentRule;
      const activeRuleIndex = this.currentRuleIndex;
      const activeRuleBlock = this.currentRuleBlock;

      const responseTime =
        performance.now() - this.trialStartTime;

      const correctDeck = this.getCorrectDeck(stimulusCard);

      if (!correctDeck) {
        console.error("No correct reference card found.", {
          card: stimulusCard,
          rule: activeRule
        });

        this.responseLocked = false;
        return;
      }

      const isCorrect =
        selectedDeck.deck_id === correctDeck.deck_id;

        /*
        * Consecutive-correct counter before this response.
        */
      const consecutiveCorrectBefore =
        this.correctResponsesInCurrentRule;

        /*
        * Update the consecutive-correct counter.
        * An incorrect response resets it to zero.
        */
      if (isCorrect) {
        this.correctResponsesInCurrentRule += 1;
        this.feedback = "Richtig";
      } else {
        this.correctResponsesInCurrentRule = 0;
        this.totalMistakes += 1;
        this.feedback = "Falsch";
      }

      this.trialsInCurrentRule += 1;

        /*
        * Consecutive-correct counter after this response.
        */
      const consecutiveCorrectAfter =
        this.correctResponsesInCurrentRule;

      const ruleCompleted =
        consecutiveCorrectAfter >= 10;

        /*
        * The rule changes only when a category is completed
        * and another rule remains in the sequence.
        */
      const ruleChangedAfterResponse =
        ruleCompleted &&
        activeRuleIndex < this.ruleSequence.length - 1;

      const nextRule = ruleChangedAfterResponse
        ? this.ruleSequence[activeRuleIndex + 1]
        : null;

      const isFinalCard =
        this.currentDeckIndex ===
        this.activeDeck.length - 1;

      this.responses.push({
            /*
            * General trial information
            */
        trial_number: this.totalTrialNumber,
        position_in_deck: this.currentDeckIndex + 1,
        rt_ms: responseTime,

            /*
            * Active rule
            */
        rule_before_response: activeRule,
        rule_index_before_response: activeRuleIndex,
        rule_block_before_response: activeRuleBlock,

        rule_completed: ruleCompleted,
        rule_changed_after_response: ruleChangedAfterResponse,
        next_rule: nextRule,

            /*
            * Consecutive-correct counter
            */
        consecutive_correct_before_response:
        consecutiveCorrectBefore,

        consecutive_correct_after_response:
        consecutiveCorrectAfter,

            /*
            * Number of trials attempted under the current rule
            */
        trial_within_rule: this.trialsInCurrentRule,

            /*
            * Stimulus/target card shown at the top
            */
        target_card_number: stimulusCard.card_number,
        target_card_id: stimulusCard.card_id,
        target_shape: stimulusCard.shape,
        target_color: stimulusCard.color,
        target_number: stimulusCard.number,

            /*
            * Reference card selected by the participant
            */
        selected_deck_id: selectedDeck.deck_id,
        selected_card_id: selectedDeck.card_id,
        selected_shape: selectedDeck.shape,
        selected_color: selectedDeck.color,
        selected_number: selectedDeck.number,

            /*
            * Correct reference card under the active rule
            */
        correct_deck_id: correctDeck.deck_id,
        correct_card_id: correctDeck.card_id,
        correct_shape: correctDeck.shape,
        correct_color: correctDeck.color,
        correct_number: correctDeck.number,

            /*
            * Response outcome
            */
        correct: isCorrect,
        feedback: this.feedback,

        total_correct_so_far:
            this.responses.filter(
              response => response.correct
            ).length + (isCorrect ? 1 : 0),

        total_incorrect_so_far: this.totalMistakes,

        final_card: isFinalCard
      });

      window.setTimeout(() => {
        this.advanceTrial(ruleCompleted);
      }, 800);
    },

    advanceTrial(ruleCompleted) {
      /*
       * End immediately when the participant completes
       * the sixth and final category.
       */
      const completedFinalRule =
        ruleCompleted &&
        this.currentRuleIndex ===
          this.ruleSequence.length - 1;

      if (completedFinalRule) {
        this.finishTask("six_rules_completed");
        return;
      }

      /*
       * End after the participant has responded to
       * the 64th and final card.
       */
      const reachedEndOfDeck =
        this.currentDeckIndex ===
        this.activeDeck.length - 1;

      if (reachedEndOfDeck) {
        this.finishTask("deck_completed");
        return;
      }

      /*
       * Move to the next rule after 10 consecutive
       * correct responses.
       */
      if (ruleCompleted) {
        this.currentRuleIndex += 1;
        this.correctResponsesInCurrentRule = 0;
        this.trialsInCurrentRule = 0;
      }

      this.currentDeckIndex += 1;
      this.totalTrialNumber += 1;

      this.feedback = "";
      this.responseLocked = false;
      this.trialStartTime = performance.now();
    },

    finishTask(terminationReason) {
      const completedRuleBlocks =
        this.responses.filter(
          response => response.rule_completed
        ).length;

      const totalCorrect =
        this.responses.filter(
          response => response.correct
        ).length;

      const completedAllCategories =
        terminationReason === "six_rules_completed";

      const trialData = {
        experiment: "wcst",

        termination_reason: terminationReason,

        /*
         * The task ended normally in both cases, but this
         * records whether all six categories were achieved.
         */
        task_finished: true,
        completed_all_categories: completedAllCategories,

        total_trials: this.responses.length,
        total_cards_available: this.activeDeck.length,

        rules_started: Math.min(
          this.currentRuleIndex + 1,
          this.ruleSequence.length
        ),

        completed_rule_blocks: completedRuleBlocks,

        rule_sequence: JSON.stringify(
          this.ruleSequence
        ),

        total_correct: totalCorrect,
        total_incorrect: this.totalMistakes,

        responses_json: JSON.stringify(
          this.responses
        )
      };

      console.log("WCST finished:", trialData);

      this.$magpie.addTrialData(trialData);

      /*
       * Moves to the next screen specified in App.vue,
       * such as the end instructions.
       */
      this.$magpie.nextScreen();
    }
  }
};
</script>

<style scoped>
.wcst-layout {
  width: min(1000px, 95vw);
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.trial-header {
  margin-bottom: 20px;
}

.current-card-area {
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-card,
.reference-card {
  width: 200px;
  height: 260px;
  object-fit: contain;
}

.feedback-area {
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-message {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

.reference-cards {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 5px;
}

.reference-card-button {
  padding: 0;
  border: 3px solid transparent;
  border-radius: 16px;
  background: transparent;
  cursor: pointer;
}

.reference-card-button:hover:not(:disabled),
.reference-card-button:focus:not(:disabled) {
  border-color: #f8f4f4;
}

.reference-card-button:disabled {
  cursor: default;
}

@media (max-width: 900px) {
  .current-card,
  .reference-card {
    width: 150px;
    height: 195px;
  }

  .reference-cards {
    gap: 5px;
  }
}
</style>