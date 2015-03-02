//  punctuation-cleanup.js
//  use:   $ node punctuation-cleanup.js  file-to-clean.txt  cleaned-file.txt
/*
 * MIT license http://opensource.org/licenses/MIT
 *
 * Original author of this script: rsperberg@gmail.com
 */

var fs = require("fs");

//  identify each type of change, particularly for the apostrophe, since global change (e.g., /.'./g or /(\w|\d)'(\w|\d)/g) is just too risky
//  By making only known changes, stray apostrophes and quotes can be located easily
//  not yet defined:  single quotes within double quotes

var replacements = [
    { searchFor: /Character set encoding: ASCII/, replaceWith: "Character set encoding: UTF-8"},  //  dashes and curly quotes aren't in ASCII
    { searchFor: /(That|that|this) 'ere/g, replaceWith: "$1 ’ere"},   //  elided consonant: (h)ere (Youth)
    { searchFor: /black 'arts/g, replaceWith: "black ’arts"},   //  black (he)arts (Conrad 'Narcissus')
    { searchFor: /fo'c'sle/g, replaceWith: "fo’c’sle"},   //  fo'c'sle (forecastle) (Conrad 'Narcissus')
    { searchFor: /(A|a)'n't/g, replaceWith: "$1’n’t"},   //  ain't (Conrad 'Narcissus')
    { searchFor: /'art/g, replaceWith: "’art"},   //  (he)art (Conrad 'Narcissus')
    { searchFor: /'art/g, replaceWith: "’art"},   //  (he)art (Conrad 'Narcissus')
    { searchFor: /'(As|as)\b/g, replaceWith: "’$1"},   //  (h)ard (Conrad 'Narcissus')
    { searchFor: /"'(Cos)/g, replaceWith: "“’$1"},   //  (be)cause (Conrad 'Narcissus')
    { searchFor: /'(Cos|cos)/g, replaceWith: "’$1"},   //  (be)cause (Conrad 'Narcissus')
    { searchFor: / 'ome/g, replaceWith: " ’ome"},   //  (h)omeward (Conrad 'Narcissus')
    { searchFor: / '(ed|ad|un)\b/g, replaceWith: " ’$1"},   //  (h)e(a)d, (h)ad, good 'un (Conrad 'Narcissus')
    { searchFor: /([C|c]atch|Give|Eat) 'im/g, replaceWith: "$1 ’im"},   //  Catch 'im, Give 'im (Heart of Darkness)
    { searchFor: /^'im\./gm, replaceWith: "’im."},   //  catch 'im (Heart of Darkness) [Be specific so as not to change something unwittingly]
    { searchFor: /'d\b/g, replaceWith: "’d"},    // I'd
    { searchFor: /'ll\b/g, replaceWith: "’ll"},    //  you'll
    { searchFor: /'m\b/g, replaceWith: "’m"},    //  I'm
    { searchFor: /'re\b/g, replaceWith: "’re"},    //  you're
    { searchFor: /'(s|S)\b/g, replaceWith: "’$1"},    //  it's, GRIMM'S (Youth)
    { searchFor: /s'(\s)/g, replaceWith: "s’$1"},    //  plural possessive
    { searchFor: /s'(long)/g, replaceWith: "s’$1"},    //  s'long (Conrad 'Narcissus')
    { searchFor: /'st\b/g, replaceWith: "’st"},    //  look'st (Rime of the Ancient Mariner)
    { searchFor: /'t\b/g, replaceWith: "’t"},   //  don't
    { searchFor: /'ve\b/g, replaceWith: "’ve"},   //  I've
    { searchFor: /(\s)'(\d\ds)/g, replaceWith: "$1’$2"},   //  ’90s
    { searchFor: /O'([A-Z])/g, replaceWith: "O’$1"},    //  O'Reilly
    { searchFor: /o'clock/g, replaceWith: "o’clock"},    //  o'clock
    { searchFor: /(o|e)'e/g, replaceWith: "$1’e"},    //  o'er, ne'er (Rime)
    { searchFor: /(sou)'west/g, replaceWith: "$1’west"},    //  sou'west (Youth)
    { searchFor: /'(em|gan|baccy|ave|ee )\b/g, replaceWith: "’$1"},    //  'em, 'gan  (Rime), 'baccy, 'ave, 'ee (Conrad 'Narcissus')
    { searchFor: /'ave/g, replaceWith: "’ave"},    //   'ave, 'aven't (Conrad 'Narcissus')
//    { searchFor: /",/g, replaceWith: ',”'},    // comma outside quote mark
//    { searchFor: /"\./g, replaceWith: '.”'},    // period outside quote mark (transpose only)
    { searchFor: /"\b/g, replaceWith: '“'},    //  open quote (eg, precedes a 'word boundary')
    { searchFor: /(\?)"' /g, replaceWith: '$1”’ '},    //  close double quote preceding close single quote at sentence end
    { searchFor: /\b"/g, replaceWith: '”'},    //  close quote (eg, is preceded by a 'word boundary') needs to be set to follow punctuation as well
    { searchFor: /\b([\.|,|\?|!|;|:|-])"/g, replaceWith: '$1”'},    //  close quote after period (eg, is preceded by a 'word boundary')
    { searchFor: /'(Twas|Tis|twas|tis)/g, replaceWith: '’$1'},    //  'Twas, 'tis
    { searchFor: / - /g, replaceWith: " — "},    //  em dash between spaces
    { searchFor: /(\w)-- /g, replaceWith: "$1— "},    //  em dash after character followed by space
    { searchFor: /(\w)--'(\w)/g, replaceWith: "$1—‘$2"},    //  em dash after character followed by right single quote and space
    { searchFor: /(\w)'--(\w)/g, replaceWith: "$1’—$2"},    //  right single quote after character followed by em dash
    { searchFor: /(\w)'-(\w)/g, replaceWith: "$1’-$2"},    //  right single quote after character followed by hyphen and character (stun'-sails, Youth)
    { searchFor: /(\w)--' /g, replaceWith: "$1—’ "},    //  em dash after character followed by right single quote and space
    { searchFor: /(\w)'; /g, replaceWith: "$1’; "},    //  apostrophe after character followed by semi-colon and space
    { searchFor: /----(--)?/g, replaceWith: "——"},    //  2-em dash (Conrad 'Narcissus')
    { searchFor: /(\?)--\b/g, replaceWith: "$1—"},    //  em dash after question mark followed by word boundary
    { searchFor: /(\w)--"$/gm, replaceWith: '$1—”'},    //  em dash after character followed by right double quote at line end
    { searchFor: /(\w)--'$/gm, replaceWith: "$1—’"},    //  em dash after character followed by right single quote at line end
    { searchFor: /(\w|!|,|\?|”)--$/gm, replaceWith: "$1—"},    //  em dash after character at end of line
    { searchFor: /(\w)--!\.\.\."$/gm, replaceWith: '$1—!...”'},    //  by--!..."  (Conrad 'Narcissus')
    { searchFor: /(\w|!|,|\?|”)'--'/g, replaceWith: "$1’—‘"},    //  em dash after left single quote followed by right single quote
    { searchFor: /(\w|!|,|\?|”)'--(\w)/g, replaceWith: "$1’—$2"},    //  em dash after left single quote followed by right single quote
    { searchFor: /(\w|”)--(\w|“|\s)/gm, replaceWith: "$1—$2"},    //  em dash after characters (or quote) followed by letter
    { searchFor: /(!|,|:|\.)--(\w|“|\s)/gm, replaceWith: "$1—$2"},    //  em dash after punctuation and before characters (and between quotes)
    { searchFor: / '(Change)/g, replaceWith: " ’$1"},    //  'Change (Heart of Darkness)
    { searchFor: / '([A-Z])/g, replaceWith: " ‘$1"},    //  'Word (inner quote)
    { searchFor: / '([a-z])/g, replaceWith: " ‘$1"},    //  'word (inner quote, as in Heart of Darkness)
    { searchFor: /(\.|\?|!)'\.\.\./g, replaceWith: "$1’..."},    //  close single quote after end punctuation followed by ellipsis
    { searchFor: /(\w|,|\.|\?|!|;|:|-)' /g, replaceWith: "$1’ "},    //  close single quote after period etc
    { searchFor: /(\w|,|\.|\?|!|;|:|-)'$/gm, replaceWith: "$1’"},    //  close single quote after period etc at end of line
    { searchFor: /^(\s*)?'\b/gm, replaceWith: '$1‘'},    //  open single quote line beginning (eg, precedes a 'word boundary')
    { searchFor: /(\w)'" /g, replaceWith: '$1’” '},    //  close single quote followed by close double quote and space
    { searchFor: /^(\s*)?"'\b/gm, replaceWith: '$1“‘'},    //  open double quote preceding open single quote at line beginning (eg, precedes a 'word boundary')
    { searchFor: /(\w)'\.\.\.$/gm, replaceWith: "$1’..."},    //  close single quote after character followed by ellipsis
    { searchFor: /(\w)(!)\.\.\.(\.|!)?"$/gm, replaceWith: '$1$2...$3”'},    //  close double quote after ellipsis preceded by char or ! (Youth)
    { searchFor: /^(\s*)?"\.\.\./gm, replaceWith: '$1“...'},    //  open quote at line beginning, followed by ellipsis
    { searchFor: /^(\s*)"\.\.\./gm, replaceWith: '$1“...'},    //  spaces then open quote at line beginning, followed by ellipsis (Youth)
    { searchFor: /^(\s*)?"'\.\.\./gm, replaceWith: '$1“‘...'},    //  open quote then open single quote at line beginning, followed by ellipsis
    { searchFor: /(D|d)'ye/g, replaceWith: "$1’ye"},   //  d'ye (Heart of Darkness)
    { searchFor: /(:|,) '_(\w)/g, replaceWith: "$1 ‘_$2"},   //  italic inside single quote, markdown (Youth)
    { searchFor: / '<i>/g, replaceWith: " ‘<i>"}   //  italic inside single quote, html (Heart of Darkness)
];

var inFile = process.argv[2];
var outFile = process.argv[3]

// using package.json script: cleanup to read README.md via cat
var aFile = fs.readFile(inFile, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    //  for each object in the replacements array, go through the document and make the replacement
    function cleanUp(someFile) {
        replacements.forEach(function(replacement) {
            someFile = someFile.replace(replacement.searchFor, replacement.replaceWith);
        })
        return someFile;
   }
    var result = cleanUp(data);
    // now pipe the result to be stored in build/README.md
//    console.log(result);

    fs.writeFile(outFile, result, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });

});
