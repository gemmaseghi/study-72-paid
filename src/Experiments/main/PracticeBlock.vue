<template>
  <Screen>
    <div v-if="step === 'intro'" class="practice-instructions">
      <h2>Übung</h2>
      <p>
        Du absolvierst nun eine kurze Übungsrunde, um zu verstehen, wie die
        Aufgabe funktioniert. Bitte wähle das Objekt aus, auf das sich Leo
        deiner Meinung nach bezieht.
      </p>
      <button @click="startPractice">Übung starten</button>
    </div>

    <div v-if="step === 'trial'">
      <div v-if="imagesReady" class="block-layout">
        <div class="history-row">
          <div
            v-for="(trial, index) in practiceTrials"
            :key="trial.id"
            class="history-slot"
            :class="{ empty: !responses[index] }"
          >
            <template v-if="responses[index]">
              <div class="history-utterance">{{ trial.utterance }}</div>

              <div class="history-grid-wrapper">
                <img :src="trial.image" class="history-stimulus" />

                <div
                  v-if="responses[index]"
                  class="selection-marker small"
                  :class="responses[index].response"
                />
              </div>
            </template>
          </div>
        </div>

        <div
          v-if="
            currentGrid < practiceTrials.length &&
            !responses[currentGrid]
          "
          class="active-area"
        >
          <h3 class="active-utterance">
            {{ practiceTrials[currentGrid].utterance }}
          </h3>

          <div class="active-grid-wrapper">
            <img
              :src="practiceTrials[currentGrid].image"
              class="active-stimulus"
            />

            <button
              class="cell top-left"
              @click="selectObject('topLeft')"
            />
            <button
              class="cell top-right"
              @click="selectObject('topRight')"
            />
            <button
              class="cell bottom-left"
              @click="selectObject('bottomLeft')"
            />
            <button
              class="cell bottom-right"
              @click="selectObject('bottomRight')"
            />

            <div
              v-if="responses[currentGrid]"
              class="selection-marker"
              :class="responses[currentGrid].response"
            />
          </div>
        </div>
      </div>

      <div v-else class="preload-placeholder"></div>
    </div>

    <div v-if="step === 'done'" class="practice-instructions">
      <h2>Ende der Übung</h2>
      <p>
        Die Übungsrunde ist nun abgeschlossen. Auf dem nächsten Bildschirm
        beginnt das eigentliche Experiment.
      </p>
      <button @click="$magpie.nextScreen()">Weiter</button>
    </div>
  </Screen>
</template>
<script>
export default {
  name: "PracticeBlock",
  props: {
    practiceTrials: Array
  },
  data() {
    return {
      step: "intro",
      currentGrid: 0,
      blockStartTime: null,
      gridStartTime: null,
      responses: [],
      advanceDelay: 250,
      imagesReady: false
    };
  },
  methods: {
    startPractice() {
      this.currentGrid = 0;
      this.responses = [];
      this.imagesReady = false;
      this.step = "trial";

      this.preloadPracticeImages().then(() => {
        this.imagesReady = true;

        this.$nextTick(() => {
          requestAnimationFrame(() => {
            this.blockStartTime = performance.now();
            this.gridStartTime = performance.now();
          });
        });
      });
    },

    preloadPracticeImages() {
      const imagePaths = this.practiceTrials.map(trial => trial.image);

      const preloadOne = src =>
        new Promise(resolve => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        });

      return Promise.all(imagePaths.map(preloadOne));
    },

    hasResponse(index) {
      return Boolean(this.responses[index]);
    },

    selectObject(cell) {
      const now = performance.now();
      const trial = this.practiceTrials[this.currentGrid];

      const correctAnswers = Array.isArray(trial.correctAnswer)
        ? trial.correctAnswer
        : [trial.correctAnswer];

      const isCorrect = correctAnswers.includes(cell);

      this.$set(this.responses, this.currentGrid, {
        trial_type: "practice_object_trial",
        trial_id: trial.id,
        phase: trial.phase,
        block_id: trial.block_id,
        trial_in_block: trial.trial_in_block,
        condition: trial.condition,
        utterance: trial.utterance,
        grey_cell: trial.greyCell,
        response: cell,
        correct_answer: correctAnswers.join(","),
        correct: isCorrect,
        rt: now - this.gridStartTime
      });

      if (this.currentGrid < this.practiceTrials.length - 1) {
        this.currentGrid += 1;

        this.$nextTick(() => {
          requestAnimationFrame(() => {
            this.gridStartTime = performance.now();
          });
        });
      } else {
        this.currentGrid += 1;

        setTimeout(() => {
          this.finishPractice(now);
        }, this.advanceDelay);
      }
    },

    finishPractice(endTime) {
      const blockRT = endTime - this.blockStartTime;

      const trialData = {
        trial_type: "practice_block",
        phase: "practice",
        block_id: 0,
        block_rt: blockRT,
        block_responses_json: JSON.stringify(this.responses)
      };

      this.responses.forEach((r, i) => {
        const n = i + 1;
        trialData[`practice_trial_id_${n}`] = r.trial_id;
        trialData[`practice_trial_in_block_${n}`] = r.trial_in_block;
        trialData[`practice_condition_${n}`] = r.condition;
        trialData[`practice_utterance_${n}`] = r.utterance;
        trialData[`practice_grey_cell_${n}`] = r.grey_cell;
        trialData[`practice_response_${n}`] = r.response;
        trialData[`practice_correct_answer_${n}`] = r.correct_answer;
        trialData[`practice_correct_${n}`] = r.correct;
        trialData[`practice_rt_${n}`] = r.rt;
      });

      this.$magpie.addTrialData(trialData);
      this.step = "done";
    }
  }
};
</script>

<style scoped>
.practice-instructions {
  width: 700px;
  margin: 0 auto;
  text-align: justify;
  font-size: 18px;
  line-height: 1.6;
}

.practice-instructions h2 {
  text-align: center;
}

.practice-instructions button {
  display: block;
  margin: 20px auto;
}

.block-layout {
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history-row {
  width: 100%;
  height: 190px;          
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 20px;
}

.history-slot {
  width: 170px;
  height: 185px;          
}

.history-slot.empty {
  visibility: hidden;
}

.history-utterance {
  text-align: center;
  font-size: 13px;
  height: 28px;           
  margin-bottom: 4px;
}

.history-grid-wrapper {
  position: relative;
  width: 170px;
  height: 170px;          
  opacity: 0.85;
  line-height: 0;
}

.history-stimulus {
  width: 100%;
  display: block;
}

.active-area {
  height: 520px;          
  display: flex;
  flex-direction: column;
  align-items: center;
}

.active-utterance {
  text-align: center;
  font-size: 26px;
  min-height: 42px;
  margin: 0 0 12px 0;
}

.active-grid-wrapper {
  position: relative;
  width: min(440px, 62vh);
  line-height: 0;
}

.active-stimulus {
  width: 100%;
  display: block;
}

.cell {
  position: absolute;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  opacity: 0;
  cursor: pointer;
}

.top-left {
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
}

.top-right {
  top: 0;
  left: 50%;
  width: 50%;
  height: 50%;
}

.bottom-left {
  top: 50%;
  left: 0;
  width: 50%;
  height: 50%;
}

.bottom-right {
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
}

.selection-marker {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: black;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.selection-marker.small {
  width: 12px;
  height: 12px;
}

.selection-marker.topLeft {
  top: 25%;
  left: 25%;
}

.selection-marker.topRight {
  top: 25%;
  left: 75%;
}

.selection-marker.bottomLeft {
  top: 75%;
  left: 25%;
}

.selection-marker.bottomRight {
  top: 75%;
  left: 75%;
}

.preload-placeholder {
  width: 100%;
  min-height: 90vh;
}

</style>