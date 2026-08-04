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
              Im eigentlichen Spiel übernimmt Leo immer die Sprecherrolle und du übernimmst immer die Höhrerrolle.
              
              Allerdings <strong>hat das Spiel eine Besonderheit: Aus Leos Perspektive gibt es ein verdecktes Feld!</strong> 
            </p>

            <p>
              <strong>Aus Leos Perspektive ist eines der Objekte in jedem Gitter durch ein Hindernis verdeckt</strong>. Deswegen <strong>sieht Leo in jedem Gitter nur drei Objekte</strong> und das vierte Feld ist grau markiert. 
              
              Dieses graue Feld stellt somit das Feld dar, das Leo nicht sieht.
            </p>

            <p>
              Hier ist ein Beispiel dafür, was Leo sieht (links) und was du siehst (rechts):
            </p>

            <div class="instruction-figure">
              <img
                src="main/instructions/example_view.png"
                alt="Example of speaker and listener views"
                class="example-image"
              />
            </div>

            <p>
              Allerdings <strong>weiß Leo nicht, dass er eins der Felder nicht sieht</strong>. Er denkt, dass du auch nur drei Objekte siehst.
              
              Abgesehen von dem Objekt, das für Leo nicht sichtbar ist, sehen du und Leo dieselben Objekte.
            </p>

          `
        },

        {
          title: "Übung Höhrerrolle",
          text: `

            <p>
              <strong>Die Gitter mit den Objekten werden in Fünferblöcken gezeigt</strong>. <strong>Innerhalb jedes Blocks bleibt das für Leo verdeckte Feld immer an derselben Position. Von Block zu Block wechselt es jedoch die Position.</strong>
            </p>
          
            <p>
              <strong>Du musst das gesuchte Objekt nur im großen Gitter in der Mitte des Bildschirms auswählen</strong>. 
              
              Nach jeder Auswahl wandert das bearbeitete Gitter an den oberen Bildschirmrand, wobei das von dir ausgewählte Objekt mit einem schwarzen Punkt markiert wird. 
            </p>

            <p>
              Hier ist ein Beispiel dafür, was du am Endes eines Fünferblocks sehen wirst:
            </p>

            <div class="instruction-figure">
              <img
                src="main/instructions/instructions_block_view.png"
                alt="Example of a block view"
                class="example-image-large"
              />
            </div>

            <p>
              Du wirst nun eine kurze Übungsrunde absolvieren.
            </p>

          `
        },
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