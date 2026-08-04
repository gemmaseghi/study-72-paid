<template>
  <Screen>
    <div v-if="imagesReady" class="block-layout">
      <div class="history-row">
        <div
          v-for="(trial, index) in block"
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

      <div v-if="currentGrid < block.length && !responses[currentGrid]" class="active-area">
        <h3 class="active-utterance">{{ block[currentGrid].utterance }}</h3>

        <div class="active-grid-wrapper">
          <img :src="block[currentGrid].image" class="active-stimulus" />

          <button class="cell top-left" @click="selectCell('topLeft')" />
          <button class="cell top-right" @click="selectCell('topRight')" />
          <button class="cell bottom-left" @click="selectCell('bottomLeft')" />
          <button class="cell bottom-right" @click="selectCell('bottomRight')" />

          <div
            v-if="responses[currentGrid]"
            class="selection-marker"
            :class="responses[currentGrid].response"
          />
        </div>
      </div>

      <div v-if="currentGrid >= block.length" class="active-area">
        <div class="next-square" @click="finishBlock()">
          <span>Next</span>
        </div>
      </div>
    </div>

    <div v-else class="preload-placeholder"></div>
  </Screen>
</template>

<script>
export default {
  name: "GridTrial",
  props: {
    block: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentGrid: 0,
      blockStartTime: null,
      gridStartTime: null,
      responses: [],
      imagesReady: false
    };
  },
  mounted() {
    this.preloadBlockImages().then(() => {
      this.imagesReady = true;

      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.blockStartTime = performance.now();
          this.gridStartTime = performance.now();
        });
      });
    });
  },
  methods: {
    hasResponse(index) {
      return Boolean(this.responses[index]);
    },

    preloadBlockImages() {
      const imagePaths = this.block.map(trial => trial.image);

      const preloadOne = src =>
        new Promise(resolve => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        });

      return Promise.all(imagePaths.map(preloadOne));
    },

    selectCell(answer) {
      const now = performance.now();
      const trial = this.block[this.currentGrid];

      this.$set(this.responses, this.currentGrid, {
        
        trial_id: trial.id,
        phase: trial.phase,
        block_id: trial.block_id,
        trial_in_block: trial.trial_in_block,
        condition: trial.condition,
        utterance: trial.utterance,
        grey_cell: trial.greyCell,
        correct_answer: trial.correctAnswer,
        response: answer,
        correct: answer === trial.correctAnswer,
        rt: now - this.gridStartTime
      });

      if (this.currentGrid < this.block.length - 1) {
        this.currentGrid += 1;

        this.$nextTick(() => {
            requestAnimationFrame(() => {
                this.gridStartTime = performance.now();
            });
        });
      } else {
        this.currentGrid += 1;
      }
    },

    finishBlock() {
      const endTime = performance.now();
      const blockRT = endTime - this.blockStartTime;
      const blockID = this.block[0].block_id;
      const phase = this.block[0].phase;

      const trialData = {
        phase,
        block_id: blockID,
        block_rt: blockRT,
        block_responses_json: JSON.stringify(this.responses)
      };

      this.responses.forEach((r, i) => {
        const n = i + 1;
        trialData[`trial_id_${n}`] = r.trial_id;
        trialData[`trial_in_block_${n}`] = r.trial_in_block;
        trialData[`condition_${n}`] = r.condition;
        trialData[`utterance_${n}`] = r.utterance;
        trialData[`grey_cell_${n}`] = r.grey_cell;
        trialData[`correct_answer_${n}`] = r.correct_answer;
        trialData[`response_${n}`] = r.response;
        trialData[`correct_${n}`] = r.correct;
        trialData[`rt_${n}`] = r.rt;
      });

      this.$magpie.addTrialData(trialData);
      this.$magpie.nextScreen();
    }
  }
};
</script>

<style scoped>
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

.next-square {
  width: min(380px, 54vh);
  aspect-ratio: 1;

  margin-top: 60px;

  background: white;
  border: 2px solid black;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;

  transition: background-color 0.15s ease,
              transform 0.08s ease;
}

.next-square span {
  font-size: 56px;
  font-weight: 600;
  color: #2b6cff;
}

.preload-placeholder {
  width: 100%;
  min-height: 90vh;
}

</style>