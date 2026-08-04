<template>
  <Screen>
    <div class="task-container">

      <!-- ================================================== -->
      <!-- SECTION 1: INITIAL INSTRUCTIONS                     -->
      <!-- ================================================== -->

      <div v-if="section === 'intro'" class="instructions">
        <h2>Willkommen zum letzten Experiment!</h2>

        <p>
          Du wirst eine Kurzgeschichte namens <em>Das Ende von Etwas</em> lesen. Die Geschichte ist relativ kurz, aber nimm dir Zeit sie genau zu lesen. Versuche, einen Eindruck davon zu bekommen, was passiert und wie die Beziehungen zwischen den Charakteren aussehen.
        </p>

        <p>
          Im Anschluss wirst du ein paar Fragen über die Geschichte beantworten. Während du die Fragen beantwortest, kannst du dir die Geschichte über den "Zurück zur Geschichte"-Knopf nochmal anschauen.
        </p>

        <div class="button-container">
          <button @click="section = 'story'">
            Weiter
          </button>
        </div>
      </div>


      <!-- ================================================== -->
      <!-- SECTION 2: STORY                                    -->
      <!-- ================================================== -->

      <div v-else-if="section === 'story'" class="story">
        <h2>Das Ende von Etwas</h2>

        <div class="story-text">
          <p>Früher einmal war Hortons Bay eine Bauholz-Stadt gewesen. Niemand, der dort wohnte, war außerhalb des Hörbereichs der großen Sägemühle am See. Dann, eines Tages, gab es keine Baumstämme mehr, um Bauholz zu machen. Die Holzschoner kamen in die Bucht und wurden mit dem Schnittholz des Sägewerks, das auf dem Hof gestapelt stand, beladen. Alle Stapel Bauholz wurden weggebracht. Aus der großen Mühle nahm man alle transportablen Maschinen fort und ließ sie von den Leuten, die bisher in der Mühle gearbeitet hatten, auf einen der Schoner laden. Der Schoner entfernte sich aus der Bucht hinaus dem offenen See zu, an Bord die beiden großen Sägen, den Transportwagen, der die Baumstämme gegen die rotierenden Kreissägen drückte, und all die Walzen, Räder, Treibriemen und Eisen, aufgetürmt auf einer schiffsrumpftiefen Ladung Bauholz. Nachdem der offene Raum mit Planen zugedeckt und diese festgebunden waren, füllten sich die Segel des Schoners, und er bewegte sich hinaus in den offenen See, all das mit sich führend, was die Mühle zur Mühle und Hortons Bay zur Stadt gemacht hatte.</p>
          <p>Die einstöckigen Schlafquartiere, das Speisehaus, das Warenhaus, die Mühlenbüros und die große Mühle selbst standen verlassen inmitten von ungeheuren Mengen Sägemehls da, das die sumpfige Wiese am Ufer der Bucht bedeckte.</p>
          <p>Zehn Jahre später war nur noch der zerfallene weiße Kalkstein der Grundmauern von dem Sägewerk übrig, den Nick und Marjorie, als sie am Ufer entlangruderten, durch die sumpfige, in zweiter Blüte stehende Wiese schimmern sahen. Sie angelten am Rand der Fahrrinne, wo der Grund plötzlich von flachen, sandigen Stellen zu zwölf Fuß tiefem dunklem Wasser abfiel. Sie angelten auf ihrem Weg zu der Landspitze, wo sie für die Regenbogenforellen Nachtangeln auslegen wollten.</p>
          <p>„Da ist unsere alte Ruine, Nick“, sagte Marjorie.</p>
          <p>Nick blickte beim Rudern auf die weißen Steine zwischen den grünen Bäumen.</p>
          <p>„Ja, da ist sie“, sagte er.</p>
          <p>„Kannst du dich daran erinnern, als es ein Sägewerk war?“, fragte Marjorie.</p>
          <p>„Ja, eben“, sagte Nick.</p>
          <p>„Es sieht eher wie ein Schloß aus“, sagte Marjorie.</p>
          <p>Nick sagte nichts. Sie ruderten weiter, verloren das Sägewerk aus den Augen und folgten der Uferlinie. Dann kreuzte Nick die Bucht.</p>
          <p>„Sie beißen nicht an“, sagte er.</p>
          <p>„Nein“, sagte Marjorie. Auch während sie sprach, paßte sie die ganze Zeit über scharf auf die Angel auf. Sie fischte gern. Sie fischte gern mit Nick.</p>
          <p>Ganz dicht am Boot durchbrach eine große Forelle den Wasserspiegel. Nick zog kräftig an einem Ruder, um das Boot zu wenden, damit der Köder, der weit hinter ihnen trieb, dort vorbeikam, wo die Forelle fraß. Als der Rücken der Forelle aus dem Wasser auftauchte, sprangen die Elritzen wie wild. Sie sprenkelten die Oberfläche, als hätte man eine Handvoll Schrot ins Wasser geworfen. Eine zweite Forelle durchbrach fressend das Wasser auf der anderen Seite des Bootes.</p>
          <p>„Sie fressen“, sagte Marjorie.</p>
          <p>„Aber sie beißen nicht an“, sagte Nick.</p>
          <p>Er ruderte das Boot herum, um zwischen den beiden fressenden Fischen hindurchzuködern; dann nahm er Kurs auf die Landspitze. Marjorie haspelte die Angelschnur erst auf, als das Boot das Ufer berührte.</p>
          <p>Sie zogen das Boot auf den Strand, und Nick hob einen Eimer mit lebenden Barschen heraus. Die Barsche schwammen im Wasser im Eimer umher. Nick fing drei von ihnen mit der Hand, schnitt ihnen die Köpfe ab und enthäutete sie, während Marjorie mit ihren Händen im Eimer herumjagte, schließlich einen Barsch fing, seinen Kopf abschnitt und ihn enthäutete. Nick besah sich ihren Fisch.</p>
          <p>„Nimm lieber die Bauchflosse nicht heraus“, sagte er. „Es geht zwar als Köder, aber es ist besser, wenn die Bauchflosse darin bleibt.“</p>
          <p>Er hakte jeden der enthäuteten Barsche durch den Schwanz. An dem Vorfach jeder Angel waren zwei Haken befestigt. Dann ruderte Marjorie das Boot über die Fahrrinne hinaus, sie hielt die Leine zwischen den Zähnen und hatte das Gesicht Nick zugewandt, der am Ufer stand, die Angelrute hielt und die Schnur von der Rolle laufen ließ.</p>
          <p>„So ungefähr da“, rief er.</p>
          <p>„Soll ich sie loslassen?“ rief Marjorie zurück, die Leine in der Hand.</p>
          <p>„Ja, laß sie los.“</p>
          <p>Marjorie ließ die Leine über Bord und sah zu, wie die Köder im Wasser niedersanken.</p>
          <p>Sie kam mit dem Boot zurück und legte die zweite Leine auf die gleiche Art aus. Beide Male legte Nick ein schweres Stück Treibholz über das dicke Ende der Angelrute, um sie in Position zu halten, und stützte sie mit einem kleinen Stück Holz ab. Er haspelte die schlaffe Leine auf, so daß die Leine straff bis zu der Stelle lief, wo der Köder auf dem sandigen Grund der Fahrrinne lag, und setzte den Sperrhaken auf die Rolle. Sobald eine Forelle auf dem Grund fraß und den Köder nahm, würde sie damit wegziehen, die Leine hastig von der Rolle abwickeln und so die Rolle mit dem Sperrhaken zum Schnurren bringen.</p>
          <p>Marjorie ruderte ein Stückchen an der Landspitze entlang, um nicht der Leine in die Quere zu kommen. Sie zog kräftig an den Rudern, und das Boot lief ein ganzes Stück den Strand hinauf. Kleine Wellen kamen mit ihm herauf. Marjorie stieg aus dem Boot, und Nick zog das Boot weit den Strand hinauf.</p>
          <p>„Was ist denn los, Nick?“ fragte Marjorie.</p>
          <p>„Ich weiß nicht“, sagte Nick und holte Holz, um Feuer zu machen.</p>
          <p>Sie machten ein Feuer mit Treibholz. Marjorie ging zum Boot und holte eine Decke. Die Abendbrise blies den Rauch nach der Landspitze zu, darum breitete Marjorie die Decke zwischen dem Feuer und dem See aus.</p>
          <p>Marjorie saß auf der Decke mit dem Rücken zum Feuer und wartete auf Nick. Er kam herüber und setzte sich neben sie auf die Decke. Hinter ihnen war der dichte junge Baumwuchs der Landspitze und vor ihnen war die Bucht mit der Mündung von Hortons Creek. Es war nicht ganz dunkel. Der Feuerschein reichte bis zum Wasser. Sie konnten beide die zwei Stahlruten schräg über dem dunklen Wasser sehen. Das Feuer blinkte auf den Rollen.</p>
          <p>Marjorie packte den Abendbrotkorb aus.</p>
          <p>„Mir ist gar nicht nach Essen“, sagte Nick.</p>
          <p>„Los, komm und iß, Nick.“</p>
          <p>„Schön.“</p>
          <p>Sie aßen, ohne zu sprechen, und beobachteten die beiden Angelruten und den Feuerschein auf dem Wasser.</p>
          <p>„Heute abend gibt&#x27;s Mondschein“, sagte Nick. Er sah über die Bucht hinweg nach den Hügeln, die sich scharf gegen den Himmel abzuzeichnen begannen. Er wußte, hinter den Hügeln kam der Mond herauf.</p>
          <p>„Ich weiß“, sagte Marjorie vergnügt.</p>
          <p>„Du weißt alles“, sagte Nick.</p>
          <p>„Ach bitte, Nick. Laß das. Bitte, sei nicht so.“</p>
          <p>„Ich kann nichts dafür“, sagte Nick. „Es ist doch so. Du weißt alles. Das ist das Unglück. Du weißt es.“</p>
          <p>Marjorie sagte gar nichts.</p>
          <p>„Ich habe dir alles beigebracht. Du weißt, daß es so ist. Überhaupt, was weißt du eigentlich nicht?“</p>
          <p>„Ach, sei doch still“, sagte Marjorie.“ Da kommt der Mond.“</p>
          <p>Sie saßen auf der Decke, ohne sich zu berühren, und sahen zu, wie der Mond aufging.</p>
          <p>„Du brauchst doch nicht so dumm zu reden“, sagte Marjorie. „Was ist denn eigentlich los?“</p>
          <p>„Ich weiß nicht.“</p>
          <p>„Natürlich weißt du&#x27;s.“</p>
          <p>„Nein, wirklich nicht.“</p>
          <p>„Los, sag&#x27;s.“</p>
          <p>Nick sah weiter auf den Mond, der über die Berge heraufkam.</p>
          <p>„Es macht keinen Spaß mehr.“</p>
          <p>Er hatte Angst, Marjorie anzusehen. Dann sah er sie an. Sie saß da und wandte ihm den Rücken zu. Er sah ihren Rücken an. „Es macht keinen Spaß mehr. Überhaupt nichts mehr.“</p>
          <p>Sie sagte nichts. Er fuhr fort: „ Weißt du, mir ist, als ob alles in mir zum Teufel gegangen ist. Ich weiß nicht, Marge. Ich weiß nicht, was ich sagen soll.“</p>
          <p>Er blickte weiter auf ihren Rücken.</p>
          <p>„Macht Liebe denn keinen Spaß?“ sagte Marjorie.</p>
          <p>„Nein“, sagte Nick. Marjorie stand auf. Nick saß da, den Kopf in die Hände gestützt.</p>
          <p>„Ich nehme das Boot“, rief ihm Marjorie zu. „Du kannst um die Landspitze herum zu Fuß zurückgehen.“</p>
          <p>„Schön“, sagte Nick. „Ich stoß das Boot für dich ab.“</p>
          <p>„Ist nicht nötig“, sagte sie. Sie trieb mit dem Boot auf dem mondbeschienenen Wasser. Nick ging zurück und legte sich neben das Feuer, mit dem Gesicht auf der Decke. Er konnte Marjorie auf dem Wasser rudern hören.</p>
          <p>Er lag dort eine lange Zeit. Er lag da, während er hörte, wie Bill, der durch den Wald strich, in die Lichtung kam. Er spürte, wie Bill sich dem Feuer näherte. Auch Bill berührte ihn nicht.</p>
          <p>„Ist sie endlich weg?“ fragte Bill.</p>
          <p>„Ja“, sagte Nick, der mit dem Gesicht auf der Decke dalag.</p>
          <p>„&#x27;ne Szene gehabt?“</p>
          <p>„Nein, wir hatten keine Szene.“</p>
          <p>„Wie fühlst du dich?“</p>
          <p>„Bitte geh weg, Bill. Geh, laß mich ein bißchen allein.“</p>
          <p>Bill suchte sich ein Sandwich aus dem Eßkorb aus und ging hinüber, sich die Angelruten ansehen.</p>
        </div>


        <div class="button-container">

          <!-- Shown when first reading the story -->
          <button
            v-if="storyReturnSection === ''"
            @click="section = 'intro'"
          >
            Zurück
          </button>

          <!-- Shown when the participant revisits the story -->
          <button
            v-if="storyReturnSection !== ''"
            @click="returnFromStory"
          >
            Zurück zur Frage
          </button>

          <button
            v-if="storyReturnSection === ''"
            @click="section = 'knowledge'"
          >
            Weiter
          </button>
        </div>
      </div>


      <!-- ================================================== -->
      <!-- SECTION 3: KNOWLEDGE QUESTIONNAIRE                   -->
      <!-- ================================================== -->

      <div v-else-if="section === 'knowledge'">
        <h2>Kurzer Fragebogen</h2>

        <!-- Knowledge step 1 -->
        <div v-if="knowledgeStep === 1" class="question">
          <p>
            Hast du die Geschichte schonmal gelesen?
          </p>

          <div class="radio-container">
            <label>
              <input
                type="radio"
                value="yes"
                v-model="read"
              />
              Ja
            </label>

            <label>
              <input
                type="radio"
                value="no"
                v-model="read"
              />
              Nein
            </label>
          </div>

          <div class="button-container">
            <button @click="section = 'story'">
              Zurück
            </button>

            <button @click="openStory('knowledge')">
              Zurück zur Geschichte
            </button>

            <button
              :disabled="!read"
              @click="
                read === 'yes'
                  ? knowledgeStep = 2
                  : knowledgeStep = 3
              "
            >
              Weiter
            </button>
          </div>
        </div>


        <!-- Knowledge step 2 -->
        <div v-if="knowledgeStep === 2" class="question">

          <div v-if="read === 'yes'">
            <p>Wie lange ist es her, dass du sie gelesen hast?</p>
            <textarea 
              class="knowledge-textarea"
              v-model="whenRead">
            </textarea>

            <p class="followup-question">
              Wie gut erinnerst du dich an die Geschichte?
            </p>
            <textarea 
              class="knowledge-textarea"
              v-model="memory">
            </textarea>

            <p class="followup-question">
              Hast du die Geschichte für die Schule oder zum Vergnügen gelesen?
            </p>

            <div class="radio-container">
              <label>
                <input
                  type="radio"
                  value="school"
                  v-model="reason"
                />
                Schule
              </label>

              <label>
                <input
                  type="radio"
                  value="pleasure"
                  v-model="reason"
                />
                Vergnügen
              </label>
            </div>

            <div v-if="reason === 'school'">
              <p>In welcher Klasse warst du?</p>
              <textarea
                class="knowledge-textarea"
                v-model="grade"
              ></textarea>

              <p class="followup-question">
                Für welches Fach war es?
              </p>
              <textarea
                class="knowledge-textarea"
                v-model="className"
              ></textarea>
            </div>
          </div>

          <div class="button-container">
            <button @click="knowledgeStep = 1">
              Zurück
            </button>

            <button @click="openStory('knowledge')">
              Zurück zur Geschichte
            </button>

            <button
              :disabled="
                read === 'yes' &&
                (
                  !whenRead.trim() ||
                  !memory.trim() ||
                  !reason ||
                  (reason === 'school' && (!grade.trim() || !className.trim()))
                )
              "
              @click="knowledgeStep = 3"
            >
              Weiter
            </button>
          </div>
        </div>


        <!-- Knowledge step 3 -->
        <div v-if="knowledgeStep === 3" class="question">
          <p>
            Kommt dir die Geschichte bekannt vor?
          </p>

          <div class="radio-container">
            <label>
              <input
                type="radio"
                value="yes"
                v-model="familiar"
              />
              Ja
            </label>

            <label>
              <input
                type="radio"
                value="no"
                v-model="familiar"
              />
              Nein
            </label>
          </div>

          <div class="button-container">
            <button @click="knowledgeStep = 2">
              Zurück
            </button>

            <button @click="openStory('knowledge')">
              Zurück zur Geschichte
            </button>

            <button
              :disabled="!familiar"
              @click="
                familiar === 'yes'
                  ? knowledgeStep = 4
                  : finishKnowledgeQuestionnaire()
              "
            >
              Weiter
            </button>
          </div>
        </div>


        <!-- Knowledge step 4 -->
        <div v-if="knowledgeStep === 4" class="question">

          <div v-if="familiar === 'yes'">
            <p>
              Weißt du etwas über diese Geschichte? Was weißt du?
            </p>

            <textarea
              class="knowledge-textarea"
              v-model="familiarExplanation"
            ></textarea>

            <p class="followup-question">
              Hast du über die Geschichte mit jemandem gesprochen?
            </p>

            <textarea
              class="knowledge-textarea"
              v-model="discussed"
            ></textarea>
          </div>

          <div class="button-container">
            <button @click="knowledgeStep = 3">
              Zurück
            </button>

            <button @click="openStory('knowledge')">
              Zurück zur Geschichte
            </button>

            <button
              :disabled="
                !familiarExplanation.trim() ||
                !discussed.trim()
              "
              @click="finishKnowledgeQuestionnaire"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>


      <!-- ================================================== -->
      <!-- SECTION 4: SECOND INSTRUCTIONS                       -->
      <!-- ================================================== -->

      <div
        v-else-if="section === 'questionInstructions'"
        class="instructions"
      >
        <h2>Fragen zur Geschichte</h2>

        <p>
          Dir werden nun einige Fragen zur Geschichte gestellt. Für die meisten Fragen, gibt es keine richtige oder falsche Antwort.
        </p>

        <p>
          Uns interessiert auch, was deiner Meinung nach die Gedanken, Gefühle und Absichten der Charaktere sind, wenn dies für die Frage relevant ist.
        </p>

        <p>
          Du kannst jederzeit zur Geschichte zurückkehren, indem du auf den "Zurück zur Geschichte"-Knopf klickst. Klicke nun auf "Weiter", um mit der Beantwortung der Fragen zu beginnen.
        </p>

        <div class="button-container">
          <button @click="section = 'knowledge'">
            Zurück
          </button>

          <button @click="openStory('questionInstructions')">
            Zurück zur Geschichte
          </button>

          <button @click="section = 'comprehension'">
            Weiter
          </button>
        </div>
      </div>


      <!-- ================================================== -->
      <!-- SECTION 5: COMPREHENSION QUESTIONNAIRE               -->
      <!-- ================================================== -->

      <div v-else-if="section === 'comprehension'">
        <h2>Fragen zur Geschichte</h2>

        <p class="question-number">
          Frage {{ comprehensionStep + 1 }}
          von {{ comprehensionQuestions.length }}
        </p>

        <div class="question">
          <p>
            {{ comprehensionQuestions[comprehensionStep] }}
          </p>

          <textarea
            class="comprehension-textarea"
            v-model="comprehensionAnswers[comprehensionStep]"
          ></textarea>

          <div class="button-container">
            <button @click="previousComprehensionQuestion">
              Zurück
            </button>

            <button @click="openStory('comprehension')">
              Zurück zur Geschichte
            </button>

            <button
              v-if="
                comprehensionStep <
                comprehensionQuestions.length - 1
              "
              :disabled="!currentComprehensionAnswer"
              @click="comprehensionStep++"
            >
              Weiter
            </button>

            <button
              v-else
              :disabled="!currentComprehensionAnswer"
              @click="submitTask"
            >
              Fertig
            </button>
          </div>
        </div>
      </div>

    </div>
  </Screen>
</template>

<script>
export default {
  name: "ShortStoryTask",

  data() {
    return {
      section: "intro",

      /*
       * When the participant opens the story from a questionnaire,
       * this stores where they should return.
       */
      storyReturnSection: "",

      /*
       * Knowledge questionnaire state
       */
      knowledgeStep: 1,

      read: "",
      whenRead: "",
      memory: "",
      reason: "",
      grade: "",
      className: "",

      familiar: "",
      familiarExplanation: "",
      discussed: "",

      /*
       * Comprehension questionnaire state
       */
      comprehensionStep: 0,

      comprehensionQuestions: [
        "Wie würdest du die Geschichte in wenigen Sätzen zusammenfassen?",

        "Was beobachten Nick und Marjorie am Ufer, als sie zum Ort rudern, an dem sie ihre Angelschnüre auswerfen wollen?",

        "Was meint Nick, wenn er sagt: „Sie beißen nicht an?“",

        "Zu welchem Zweck haben Nick und Marjorie einen Eimer voller Barsche?",

        "Deuten Marjories Handlungen darauf hin, dass sie Erfahrung im Angeln hat oder nicht? Woran erkennst du das?",

        "Warum sagt Nick zu Marjorie: „Du weißt alles“?",

        "Warum antwortet Marjorie: „Ach bitte, Nick. Laß das. Bitte, sei nicht so.“",

        "Warum hat Nick Angst, Marjorie anzusehen?",

        "Was meint Nick, wenn er sagt: „Es macht keinen Spaß mehr“?",

        "Warum sitzt Marjorie mit dem Rücken zu Nick, als sie fragt: „Macht Liebe denn keinen Spaß?“?",

        "Warum nimmt Marjorie das Boot und fährt weg und wie fühlt sie sich in diesem Moment?",

        "Wer ist Bill und was verrät er, als er Nick fragt: „Ist sie endlich weg? 'ne Szene gehabt?“?",

        "Wie fühlt sich Nick, als er sagt: „Bitte geh weg, Bill. Geh, laß mich ein bißchen allein!“?",

        "Die Geschichte heißt „Das Ende von Etwas“. Worauf bezieht sich der Titel?"
      ],

      comprehensionAnswers: Array(14).fill("")
    };
  },

  computed: {
    currentComprehensionAnswer() {
      const answer =
        this.comprehensionAnswers[this.comprehensionStep];

      return (
        typeof answer === "string" &&
        answer.trim() !== ""
      );
    }
  },

  methods: {
    openStory(returnSection) {
      this.storyReturnSection = returnSection;
      this.section = "story";
    },

    returnFromStory() {
      this.section = this.storyReturnSection;
      this.storyReturnSection = "";
    },

    finishKnowledgeQuestionnaire() {

      this.$magpie.addTrialData({
        trial_type: "story_previous_knowledge",

        read: this.read,
        when_read: this.whenRead,
        memory: this.memory,
        reason: this.reason,
        grade: this.grade,
        class_name: this.className,

        familiar: this.familiar,
        familiar_explanation: this.familiarExplanation,
        discussed: this.discussed
      });

      this.section = "questionInstructions";
    },

    previousComprehensionQuestion() {
      if (this.comprehensionStep > 0) {
        this.comprehensionStep--;
      } else {
        this.section = "questionInstructions";
      }
    },

    submitTask() {
      const responseData = {};

      this.comprehensionAnswers.forEach((answer, index) => {
        responseData[`question_${index + 1}`] = answer;
      });

      this.$magpie.addTrialData({
        trial_type: "story_comprehension",
        ...responseData
      });

      this.$magpie.nextScreen();
    }
  }
};
</script>
<style scoped>
.story-text {
  max-width: 700px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.6;
  text-align: left;
}

.story-text p {
  margin: 0 0 1em;
}

.knowledge-textarea {
  width: 100%;
  max-width: 620px;
  min-height: 80px;

  padding: 10px;
  font-size: 17px;
  line-height: 1.4;

  resize: vertical;
  box-sizing: border-box;
}


.comprehension-textarea {
  width: 100%;
  max-width: 700px;

  min-height: 220px;

  padding: 14px;

  font-size: 18px;
  line-height: 1.6;

  resize: vertical;
  box-sizing: border-box;
}

.instructions {
  width: 700px;
  max-width: 95vw;
  margin: 0 auto;
  text-align: justify;
}

.instructions h2 {
  text-align: center;
  margin: 0 0 18px;
}

.instructions p {
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.instructions .button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.button-container button {
  display: inline-block;
  width: auto;
  margin: 0;
}

</style>