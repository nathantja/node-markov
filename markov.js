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

    let text = [];
    text.push(this.words[0]);

    let notNull = true;

    while (notNull === true) {
      let prevWord = text[text.length - 1];
      let randomIdx = Math.floor(Math.random() * this.chains[prevWord].length);
      let nextWord = this.chains[prevWord][randomIdx];

      if (nextWord === null) {
        notNull = false;

        return text.join(" ");

      } else {
        text.push(nextWord);
      }
    }
  }
}


module.exports = {
  MarkovMachine,
};