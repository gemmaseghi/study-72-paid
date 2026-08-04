<template>
    <div class="stroop-task">
        <div
            v-if="phase === 'fixation'"
            class="trial-display"
        >
            <div class="fixation-cross">+</div>
        </div>

        <div
            v-else-if="phase === 'stimulus' && currentTrial"
            class="trial-display"
        >
            <img
                :src="currentTrial.image"
                :alt="currentTrial.word"
                class="stroop-stimulus"
                draggable="false"
            >
        </div>
    </div>
</template>

<script>
import { createStroopTrials } from "./trials";

export default {
    name: "Grid",

    data() {
        return {
            trials: [],
            trialIndex: 0,
            phase: "fixation",

            fixationDuration: 400,

            stimulusOnset: null,
            fixationTimer: null,

            allowedKeys: ["r", "g", "l", "o"],
            acceptingResponse: false
        };
    },

    computed: {
        currentTrial() {
            return this.trials[this.trialIndex] || null;
        }
    },

    mounted() {
        window.addEventListener("keydown", this.handleKeydown);

        this.trials = createStroopTrials();
        this.preloadImages();
        this.startTrial();
    },

    beforeDestroy() {
        window.removeEventListener("keydown", this.handleKeydown);
        this.clearTimers();
    },

    methods: {
        startTrial() {
            this.clearTimers();

            this.acceptingResponse = false;
            this.stimulusOnset = null;
            this.phase = "fixation";

            this.fixationTimer = window.setTimeout(() => {
                this.showStimulus();
            }, this.fixationDuration);
        },

        showStimulus() {
            this.phase = "stimulus";

            this.$nextTick(() => {
                this.stimulusOnset = performance.now();
                this.acceptingResponse = true;
            });
        },

        handleKeydown(event) {
            const responseKey = event.key.toLowerCase();

            if (
                this.phase !== "stimulus" ||
                !this.acceptingResponse ||
                event.repeat ||
                !this.allowedKeys.includes(responseKey)
            ) {
                return;
            }

            event.preventDefault();

            this.acceptingResponse = false;

            const reactionTime =
                performance.now() - this.stimulusOnset;

            const correct =
                responseKey === this.currentTrial.key;

            this.saveTrialData({
                responseKey,
                reactionTime,
                correct
            });

            this.advanceTrial();
        },

        saveTrialData({ responseKey, reactionTime, correct }) {
            const trial = this.currentTrial;

            this.$magpie.addTrialData({
                task: "stroop",
                trial_number: trial.trialNumber,

                word: trial.word,
                ink_color: trial.color,
                congruent: trial.congruent,

                correct_key: trial.key,
                response_key: responseKey,
                correct,

                reaction_time: Math.round(reactionTime),
                stimulus_image: trial.image
            });
        },

        advanceTrial() {
            this.trialIndex += 1;

            if (this.trialIndex >= this.trials.length) {
                this.finishTask();
                return;
            }

            this.startTrial();
        },

        finishTask() {
            this.clearTimers();
            this.acceptingResponse = false;

            this.$magpie.nextScreen();
        },

        preloadImages() {
            const uniquePaths = [
                ...new Set(this.trials.map(trial => trial.image))
            ];

            uniquePaths.forEach(path => {
                const image = new Image();
                image.src = path;
            });
        },

        clearTimers() {
            if (this.fixationTimer !== null) {
                window.clearTimeout(this.fixationTimer);
                this.fixationTimer = null;
            }
        }
    }
};
</script>

<style scoped>
.stroop-task {
    width: 100%;
    min-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.trial-display {
    width: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fixation-cross {
    font-size: 64px;
    line-height: 1;
    font-family: Arial, sans-serif;
    user-select: none;
}

.stroop-stimulus {
    display: block;
    max-width: 500px;
    max-height: 250px;
    object-fit: contain;
    user-select: none;
}
</style>