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
          title: "Willkommen zum zweiten Experiment!",
          text: `
            <p>
              Du wirst ein Kartendeck mit 64 Karten sehen. Die Karten werden dir nacheinander zugeteilt. 
            </p>

            <p>
              Du musst jede Karte in eine der vier unten gezeigten Kartenkategorien einordnen, indem du die entsprechende Kartenkategorie mit deiner Maus anklickst.
            </p>

            <p>
              Wenn du die Karte richtig eingeordnet hast, erscheint das Wort "Richtig" auf dem Bildschirm. Wenn du aber einen Fehler gemacht hast, erscheint das Wort "Falsch".
            </p>

            <p>
              Das Ziel ist es, so viele Karten wie möglich richtig einzuordnen. 
            </p>
            
            <p>
            Unten siehst du ein Beispiel mit der zu sortierenden Karte oben und den vier Kartenkategorien darunter.
            </p>

            <div class="instruction-image">
              <img
                src="wcst/instructions/base.png"
                alt="Example of the card sorting task"
              />
            </div>

          `
        },
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
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 24px auto;
}

.instructions :deep(.instruction-image img) {
  display: block;
  width: 650px;
  max-width: 100%;
  height: auto;
}

</style>