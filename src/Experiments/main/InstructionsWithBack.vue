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
          title: "Willkommen",
          text: `
            <p>
              Willkommen zum dritten Experiment! Bitte lies dir die
              Anweisungen sorgfältig durch. Die Anweisungen sind in drei
              Teile unterteilt. Gehe bitte zur nächsten Seite, um den ersten
              Teil zu lesen.
            </p>
          `
        },

        {
          title: "Anweisungen",
          text: `
            <p>
              In diesem Experiment spielst du ein Koordinationsspiel mit
              einem virtuellen Sprecher namens <strong>Leo</strong>.
            </p>

            <p>
              Leo wählt eines der vier Objekte in einem Raster aus und
              beschreibt es.
            </p>

            <p>
              <strong>Leos Beschreibung erscheint über dem Raster.</strong>
              Du siehst die Beschreibung nur in schriftlicher Form; sie wird
              nicht laut vorgelesen.
            </p>

            <p>Zum Beispiel:</p>

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
          title: "Anweisungen",
          text: `
            <p>
              Leo hat jedoch einen <strong>blinden Fleck</strong>! Du siehst
              immer vier Objekte, Leo kann aber nur drei davon sehen. Das
              liegt daran, dass <strong>eines von Leos Feldern verdeckt
              ist</strong>.
            </p>

            <p>
              <strong>
                Leo weiß allerdings nicht, dass er einen blinden Fleck hat.
              </strong>
              Er glaubt, dass du dieselben drei Objekte siehst wie er und
              das vierte Objekt ebenfalls nicht sehen kannst.
            </p>

            <p>
              In deinem Raster wird das für Leo verdeckte Feld grau
              dargestellt. Das bedeutet, dass
              <strong>Leo das Objekt im grauen Feld nicht sehen kann.</strong>
            </p>

            <p>
              Abgesehen von dem verdeckten Objekt enthalten dein Raster und
              Leos Raster dieselben Objekte. Leo darf jedoch keine
              Positionsangaben wie „oben links“ oder „unten rechts“
              verwenden, um sich auf ein Objekt zu beziehen.
            </p>

            <p>
              Auf Leos Bildschirm ist eines der sichtbaren Objekte mit einem
              Sternchen (*) markiert. Seine Aufgabe besteht darin, dieses
              Objekt zu beschreiben.
            </p>

            <p>
              Links siehst du Leos Ansicht und rechts deine eigene Ansicht:
            </p>

            <img
              src="main/instructions/example_view.png"
              class="example-image"
            />
          `
        },

        {
          title: "Anweisungen",
          text: `
            <p>
              In dieser Aufgabe enthält jede Seite
              <strong>fünf Raster</strong>. Zu Beginn jeder Seite wird
              <strong>
                ein großes Raster in der Mitte der Seite angezeigt.
              </strong>
              Nur in diesem Raster musst du ein Objekt auswählen.
            </p>

            <p>
              Lies die Beschreibung über dem großen Raster und klicke auf
              das Objekt, auf das sich Leo deiner Meinung nach bezieht.
            </p>

            <p>
              <strong>
                Nach jeder Auswahl wird das bearbeitete Raster nach oben
                verschoben. Dort wird es kleiner dargestellt, und deine
                Auswahl bleibt durch einen schwarzen Punkt markiert.
              </strong>
              Gleichzeitig erscheint sofort das nächste große Raster in der
              Mitte der Seite.
            </p>

            <p>
              <strong>
                Die oben angezeigten Raster dienen nur als Übersicht über
                deine bisherigen Antworten. Du musst sie nicht erneut
                anklicken.
              </strong>
            </p>

            <p>
              Sobald du in allen fünf Rastern ein Objekt ausgewählt hast,
              <strong>
                wird das große Raster in der Mitte durch ein Feld mit der
                Aufschrift „Weiter“ ersetzt.
              </strong>
              Klicke darauf, um zur nächsten Seite zu gelangen.
            </p>

            <p>
              <strong>
                Innerhalb einer Seite bleibt das graue Feld immer an
                derselben Position. Auf einer neuen Seite kann es sich an
                einer anderen Position befinden.
              </strong>
              In diesem Fall ist ein anderes Feld für Leo verdeckt.
            </p>

            <p>
              Am Ende des Experiments wirst du gebeten, einen kurzen
              Fragebogen auszufüllen.
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

.instructions p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 12px;
}


.example-image {
  display: block;
  margin: 24px auto;
  max-width: 650px;
  width: 100%;
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

.instruction-figure {
  text-align: center;
  margin: 8px 0;
}

.image-caption {
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.instruction-image {
  display: block;
  margin: 0 auto;
  max-width: 300px;
  width: auto;
  height: auto;
}

.example-image {
  display: block;
  margin: 24px auto;
  max-width: 650px;
  width: auto;
  height: auto;
}
</style>