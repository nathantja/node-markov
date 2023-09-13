"use strict";

const { MarkovMachine } = require("./markov");

const INPUT_NO_BRANCH = "The cat in the hat.";
const INPUT_BRANCH = "The cat is in the hat. The cat is the cat. The hat is a cat.";

const MACHINE_NO_BRANCH = new MarkovMachine(INPUT_NO_BRANCH);
const MACHINE_BRANCH = new MarkovMachine(INPUT_BRANCH);

/** Test the output of markov chains, with expected output for a machine with
branches and without branches. */
describe("chains property", function () {

  test("chains with no branches", function () {
    expect(MACHINE_NO_BRANCH.chains).toEqual({
      The: ['cat'],
      cat: ['in'],
      in: ['the'],
      the: ['hat.'],
      'hat.': [null]
    });
  });

  test("chains with branches", function () {
    expect(MACHINE_BRANCH.chains).toEqual(
      {
        The: ['cat', 'cat', 'hat'],
        cat: ['is', 'is'],
        is: ['in', 'the', 'a'],
        in: ['the'],
        the: ['hat.', 'cat.'],
        'hat.': ['The'],
        'cat.': ['The', null],
        hat: ['is'],
        a: ['cat.']
      }
    );
  });

});


/** Test getText for a MarkovMachine with branches and without branches. */
describe("getText method", function () {

  test("text with no branches", function () {
    expect(MACHINE_NO_BRANCH.getText()).toEqual("The cat in the hat.");
  });

  test("text with branches, output must be in instance's words", function () {
    const text = MACHINE_BRANCH.getText().split(" ");

    for (const word of text) {
      expect(MACHINE_BRANCH.words).toContain(word);
    }
  });

  test("text with branches, next word must be valid in chains", function () {
    const text = MACHINE_BRANCH.getText().split(" ");

    for (let i = 0; i < text.length; i++) {
      let currWord = text[i];
      let nextWord = text[i + 1] || null;
      expect(MACHINE_BRANCH.chains[currWord]).toContain(nextWord);
    }
  });

});