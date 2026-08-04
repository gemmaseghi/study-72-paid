<template>
  <Screen>
    <div class="instructions">
      <h2>{{ pages[page].title }}</h2>

      <div v-html="pages[page].text"></div>

      <div class="button-container">
        <button v-if="page > 0" @click="previousPage">
          Zurück
        </button>

        <button
          v-if="page < pages.length - 1"
          @click="pageForward"
        >
          Weiter
        </button>

        <button
          v-else
          @click="pageForward"
        >
          Start
        </button>
      </div>
    </div>
  </Screen>
</template>

<script>
export default {
  name: "InstructionsWithBack",
  data() {
    return {
      page: 0,
      pages: [
        {
          title: "Willkommen zum vierten Experiment!",
          text: `
            <p>
              In diesem Experiment wirst du Farbwörter (rot, grün, lila und orange) sehen, die in verschiedenen Farben geschrieben sind. Du musst auf die Schriftfarbe achten, nicht auf die Bedeutung der Wörter.
            </p>

            <p>
              Zum Beispiel wenn du folgendes siehst, 
            </p>

            <div class="instruction-image">
              <img
                class="example-image"
                src="stroop/stimuli/l_g.png"
                alt="lila written in green"
              />
            </div>

            <p>
              musst du auf die Schriftfarbe achten (grün) und die entsprechende Taste drücken ("G"). Die anderen Tasten, die in diesem Experiment verwendet werden, sind "R", "L", und "O", für rot, lila und orange.
            </p>

            <p>
              Klicke "Weiter", um zum zweiten Teil der Anleitung zu gelangen.
            </p>

          `
        },

        {
          title: "Anleitung",
          text: `

            <div class="instruction-image">
              <img
                class="mapping-image"
                src="stroop/instructions/intro.png"
                alt="color-keys mapping"
              />
            </div>

            <p>
              Das kann ganz schön schwierig sein, wenn die Schriftfarbe nicht dem Wort entspricht (wie in allen Fällen außer bei orange im Beispiel oben). Also konzentriere dich auf die Schriftfarbe und ignorier die Bedeutung der Farbwörter.
            </p>

            <p>
              Versuche, so schnell wie möglich, die richtige Taste zu drücken.
            </p>
            
            <p>
              Klicke "Start", um mit dem Experiment zu beginnen.
            </p>

          `
        }
      ]
    };
  },

  methods: {

    previousPage() {
      this.page--;
    },

    pageForward() {
      if (this.page < this.pages.length - 1) {
        this.page++;
      } else {
        this.$magpie.nextScreen();
      }
    }
  },
};
</script>

<style scoped>
.instructions {
  width: 700px;
  max-width: 95vw;
  margin: 0 auto;
  text-align: justify;
}

.instructions h2 {
  text-align: center;
}

.instructions p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 12px;
}


.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.button-container button {
  width: auto;
  margin: 0 5px;
}


.instructions :deep(.instruction-image) {
  width: 100vw;
  margin: 24px 0 24px calc(50% - 50vw);
  text-align: center;
}

.instructions :deep(.example-image) {
  width: 200px;
  height: auto;
}

.instructions :deep(.mapping-image) {
  display: block;
  width: min(700px, 95vw);
  max-width: none;
  height: auto;
  margin: 0 auto;
}

</style>