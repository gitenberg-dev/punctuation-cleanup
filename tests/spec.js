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
        var testString = "So:  from the law's point of view, why risk missing anything\?  Take the works.";  // Hacker Crackdown
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
        var testString = "suddenly--\"\'Tain\'t far\nship!\"--\"\'Tain\'t his fault, is it?\" argued Belfast,";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("suddenly—“’Tain’t far\nship!”—“’Tain’t his fault, is it?” argued Belfast,")
    }); //ship!”—“’Tain’t his fault
    it("should fix s'long", function() {
        var testString = "yerself, s'long as ye're right";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("yerself, s’long as ye’re right")
    });
    it("should fix look'st", function() {
        var testString = "     Why look'st thou so?";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("     Why look’st thou so?")
    });
    it("should fix gran'mother", function() {
        var testString = "gran'mother! Yer afeard! Who's yer ter be afeard";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("gran’mother! Yer afeard! Who’s yer ter be afeard")
    });
    it("should fix gi'e me", function() {
        var testString = "Gi'e me\nand breathe. Archie shouted:--\"Gi'e me room!\" We crouched behind him,";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal('Gi’e me\nand breathe. Archie shouted:—“Gi’e me room!” We crouched behind him,')
    });
    it("should fix more'n", function() {
        var testString = "been there more'n thirty hours.\nyer wusse'n ever?\nevery chokey in the Colonies rather'n give up my rights\ntreated worser'n a dorg\nbetter'n a tot o' rum";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("been there more’n thirty hours.\nyer wusse’n ever?\nevery chokey in the Colonies rather’n give up my rights\ntreated worser’n a dorg\nbetter’n a tot o’ rum")
    });
    it("should fix fo'c'sle", function() {
        var testString = "ship's fo'c'sle!... Not a blooming scrap of meat in the kids.";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("ship’s fo’c’sle!... Not a blooming scrap of meat in the kids.")
    });
});
describe("elided letters", function() {
    it("should fix dropped final f — i.e., o' [o(f) ]", function() {
        var testString = "better'n a tot o' rum\nYou know I can't sleep o' nights.";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("better’n a tot o’ rum\nYou know I can’t sleep o’ nights.")
    });
    it("should fix dropped final ugh — i.e., tho' [tho(ugh) ]", function() {
        var testString = "Good cook tho'.\nCan never tell tho'\n";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("Good cook tho’.\nCan never tell tho’\n")
    });
    it("should fix elided initial h in (h)e: 'e", function() {
        var testString = "said 'e would brain me\nWhat 'ee could do without hus?\nDon't 'ee believe him!";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("said ’e would brain me\nWhat ’ee could do without hus?\nDon’t ’ee believe him!")
    });
    it("should fix elided initial he in (he)art: 'art", function() {
        var testString = "blast their black 'arts\n'artless canny-bals?\nyer never seed a man 'art up\?";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("blast their black ’arts\n’artless canny-bals?\nyer never seed a man ’art up?")
    });
    it("should fix elided initial h in (h)ang and (h)ard: 'ang, 'ard", function() {
        var testString = "The night's dry, let 'em 'ang out till\nyer never seed a man 'ard up\?";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("The night’s dry, let ’em ’ang out till\nyer never seed a man ’ard up?")
    });
    it("should fix elided initial h in (h)old, (h)ome and (h)ell: 'old, 'ome, 'ell", function() {
        var testString = "We're all goin' to 'ell now.\nWell, it's a 'omeward trip, anyhow.\nI 'old you up";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("We’re all goin’ to ’ell now.\nWell, it’s a ’omeward trip, anyhow.\nI ’old you up")
    });
    it("should fix elided initial h in (h)as: 'as, 'As", function() {
        var testString = "What 'as he done\?\n'As any of you 'art enough to spare";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("What ’as he done?\n’As any of you ’art enough to spare")
    });
    it("should fix elided initial h in (h)im: catch 'im", function() {
        var testString = "'Catch 'im,' he snapped\nGive 'im to us.\n'Eat 'im!' he said curtly\nbreak 'im up\"\ncatch\n'im.";  // Conrad Heart of Darkness
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("‘Catch ’im,’ he snapped\nGive ’im to us.\n‘Eat ’im!’ he said curtly\nbreak ’im up”\ncatch\n’im.")
    });
    it("should fix elided initial h  or i after dash and open quote: 'Ave, 'Tain't", function() {
        var testString = "yelled out:--\"'Ave you been to your dentyst\nsuddenly--\"'Tain't far\nbeam.--\"'Ow\nmuttering:--\"'Twill make\nbegan to shout:--\"'Ear 'im;";  // Conrad Heart of Darkness
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("yelled out:—“’Ave you been to your dentyst\nsuddenly—“’Tain’t far\nbeam.—“’Ow\nmuttering:—“’Twill make\nbegan to shout:—“’Ear ’im;")
    });
});
//"What 'as he done?"
