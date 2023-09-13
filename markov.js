"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */
  getChains() {
    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      chains[currWord] = chains[currWord] || [];
      chains[currWord].push(nextWord);
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */
  getText() {
    const text = [];
    text.push(this.words[0]);

    // TODO: could refactor - look to actual null value for source of truth
    let notNull = true;

    while (notNull === true) {
      const prevWord = text[text.length - 1];

      //TODO: could refactor - functional decomposition for testing
      const randomIdx = Math.floor(Math.random() * this.chains[prevWord].length);
      const nextWord = this.chains[prevWord][randomIdx];

      if (nextWord === null) {
        notNull = false;
      } else {
        text.push(nextWord);
      }
    }

    return text.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};