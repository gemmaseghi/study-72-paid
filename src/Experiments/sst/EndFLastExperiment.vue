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
              Klicke auf „Weiter“, um deine Ergebnisse einzureichen. Zunächst werden deine Daten an den Server übertragen. Sobald die Übertragung erfolgreich abgeschlossen ist, wirst du entweder automatisch zu Sona weitergeleitet oder dein Browser fragt dich, ob du die Seite verlassen möchtest.
            </p>

            <p>
              Zu diesem Zeitpunkt wurden deine Daten bereits gespeichert. Falls eine solche Meldung erscheint, kannst du daher bedenkenlos auf „Seite verlassen“ klicken. Anschließend wirst du zu Sona weitergeleitet, um deine Versuchspersonenstunden zu erhalten.
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