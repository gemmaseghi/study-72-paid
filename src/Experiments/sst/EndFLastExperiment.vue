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
          Weiter
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
          title: "Ende des letzten Experiments",
          text: `
          <p>
            Herzlichen Glückwunsch, du hast nun alle Experimente abgeschlossen!
          </p>

          <p>
            Klicke auf „Weiter“, um deine Ergebnisse einzureichen. Zunächst werden
            deine Daten an den Server übertragen. Sobald die Übertragung erfolgreich
            abgeschlossen ist, wirst du zu einer Abschlussseite weitergeleitet.
          </p>

          <p>
            Auf dieser Seite werden dir ein persönlicher Abschlusscode und die
            E-Mail-Adresse angezeigt, an die du dich wenden musst, um deine
            Aufwandsentschädigung zu erhalten. Bitte gib deinen Abschlusscode in
            der E-Mail an.
          </p>

          <p>
            Anschließend erhältst du per E-Mail eine Teilnahmebescheinigung. Bitte
            fülle diese aus, unterschreibe sie und sende sie zurück. Sobald die
            unterschriebene Teilnahmebescheinigung eingegangen ist, erhältst du
            deinen Gutschein.
          </p>
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

</style>