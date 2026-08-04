const imagePath = filename =>
    `${process.env.BASE_URL}stroop/stimuli/${filename}`;

export const stimuli = [
    { word: "ROT", color: "red", congruent: true, key: "r", image: imagePath("r_r.png")},
    { word: "ROT", color: "green", congruent: false, key: "g", image: imagePath("r_g.png")},
    { word: "ROT", color: "lila", congruent: false, key: "l", image: imagePath("r_l.png")},
    { word: "ROT", color: "orange", congruent: false, key: "o", image: imagePath("r_o.png")},

    { word: "GRÜN", color: "green", congruent: true, key: "g", image: imagePath("g_g.png")},
    { word: "GRÜN", color: "orange", congruent: false, key: "o", image: imagePath("g_o.png")},
    { word: "GRÜN", color: "lila", congruent: false, key: "l", image: imagePath("g_l.png")},
    { word: "GRÜN", color: "red", congruent: false, key: "r", image: imagePath("g_r.png")},

    { word: "LILA", color: "lila", congruent: true, key: "l", image: imagePath("l_l.png")},
    { word: "LILA", color: "orange", congruent: false, key: "o", image: imagePath("l_o.png")},
    { word: "LILA", color: "green", congruent: false, key: "g", image: imagePath("l_g.png")},
    { word: "LILA", color: "red", congruent: false, key: "r", image: imagePath("l_r.png")},

    { word: "ORANGE", color: "orange", congruent: true, key: "o", image: imagePath("o_o.png")},
    { word: "ORANGE", color: "green", congruent: false, key: "g", image: imagePath("o_g.png")},
    { word: "ORANGE", color: "lila", congruent: false, key: "l", image: imagePath("o_l.png")},
    { word: "ORANGE", color: "red", congruent: false, key: "r", image: imagePath("o_r.png")},

];

function shuffle(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }

    return shuffled;
}

function repeatStimulus(stimulus, amount) {
    return Array.from({ length: amount }, () => ({
        ...stimulus
    }));
}

export function createStroopTrials() {
    const congruentStimuli = stimuli.filter(
        stimulus => stimulus.congruent
    );

    const incongruentStimuli = stimuli.filter(
        stimulus => !stimulus.congruent
    );

    const congruentTrials = congruentStimuli.flatMap(
        stimulus => repeatStimulus(stimulus, 10)
    );

    const shuffledIncongruentStimuli = shuffle(
        incongruentStimuli
    );

    const incongruentTrials = shuffledIncongruentStimuli.flatMap(
        (stimulus, index) => {
            const repetitions = index < 4 ? 4 : 3;

            return repeatStimulus(stimulus, repetitions);
        }
    );

    const allTrials = shuffle([
        ...congruentTrials,
        ...incongruentTrials
    ]);

    return allTrials.map((trial, index) => ({
        ...trial,
        trialNumber: index + 1
    }));
}