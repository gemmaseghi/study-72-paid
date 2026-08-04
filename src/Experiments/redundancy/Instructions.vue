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
          title: "Willkommen zum ersten Experiment!",
          text: `
            <p>
              Das erste Experiment besteht aus einer Aufgabe, die wir mit einer Gruppe von Kindern durchführen. Wir brauchen auch Erwachsene, die als Kontrollgruppe an dem Experiment teilnehmen. Da die Aufgabe die gleiche für Kinder und Erwachsene ist, ist es ganz normal, wenn du sie sehr einfach findest.
            </p>

            <p>
              In diesem Experiment wirst du ein Kommunikationsspiel mit einem anderen Teilnehmenden spielen.
            </p>

            <p>
              Deine Aufgabe ist es, Objekte so zu beschreiben, dass ein anderer Teilnehmender sie korrekt identifizieren kann. Du kannst den Namen des Objekts verwenden.
            </p>

            <p>Hier ist ein Beispiel:</p>

            <figure>
              <img
                src="redundancy/instructions/example_instructions.png"
                alt="Beispielbild mit einem Dreieck"
              />

              <figcaption>
                In diesem Beispiel könntest du „das Dreieck“ sagen.
              </figcaption>
            </figure>

            <p>
              Klicke <strong>Weiter</strong> um zu erfahren, wie das Spiel funktioniert.
            </p>

          `
        },

        {
          title: "Das Spiel",
          text: `

            <p>
              Auf der <strong>linken Seite</strong> deines Bildschirms wirst du einen <strong>grauen Bildausschnitt mit drei bunten Aufklebern darauf</strong> sehen. Der andere Teilnehemende sieht den gleichen grauen Bildausschnitt, aber <strong>nicht die bunten Aufkleber</strong>.
            </p>
          
            <p>
              In jeder Runde <strong>zeigt ein roter Pfeil auf einen der Aufkleber</strong>. Das ist der Aufkleber, den du beschreiben musst.
            </p>

            <p>
              Auf der <strong>rechten Seite</strong> deines Bildschirms wirst du ein <strong>Gitter mit vier Objekten</strong> sehen. Der andere Teilnehmende sieht das gleiche Gitter. Eines dieser vier Objekte entspricht dem Aufkleber, auf den der rote Pfeil zeigt.
            </p>

            <p>
              Deine Aufgabe ist es, <strong>den markierten Aufkleber zu beschreiben</strong>, so dass der andere Teilnehmende das richtige Objekt innerhalb des Gitters auswählen und zu dem grauen Bildausschnitt hinzufügen kann.
            </p>

            <p>
              Du <strong>musst nicht beschreiben, wo im Bildausschnitt sich der Aufkleber befindet</strong>. Gib einfach eine Beschreibung an, die das richtige Objekt aus den vier Objekten im Gitter deutlich macht. <strong>Du kannst den Namen des Objekts verwenden</strong>.
            </p>

            <p>
              Insgesamt wirst du <strong>8 Bildausschnitte</strong> sehen. Unten siehst du ein Beispiel eines grauen Bildausschnitts mit drei Aufklebern (links) und dem dazugehörigen Gitter mit Objekten (rechts).
            </p>

            <div class="instruction-images">
              <div class="instruction-image">
                <p><strong>Der Bildausschnitt</strong></p>
                <img
                  src="redundancy/instructions/example.png"
                  alt="Grey scene with three coloured stickers and a red arrow pointing to one of them."
                />
              </div>

              <div class="instruction-image">
                <p><strong>Das Gitter</strong></p>
                <img
                  src="redundancy/instructions/example_grid.png"
                  alt="Grid containing the sticker indicated by the red arrow and three other objects."
                />
              </div>
            </div>

            <p>
              Klicke <strong>Weiter</strong>, um das Spiel zu starten.
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

.instructions :deep(.instruction-images) {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  max-width: 1000px;
  margin: 24px auto;
}

.instructions :deep(.instruction-image) {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.instructions :deep(.instruction-image img) {
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 0 auto;
}


</style>