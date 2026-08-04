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
          title: "Willkommen zum dritten Experiment!",
          text: `
            <p>
              In diesem Experiment spielst du ein Koordinationsspiel mit einem virtuellen Spieler namens <strong>Leo</strong>.
            </p>

            <p>
              Das Spiel umfasst zwei Rollen: <strong>Die Sprecherrolle</strong> und <strong>die Höhrerrolle</strong>.
            </p>

            <p>
              Während des Spiels <strong>wird Leo immer die Sprecherrolle übernehmen</strong> und <strong>du wirst immer die Höhrerrolle übernehmen</strong>.
            </p>

            <p>
              <strong>Bevor das Spiel startet, wirst du jedoch kurz in beide Rollen schlüpfen</strong>, um zu verstehen, wie das Spiel funktioniert.
            </p>

          `
        },

        {
          title: "Die Sprecherrolle",
          text: `
            <p>
              Beginnen wir mit der Sprecherrolle.

              <strong>Deine Aufgabe in der Sprecherrolle ist es, das mit einem Sternchen (*) markierte Objekt so zu beschreiben, dass Leo es identifizieren kann</strong>.

              Leo sieht das Sternchen <strong>nicht</strong>.
            </p>

            <p>
              Du <strong>darfst keine Positionsangaben</strong> wie "oben links" oder "unten rechts" in deinen Beschreibungen verwenden.
            </p>

            <p>
              Hier ist ein Beispiel dafür, was du sehen wirst:
            </p>

            <div class="instruction-figure">
              <img
                src="main/instructions/instructions_speaker.png"
                alt="Example speaker view"
                class="example-image"
              />

              <p>
                Eine mögliche Beschreibung wäre in diesem Fall: <strong>Das T-Shirt</strong>.
              </p>
            </div>
          `
        },

        {
          title: "Übung Sprecherrolle",
          text: `
            <p>
              Jetzt schlüpst du in die Sprecherrolle!
            </p>

            <p>
              Schreibe für jedes Gitter <strong>eine Beschreibung des mit dem Sternchen (*) markierten Objekts</strong>. Leo wird deine Beschreibung nutzen, um das Objekt zu identifizieren. 
            </p>

            <p>
              Schreibe dann eine kurze Erklärung, warum du diese Beschreibung gewählt hast.
            </p>

            <p>
              Du wirst zur Übung <strong>drei Objekte</strong> beschreiben.
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


.image-caption {
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}


.instructions :deep(.instruction-figure) {
  text-align: center;
  margin: 8px 0;
}

.instructions :deep(.example-image) {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 500px;
  height: auto;
  margin: 24px auto;
  object-fit: contain;
}


</style>