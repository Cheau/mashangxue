const shorts = {
  adjective: 'adj.',
  adverb: 'adv.',
  article: 'art.',
  conjunction: 'conj.',
  interjection: 'interj.',
  noun: 'n.',
  numeral: 'num.',
  preposition: 'prep.',
  pronoun: 'pron.',
  verb: 'v.',
}

const fulls = Object.entries(shorts).reduce((accumulator, entry) => {
  const [key, value] = entry
  accumulator[value] = key
  return accumulator
}, {})

export function abbreviate(full) {
  return shorts[full]
}

export function elongate(short) {
  return fulls[short]
}
