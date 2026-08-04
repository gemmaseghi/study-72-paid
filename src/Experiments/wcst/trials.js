/*
 * Shape codes:
 * t  = triangolo
 * s  = stella
 * cr = croce
 * c  = cerchio
 *
 * Colour codes:
 * r = rosso
 * v = verde
 * g = giallo
 * b = blu
 */

export const SORTING_RULES = ["color", "number", "shape"];

function getCardImage(cardId) {
  return `${process.env.BASE_URL}wcst/stimuli/${cardId}.png`;
}

export const referenceCards = [
  {
    deck_id: 1,
    card_id: "t_r_1",
    shape: "t",
    color: "r",
    number: 1,
    image: getCardImage("t_r_1")
  },
  {
    deck_id: 2,
    card_id: "s_v_2",
    shape: "s",
    color: "v",
    number: 2,
    image: getCardImage("s_v_2")
  },
  {
    deck_id: 3,
    card_id: "cr_g_3",
    shape: "cr",
    color: "g",
    number: 3,
    image: getCardImage("cr_g_3")
  },
  {
    deck_id: 4,
    card_id: "c_b_4",
    shape: "c",
    color: "b",
    number: 4,
    image: getCardImage("c_b_4")
  }
];

const shapes = ["t", "s", "cr", "c"];
const colors = ["r", "v", "g", "b"];
const numbers = [1, 2, 3, 4];

function createCards() {
  const cards = [];
  let cardNumber = 1;

  shapes.forEach(shape => {
    colors.forEach(color => {
      numbers.forEach(number => {
        const cardId = `${shape}_${color}_${number}`;

        cards.push({
          card_number: cardNumber,
          card_id: cardId,
          shape,
          color,
          number,
          image: getCardImage(cardId)
        });

        cardNumber += 1;
      });
    });
  });

  return cards;
}

export function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export const FIXED_RULE_SEQUENCE = [
  "color",
  "shape",
  "number",
  "color",
  "shape",
  "number"
];

export function createRuleSequence() {
  return [...FIXED_RULE_SEQUENCE];
}


export const allCards = createCards();