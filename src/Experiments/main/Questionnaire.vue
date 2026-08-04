<template>
  <Screen>
    <h2>Kurzer Fragebogen</h2>

    <!-- Step 1: Peculiar descriptions yes/no -->
    <div v-if="step === 1" class="question">
      <p>
        Fandest du die Art und Weise, wie Leo die Beschreibungen formuliert hat, irgendwie merkwürdig?
      </p>

      <div class="radio-container">
        <label>
          <input type="radio" value="yes" v-model="peculiar" />
          Ja
        </label>

        <label>
          <input type="radio" value="no" v-model="peculiar" />
          Nein
        </label>
      </div>

      <button :disabled="!peculiar" @click="step = 2">
        Weiter
      </button>
    </div>

    <!-- Step 2: Peculiar explanation or strategy -->
    <div v-if="step === 2" class="question">
      <div v-if="peculiar === 'yes'">
        <p>Was war merkwürdig an den Beschreibungen?</p>
        <textarea v-model="peculiarExplanation"></textarea>
      </div>

      <div v-if="peculiar === 'no'">
        <p>Bitte erläutere die Strategie, die du im zweiten Teil des Spiels zur Auswahl der gesuchten Objekte verwendet hast.</p>
        <textarea v-model="strategyExplanation"></textarea>
      </div>

      <button :disabled="!canContinueFromStep2" @click="step = 3">
        Weiter
      </button>
    </div>

    <!-- Step 3: Suspicion yes/no -->
    <div v-if="step === 3" class="question">
      <p>
        Hast du jemals vermutet, dass Leo sehen konnte, welches Objekt sich im grauen Feld befand?
      </p>

      <div class="radio-container">
        <label>
          <input type="radio" value="yes" v-model="suspicion" />
          Ja
        </label>

        <label>
          <input type="radio" value="no" v-model="suspicion" />
          Nein
        </label>
      </div>

      <button :disabled="!suspicion" @click="step = 4">
        Weiter
      </button>
    </div>

    <!-- Step 4: Suspicion follow-up -->
    <div v-if="step === 4" class="question">
      <div v-if="suspicion === 'no'">
        <p>Bitte erkläre warum.</p>
        <textarea v-model="suspicionNoExplanation"></textarea>
      </div>

      <div v-if="suspicion === 'yes'">
        <p>Bitte erkläre warum.</p>
        <textarea v-model="suspicionYesExplanation"></textarea>

        <p class="followup-question">
          Bitte nenne Beispiele aus dem Spiel.
        </p>
        <textarea v-model="suspicionExamples"></textarea>
      </div>

      <button :disabled="!canSubmit" @click="submitQuestionnaire">
        Weiter
      </button>
    </div>
  </Screen>
</template>

<script>
export default {
  name: "Questionnaire",
  data() {
    return {
      step: 1,
      peculiar: "",
      peculiarExplanation: "",
      strategyExplanation: "",
      suspicion: "",
      suspicionYesExplanation: "",
      suspicionNoExplanation: "",
      suspicionExamples: ""
    };
  },
  computed: {
    canContinueFromStep2() {
      if (this.peculiar === "yes") {
        return this.peculiarExplanation.trim();
      }

      if (this.peculiar === "no") {
        return this.strategyExplanation.trim();
      }

      return false;
    },

    canSubmit() {
      if (this.suspicion === "yes") {
        return (
          this.suspicionYesExplanation.trim() &&
          this.suspicionExamples.trim()
        );
      }

      if (this.suspicion === "no") {
        return this.suspicionNoExplanation.trim();
      }

      return false;
    }
  },
  methods: {
    submitQuestionnaire() {
      this.$magpie.addTrialData({
        trial_type: "questionnaire",

        peculiar_answer: this.peculiar,
        peculiar_explanation: this.peculiarExplanation,
        strategy_explanation: this.strategyExplanation,

        suspicion_answer: this.suspicion,
        suspicion_yes_explanation: this.suspicionYesExplanation,
        suspicion_no_explanation: this.suspicionNoExplanation,
        suspicion_examples: this.suspicionExamples
      });

      this.$magpie.nextScreen();
    }
  }
};
</script>

<style scoped>
.question {
  margin-bottom: 25px;
  font-size: 18px;
}

label {
  display: block;
  margin: 8px 0;
}

textarea {
  width: 100%;
  max-width: 800px;
  min-height: 120px;
}

button {
  margin-top: 20px;
}

.radio-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
}

.radio-container label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
}

.followup-question {
  margin-top: 25px;
}
</style>