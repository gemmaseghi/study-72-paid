<template>
  <Screen>
    <div class="instructions">
      <h2>{{ pages[page].title }}</h2>

      <div v-html="pages[page].text"></div>

      <div class="button-container">
        <button v-if="page > 0" @click="page--">
          Zurück
        </button>

        <button v-if="page < pages.length - 1" @click="page++">
          Weiter
        </button>

        <button v-else @click="$magpie.nextScreen()">
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
          title: "Das Spiel",
          text: `
            <p>
              Im eigentlichen Spiel übernimmt Leo immer die Sprecherrolle und du
              übernimmst immer die Hörerrolle.
            </p>

            <p>
              Leo wählt eines von vier Objekten in einem Gitter aus und beschreibt es.
            </p>

            <p>
              <strong>Leos Beschreibung erscheint über dem Gitter.</strong>
              Du siehst die Beschreibung nur in schriftlicher Form. Sie wird nicht
              laut vorgelesen.
            </p>

            <p>
              Zum Beispiel:
            </p>

            <div class="instruction-figure">
              <p class="image-caption">
                Die Schildkröte
              </p>

              <img
                src="main/instructions/instruction_01.png"
                class="instruction-image"
              />
            </div>

            <p>
              <strong>
                Deine Aufgabe besteht darin, das von Leo beschriebene Objekt
                anzuklicken.
              </strong>
            </p>
          `
        },

        {
          title: "Übung Höhrerrolle",
          text: `
            <p>
              Aus Leos Perspektive gibt es allerdings ein
              <strong>verdecktes Feld</strong>! Du siehst immer vier Objekte, Leo
              kann aber nur drei davon sehen. Das liegt daran, dass
              <strong>eines von Leos Feldern für ihn verdeckt ist</strong>.
            </p>

            <p>
              <strong>
                Allerdings weiß Leo nicht, dass er eines der Felder nicht sieht.
              </strong>
              Er denkt, dass du ebenfalls nur drei Objekte siehst.
            </p>

            <p>
              In jedem Gitter wird das für Leo verdeckte Feld grau dargestellt.
              Das bedeutet, dass
              <strong>Leo das Objekt im grauen Feld nicht sehen kann.</strong>
            </p>

            <p>
              Abgesehen von dem verdeckten Objekt enthalten dein Gitter und Leos
              Gitter dieselben Objekte. Leo darf jedoch keine Positionsangaben wie
              „oben links“ oder „unten rechts“ verwenden, um sich auf ein Objekt
              zu beziehen.
            </p>

            <p>
              Auf Leos Bildschirm ist eines der sichtbaren Objekte mit einem
              Sternchen (*) markiert. Seine Aufgabe besteht darin, dieses Objekt
              zu beschreiben.
            </p>

            <p>
              Hier ist ein Beispiel dafür, was Leo sieht (links) und was du siehst
              (rechts):
            </p>

            <img
              src="main/instructions/example_view.png"
              class="example-image"
            />
          `
        },

        {
          title: "Übung Höhrerrolle",
          text: `
            <p>
              <strong>
                Die Gitter mit den Objekten werden in Fünferblöcken gezeigt.
              </strong>
              Du musst das gesuchte Objekt
              <strong>
                nur im großen Gitter in der Mitte des Bildschirms auswählen.
              </strong>
            </p>

            <p>
              Lies die Beschreibung über dem großen Gitter und klicke auf das
              Objekt, auf das sich Leo deiner Meinung nach bezieht.
            </p>

            <p>
              <strong>
                Nach jeder Auswahl wandert das bearbeitete Gitter an den oberen
                Bildschirmrand. Dort wird es kleiner dargestellt und deine Auswahl
                bleibt durch einen schwarzen Punkt markiert.
              </strong>
              Gleichzeitig erscheint sofort das nächste große Gitter in der Mitte
              der Seite.
            </p>

            <p>
              <strong>
                Die oben angezeigten Gitter dienen nur als Übersicht über deine
                bisherigen Antworten. Du musst sie nicht erneut anklicken.
              </strong>
            </p>

            <p>
              Sobald du in allen fünf Gittern eines Blocks ein Objekt ausgewählt
              hast,
              <strong>
                wird das große Gitter in der Mitte durch ein Feld mit der Aufschrift
                „Weiter“ ersetzt.
              </strong>
              Klicke darauf, um zum nächsten Block zu gelangen.
            </p>

            <p>
              <strong>
                Innerhalb eines Blocks bleibt das graue Feld immer an derselben
                Position. In einem neuen Block kann es sich an einer anderen
                Position befinden.
              </strong>
              In diesem Fall ist ein anderes Feld für Leo verdeckt.
            </p>

            <p>
              Unten siehst du ein Beispiel für einen Block mit fünf Gittern:
            </p>

            <div class="instruction-figure">
              <img
                src="main/instructions/instructions_03.png"
                class="instruction-image"
              />
            </div>

            <p>
              Am Ende des Experiments wirst du gebeten, einen kurzen Fragebogen
              auszufüllen.
            </p>
          `
        }
      ]
    };
  }
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

.instructions :deep(p) {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.instructions :deep(.instruction-figure) {
  width: 100%;
  margin: 24px auto;
  text-align: center;
}

.instructions :deep(.image-caption) {
  width: 100%;
  margin: 0 auto 10px;
  text-align: center;
  font-weight: bold;
}

.instructions :deep(.instruction-image) {
  display: block;
  max-width: 650px;
  width: auto;
  height: auto;
  margin: 0 auto;
}

.instructions :deep(.example-image) {
  display: block;
  max-width: 650px;
  width: auto;
  height: auto;
  margin: 24px auto;
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