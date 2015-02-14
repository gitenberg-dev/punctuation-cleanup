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
    { searchFor: /",/g, replaceWith: ',”'},    // comma outside quote mark
    { searchFor: /"\./g, replaceWith: '.”'},    // period outside quote mark (transpose only)
    { searchFor: /"\b/g, replaceWith: '“'},    //  open quote (eg, precedes a 'word boundary')
    { searchFor: /\b"/g, replaceWith: '”'},    //  close quote (eg, is preceded by a 'word boundary') needs to be set to follow punctuation as well
    { searchFor: /\b([\.|,|\?|!|;|:|-])"/g, replaceWith: '$1”'},    //  close quote after period (eg, is preceded by a 'word boundary')
    { searchFor: /'([T|t])/g, replaceWith: '’$1'},    //  'Twas
    { searchFor: / - /g, replaceWith: " — "},    //  em dash between spaces
    { searchFor: /(\w)-- /g, replaceWith: "$1— "},    //  em dash after character followed by space
    { searchFor: /(\w|!|,|”)--$/gm, replaceWith: "$1—"},    //  em dash after character at end of line
    { searchFor: /(\w|”)--(\w|“|\s)/gm, replaceWith: "$1—$2"}    //  em dash between characters (and between quotes)
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
