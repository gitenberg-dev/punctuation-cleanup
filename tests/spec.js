/*eslint-env node, mocha */
var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var replacements = require('../replacements.js');
var cleanup = require('../cleanup.js');

describe("common contractions", function() {
    it("should fix I'd", function() {
        var testString = "But they'd never met anyone from LoD.  Even some of the";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("But they’d never met anyone from LoD.  Even some of the")
    });
    it("should fix he'll", function() {
        var testString = "He'll shrieve my soul, he'll wash away";  // Rime of the Ancient Mariner
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("He’ll shrieve my soul, he’ll wash away")
    });
    it("should fix I'm", function() {
        var testString = "SCARED of a guy like that.  But I'm not scared.\nI'm from Chicago.  I'm gonna hunt him down.";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("SCARED of a guy like that.  But I’m not scared.\nI’m from Chicago.  I’m gonna hunt him down.")
    });
    it("should fix you're", function() {
        var testString = "They're not black or white, or Establishment or Underground,";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("They’re not black or white, or Establishment or Underground,")
    });
    it("should fix it's", function() {
        var testString = "digital underground: it's probably the most pirated piece";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("digital underground: it’s probably the most pirated piece")
    });
    it("should fix don't", function() {
        var testString = "everlasting fire... don't you feel it? Blind, chockfull of sin! Repent,";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("everlasting fire... don’t you feel it? Blind, chockfull of sin! Repent,")
    });
    it("should fix I've", function() {
        var testString = "Carlton Fitzpatrick is the only person I've met in cyberspace circles";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("Carlton Fitzpatrick is the only person I’ve met in cyberspace circles")
    });
});
describe("possessives", function() {
    it("should fix singular possessive: boy's", function() {
        var testString = "So:  from the law's point of view, why risk missing anything?  Take the works.";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("So:  from the law’s point of view, why risk missing anything?  Take the works.")
    });
    it("should fix upper-case singular possessive: GRIMM'S", function() {
        var testString = "PAYING THIS GUY'S RENT while grinding their teeth in anguish,";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("PAYING THIS GUY’S RENT while grinding their teeth in anguish,")
    });
    it("should fix plural possessive: boys' ", function() {
        var testString = "and some WWII vintage blockhouses and officers' quarters.";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("and some WWII vintage blockhouses and officers’ quarters.")
    });
});
describe("common uses", function() {
    it("should fix Irish names: O'Reilly", function() {
        var testString = "shipping barn, on the Monsignor O'Brien Highway, that is owned";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("shipping barn, on the Monsignor O’Brien Highway, that is owned")
    });
    it("should fix decades: '70s", function() {
        var testString = "of New York in the '70s, when he became involved with the local";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("of New York in the ’70s, when he became involved with the local")
    });
    it("should fix single year: '66", function() {
        var testString = "programming computers.  IBM 1620s, in 1965 and '66.";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("programming computers.  IBM 1620s, in 1965 and ’66.")
    });
    it("should fix o'clock", function() {
        var testString = "It was nine o'clock. Mr. Baker, speaking up to the man above him,";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("It was nine o’clock. Mr. Baker, speaking up to the man above him,")
    });
});
describe("less-common contractions", function() {
    it("should fix ha'penny", function() {
        var testString = "For a ha'penny I would knock";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("For a ha’penny I would knock")
    });
    it("should fix sou'west", function() {
        var testString = "the wind went round to the sou'west and began to pipe up. In two days it";  // Conrad Youth
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("the wind went round to the sou’west and began to pipe up. In two days it")
    });
    it("should fix o'er & ne'er", function() {
        var testString = "     With far-heard whisper, o'er the sea.\n     It ate the food it ne'er had eat,";  // Rime of the Ancient Mariner
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("     With far-heard whisper, o’er the sea.\n     It ate the food it ne’er had eat,")
    });
    it("should fix t'other", function() {
        var testString = "t'other in his pocket";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("t’other in his pocket")
    });
    it("should fix 'twas and 'Twas", function() {
        var testString = "     And now 'twas like all instruments,\n     'Twas sad as sad could be;";  // Rime of the Ancient Mariner
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("     And now ’twas like all instruments,\n     ’Twas sad as sad could be;")
    });
    it("should fix 'tis and 'Tis", function() {
        var testString = "     'Tis sweeter far to me,\n 'tis";  // Rime of the Ancient Mariner
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("     ’Tis sweeter far to me,\n ’tis")
    });
    it("should fix 'tain't and 'Tain't", function() {
        var testString = "'Tain't far\n 'tain't\nship!\"--\"'Tain't his fault, is it?\" argued Belfast,";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("’Tain’t far\n ’tain’t\nship!”—“’Tain’t his fault, is it?” argued Belfast,")
    });
    it("should fix s'long", function() {
        var testString = "yerself, s'long as ye're right";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("yerself, s’long as ye’re right")
    });
});

//ship!\"--\"'Tain't his fault, is it?\" argued Belfast,

