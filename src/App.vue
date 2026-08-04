<template>
  <Experiment title="Perspective-taking experiment">
    <!-- ====================================== -->
    <!-- Experiment 1: Redundancy production   -->
    <!-- ====================================== -->

    <GeneralInstructions />
    <RedundancyInstructions />

    <RedundancyGridTrial
      v-for="sceneGroup in randomizedSceneGroups"
      :key="`redundancy-scene-${sceneGroup.scene_id}`"
      :trials="sceneGroup.trials"
      :scene-id="sceneGroup.scene_id"
      :scene-number="sceneGroup.presentation_order"
    />

    <EndFirstExperiment />
    <!-- ====================================== -->
    <!-- Experiment 2: WCST                     -->
    <!-- ====================================== -->

    <WcstInstructions />

    <WcstGridTrial />

    <EndSecondExperiment />

    <!-- ====================================== -->
    <!-- Experiment 3: Director task            -->
    <!-- ====================================== -->

    <InstructionsSpeaker />

    <PracticeSpeaker />

    <InstructionsListener />

    <PracticeListener />

    <InstructionsWithBack />

    <PracticeBlock :practiceTrials="practiceTrials" />

    <GridTrial
      v-for="block in trialBlocks"
      :key="block[0].block_id"
      :block="block"
    />

    <Questionnaire />

    <EndThirdExperiment />

    <!-- ====================================== -->
    <!-- Experiment 5: Stroop Task         -->
    <!-- ====================================== -->

    <StroopInstructions />
    <StroopGridTrial />
    
    <EndFourthExperiment />
    <!-- ====================================== -->
    <!-- Experiment 5: Short Story Task         -->
    <!-- ====================================== -->

    <FullTask />

    <EndLastExperiment />

    <SubmitResultsScreen />
  </Experiment>
</template>

<script>

/*
 * Experiment 1: Redundancy
 */
import randomizedSceneGroups from "./Experiments/redundancy/trials";
import RedundancyInstructions from "./Experiments/redundancy/Instructions.vue";
import RedundancyGridTrial from "./Experiments/redundancy/GridTrial.vue";
import EndFirstExperiment from "./Experiments/redundancy/EndFirstExperiment.vue";
import GeneralInstructions from "./Experiments/redundancy/GeneralInstructions.vue";

/*
 * Experiment 2: WCST
 */
import WcstInstructions from "./Experiments/wcst/Instructions.vue";
import WcstGridTrial from "./Experiments/wcst/GridTrial.vue";
import EndSecondExperiment from "./Experiments/wcst/EndSecondExperiment.vue";
 
/*
 * Experiment 3: Director task
 */
import trialBlocks from "./Experiments/main/trials";
import InstructionsSpeaker from "./Experiments/main/InstructionsSpeaker.vue";
import InstructionsListener from "./Experiments/main/InstructionsListener.vue";
import InstructionsWithBack from "./Experiments/main/InstructionsWithBack.vue";
import PracticeSpeaker from "./Experiments/main/PracticeSpeaker.vue";
import PracticeListener from "./Experiments/main/PracticeListener.vue";
import PracticeBlock from "./Experiments/main/PracticeBlock.vue";
import practiceTrials from "./Experiments/main/PracticeTrials";
import GridTrial from "./Experiments/main/GridTrial.vue";
import Questionnaire from "./Experiments/main/Questionnaire.vue";
import EndThirdExperiment from "./Experiments/main/EndThirdExperiment.vue";

/*
 * Experiment 5: Stroop task
 */

 import StroopInstructions from "./Experiments/stroop/Instructions.vue";
 import StroopGridTrial from "./Experiments/stroop/GridTrial.vue";
 import EndFourthExperiment from "./Experiments/stroop/EndFourthExperiment.vue";


/*
 * Experiment 5: Short Story task
 */
import EndLastExperiment from "./Experiments/sst/EndFLastExperiment.vue";
import FullTask from "./Experiments/sst/fullTask.vue";


export default {
  name: "App",
  components: {
    /*
     * Redundancy experiment
     */
    /*
    GeneralInstructions,
    RedundancyInstructions,
    RedundancyGridTrial,
    EndFirstExperiment,
     */
    /*
     * wcst task
     */
    /*
    WcstInstructions,
    WcstGridTrial,
    EndSecondExperiment,
     */
    /*
     * Director task
     */
    /*
    InstructionsSpeaker,
    PracticeSpeaker,
    InstructionsListener,
    PracticeListener,
    InstructionsWithBack,
    GridTrial,
    PracticeBlock,
    Questionnaire,
    EndThirdExperiment,
     */
    /*
     * Stroop task
     */
    /*
    StroopInstructions,
    StroopGridTrial,
    EndFourthExperiment,
     */
    /*
     * Short Story task
     */
    EndLastExperiment,
    FullTask
  },
  data() {
    return {
      randomizedSceneGroups,
      trialBlocks,
      practiceTrials
    };
  }
};
</script>

<style>
.experiment {
  width: 1500px !important;
  max-width: 95vw !important;
}
</style>