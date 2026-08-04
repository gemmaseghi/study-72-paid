<template>
  <Screen>
    <div v-if="imagesReady" class="redundancy-layout">
      <!-- Scene number refers to presentation order -->
      <header class="trial-header">
        <h1 class="scene-title">
          Bildausschnitt {{ sceneNumber }}
        </h1>

        <p class="trial-progress">
          Objekt {{ currentTrialIndex + 1 }} von {{ trials.length }}
        </p>
      </header>

      <div class="stimulus-row">
        <!-- Larger scene on the left -->
        <section class="stimulus-panel scene-panel">
          <p class="panel-label">Bildausschnitt</p>

          <div class="image-wrapper scene-image-wrapper">
            <img
              :key="currentTrial.scene_image"
              :src="currentTrial.scene_image"
              alt="Grey scene with three coloured stickers and a red arrow"
              class="scene-image"
            />
          </div>
        </section>

        <!-- Smaller grid on the right -->
        <section class="stimulus-panel grid-panel">
          <p class="panel-label">Gitter mit Objekten</p>

          <div class="image-wrapper grid-image-wrapper">
            <img
              :key="currentTrial.grid_image"
              :src="currentTrial.grid_image"
              alt="Grid containing four possible objects"
              class="grid-image"
            />
          </div>
        </section>
      </div>

      <!-- Written response -->
      <div class="response-area">
        <label
          for="object-description"
          class="response-label"
        >
          Beschreibe das Objekt, auf das der rote Pfeil zeigt, so dass der andere Teilnehmende es im Gitter finden kann.
        </label>

        <textarea
          id="object-description"
          ref="descriptionBox"
          v-model="description"
          class="response-box"
          rows="1"
          placeholder="Deine Beschreibung"
          @input="clearError"
          @keydown.ctrl.enter.prevent="submitDescription"
          @keydown.meta.enter.prevent="submitDescription"
        />

        <p
          v-if="showError"
          class="error-message"
        >
          Bitte gib eine Beschreibung an.
        </p>

        <button
          type="button"
          class="continue-button"
          :disabled="isSubmitting"
          @click="submitDescription"
        >
          Weiter
        </button>
      </div>
    </div>

    <div v-else class="preload-placeholder">
      <p>Laden...</p>
    </div>
  </Screen>
</template>

<script>
export default {
  name: "RedundancyGrid",

  props: {
    trials: {
      type: Array,
      required: true
    },

    sceneId: {
      type: Number,
      required: true
    },

    sceneNumber: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      currentTrialIndex: 0,
      description: "",
      responses: [],
      imagesReady: false,
      showError: false,
      isSubmitting: false,
      sceneStartTime: null,
      trialStartTime: null
    };
  },

  computed: {
    currentTrial() {
      return this.trials[this.currentTrialIndex] || {};
    }
  },

  mounted() {
    if (this.trials.length === 0) {
      console.error(
        "RedundancyGrid received no trials. Check the scene prop."
      );

      return;
    }

    this.preloadSceneImages().then(() => {
      this.imagesReady = true;

      this.$nextTick(() => {
        requestAnimationFrame(() => {
          const now = performance.now();

          this.sceneStartTime = now;
          this.trialStartTime = now;

          this.focusDescriptionBox();
        });
      });
    });
  },

  methods: {
    preloadSceneImages() {
      const imagePaths = [];

      this.trials.forEach(trial => {
        if (trial.scene_image) {
          imagePaths.push(trial.scene_image);
        }

        if (trial.grid_image) {
          imagePaths.push(trial.grid_image);
        }
      });

      const uniquePaths = [...new Set(imagePaths)];

      const preloadOne = src =>
        new Promise(resolve => {
          const img = new Image();

          img.onload = resolve;

          /*
           * Resolve even if an image fails, so the experiment does not
           * remain stuck permanently on the loading screen.
           */
          img.onerror = () => {
            console.error(`Could not preload image: ${src}`);
            resolve();
          };

          img.src = src;
        });

      return Promise.all(uniquePaths.map(preloadOne));
    },

    focusDescriptionBox() {
      if (this.$refs.descriptionBox) {
        this.$refs.descriptionBox.focus();
      }
    },

    clearError() {
      if (this.description.trim()) {
        this.showError = false;
      }
    },

    submitDescription() {
      if (this.isSubmitting) {
        return;
      }

      const cleanedDescription = this.description.trim();

      if (!cleanedDescription) {
        this.showError = true;
        this.focusDescriptionBox();
        return;
      }

      this.isSubmitting = true;
      this.showError = false;

      const now = performance.now();
      const trial = this.currentTrial;

      this.responses.push({
        trial_id: trial.trial_id,
        scene_id: this.sceneId,
        scene_presentation_order: this.sceneNumber,
        version: trial.version,
        target_object: trial.target_object,
        target_color: trial.target_color,
        target_position: trial.target_position,
        scene_image: trial.scene_image,
        grid_image: trial.grid_image,
        description: cleanedDescription,
        rt: now - this.trialStartTime
      });

      const isLastTrial =
        this.currentTrialIndex >= this.trials.length - 1;

      if (isLastTrial) {
        this.finishScene();
        return;
      }

      this.currentTrialIndex += 1;
      this.description = "";

      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.trialStartTime = performance.now();
          this.isSubmitting = false;
          this.focusDescriptionBox();
        });
      });
    },

    finishScene() {
      const endTime = performance.now();
      const sceneRT = endTime - this.sceneStartTime;

      const trialData = {
        experiment: "redundancy",
        phase: "redundancy",
        scene_id: this.sceneId,
        scene_presentation_order: this.sceneNumber,
        scene_rt: sceneRT,
        number_of_objects: this.responses.length,
        responses_json: JSON.stringify(this.responses)
      };

      /*
       * Save separate columns as well as the JSON representation.
       * This makes the downloaded data easier to inspect and analyse.
       */
      this.responses.forEach((response, index) => {
        const n = index + 1;

        trialData[`trial_id_${n}`] = response.trial_id;
        trialData[`version_${n}`] = response.version;
        trialData[`target_object_${n}`] = response.target_object;
        trialData[`target_color_${n}`] = response.target_color;
        trialData[`description_${n}`] = response.description;
        trialData[`rt_${n}`] = response.rt;
        trialData[`scene_image_${n}`] = response.scene_image;
        trialData[`grid_image_${n}`] = response.grid_image;
      });

      this.$magpie.addTrialData(trialData);
      this.$magpie.nextScreen();
    }
  }
};
</script>

<style scoped>
.redundancy-layout {
  box-sizing: border-box;
  width: min(1200px, 96%);
  min-height: 90vh;
  margin: 0 auto;
  padding: 18px 16px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.trial-header {
  width: 100%;
  margin-bottom: 22px;
  text-align: center;
}

.scene-title {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
}

.trial-progress {
  margin: 6px 0 0;
  font-size: 15px;
}

/*
 * The first column contains the smaller grid.
 * The second column contains the larger grey scene.
 */
.stimulus-row {
  display: grid;
  grid-template-columns:
    minmax(420px, 1.5fr)
    minmax(230px, 0.7fr);
  align-items: center;
  gap: 12px;

  width: 100%;
}

.stimulus-panel {
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.panel-label {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
}

.image-wrapper {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-image-wrapper {
  max-width: 350px;
}

.scene-image-wrapper {
  max-width: 700px;
}

.grid-image,
.scene-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.grid-image {
  max-height: 300px;
}

.scene-image {
  max-height: 500px;
}

.response-area {
  width: min(600px, 100%);
  margin-top: 30px;
}

.response-label {
  display: block;
  margin-bottom: 10px;

  font-size: 17px;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
}

.response-box {
  box-sizing: border-box;
  display: block;

  width: 100%;
  min-height: 60px;
  padding: 13px 14px;

  resize: vertical;

  border: 1px solid #666;
  border-radius: 5px;

  background: white;
  color: black;

  font: inherit;
  font-size: 17px;
  line-height: 1.5;
}

.response-box:focus {
  outline: 2px solid #2b6cff;
  outline-offset: 2px;
}

.error-message {
  margin: 8px 0 0;
  color: #b00020;
  font-size: 15px;
}

.continue-button {
  display: block;

  min-width: 130px;
  margin: 20px auto 0;
  padding: 10px 24px;

  border: 1px solid #333;
  border-radius: 5px;

  background: white;
  color: black;

  cursor: pointer;
  font: inherit;
  font-size: 17px;
}

.continue-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.continue-button:focus {
  outline: 2px solid #2b6cff;
  outline-offset: 2px;
}

.continue-button:disabled {
  cursor: default;
  opacity: 0.6;
}

.preload-placeholder {
  width: 100%;
  min-height: 90vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

/*
 * On smaller displays, stack the images vertically.
 * The grey scene remains above the response area.
 */
@media (max-width: 800px) {
  .stimulus-row {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .grid-image-wrapper,
  .scene-image-wrapper {
    max-width: 600px;
  }

  .grid-image,
  .scene-image {
    max-height: none;
  }

  .scene-title {
    font-size: 28px;
  }
}
</style>