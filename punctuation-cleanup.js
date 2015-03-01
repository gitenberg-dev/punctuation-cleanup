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
    { searchFor: /([C|c]atch|Give|Eat) 'im/g, replaceWith: "$1 ’im"},   //  Catch 'im, Give 'im (Heart of Darkness)
    { searchFor: /^'im\./gm, replaceWith: "’im."},   //  catch 'im (Heart of Darkness) [Be specific so as not to change something unwittingly]
    { searchFor: /'d\b/g, replaceWith: "’d"},    // I'd
    { searchFor: /'ll\b/g, replaceWith: "’ll"},    //  you'll
    { searchFor: /'m\b/g, replaceWith: "’m"},    //  I'm
    { searchFor: /'re\b/g, replaceWith: "’re"},    //  you're
    { searchFor: /'s\b/g, replaceWith: "’s"},    //  it's
    { searchFor: /s'(\s)/g, replaceWith: "s’$1"},    //  plural possessive
    { searchFor: /'st\b/g, replaceWith: "’st"},    //  look'st (Rime of the Ancient Mariner)
    { searchFor: /'t\b/g, replaceWith: "’t"},   //  don't
    { searchFor: /'ve\b/g, replaceWith: "’ve"},   //  I've
    { searchFor: /(\s)'(\d\ds)/g, replaceWith: "$1’$2"},   //  ’90s
    { searchFor: /O'([A-Z])/g, replaceWith: "O’$1"},    //  O'Reilly
    { searchFor: /(o|e)'e/g, replaceWith: "$1’e"},    //  o'er, ne'er (Rime)
    { searchFor: /'(em|gan)\b/g, replaceWith: "’em"},    //  'em, 'gan  (Rime)
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
    { searchFor: /(\w)'--(\w)/g, replaceWith: "$1’—$2"},    //  right single quote after character followed by em dash and space
    { searchFor: /(\w)--' /g, replaceWith: "$1—’ "},    //  em dash after character followed by right single quote and space
    { searchFor: /(\w)'; /g, replaceWith: "$1’; "},    //  apostrophe after character followed by semi-colon and space
    { searchFor: /(\?)--\b/g, replaceWith: "$1—"},    //  em dash after question mark followed by word boundary
    { searchFor: /(\w)--"$/gm, replaceWith: '$1—”'},    //  em dash after character followed by right double quote at line end
    { searchFor: /(\w)--'$/gm, replaceWith: "$1—’"},    //  em dash after character followed by right single quote at line end
    { searchFor: /(\w|!|,|\?|”)--$/gm, replaceWith: "$1—"},    //  em dash after character at end of line
    { searchFor: /(\w|!|,|\?|”)'--'/g, replaceWith: "$1’—‘"},    //  em dash after left single quote followed by right single quote
    { searchFor: /(\w|!|,|\?|”)'--(\w)/g, replaceWith: "$1’—$2"},    //  em dash after left single quote followed by right single quote
    { searchFor: /(\w|”)--(\w|“|\s)/gm, replaceWith: "$1—$2"},    //  em dash after characters (or quote) followed by letter
    { searchFor: /(!)--(\w|“|\s)/gm, replaceWith: "$1—$2"},    //  em dash after punctuation and before characters (and between quotes)
    { searchFor: / '(Change)/g, replaceWith: " ’$1"},    //  'Change (Heart of Darkness)
    { searchFor: / '([A-Z])/g, replaceWith: " ‘$1"},    //  'Word (inner quote)
    { searchFor: / '([a-z])/g, replaceWith: " ‘$1"},    //  'word (inner quote, as in Heart of Darkness)
    { searchFor: /(\.|\?|!)'\.\.\./g, replaceWith: "$1’..."},    //  close single quote after end punctuation followed by ellipsis
    { searchFor: /(\w|,|\.|\?|!|;|:|-)' /g, replaceWith: "$1’ "},    //  close single quote after period etc
    { searchFor: /(\w|,|\.|\?|!|;|:|-)'$/gm, replaceWith: "$1’"},    //  close single quote after period etc at end of line
    { searchFor: /^'\b/gm, replaceWith: '‘'},    //  open single quote line beginning (eg, precedes a 'word boundary')
    { searchFor: /^"'\b/gm, replaceWith: '“‘'},    //  open double quote preceding open single quote at line beginning (eg, precedes a 'word boundary')
    { searchFor: /(\w)'\.\.\.$/gm, replaceWith: "$1’..."},    //  em dash after character followed by space
    { searchFor: /(\w)\.\.\.(\.)?"$/gm, replaceWith: '$1...$2”'},    //  em dash after character followed by space
    { searchFor: /^"\.\.\./gm, replaceWith: '“...'},    //  open quote at line beginning, followed by ellipsis
    { searchFor: /^"'\.\.\./gm, replaceWith: '“‘...'},    //  open quote then open single quote at line beginning, followed by ellipsis
    { searchFor: /(d)'ye/g, replaceWith: "$1’ye"}   //  d'ye (Heart of Darkness)
];
//
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
