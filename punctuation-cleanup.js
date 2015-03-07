//  punctuation-cleanup.js
//  use:   $ node punctuation-cleanup.js  file-to-clean.txt  cleaned-file.txt
/*
 * MIT license http://opensource.org/licenses/MIT
 *
 * Original author of this script: rsperberg@gmail.com
 */

var fs = require('fs');
var replacements = require('./replacements');  //  file containing all the regex patterns and their replacements
var cleanup = require('./cleanup');  //  file containing the function that actually does the substitution

var inFile = process.argv[2];
var outFile = process.argv[3];

// using package.json script: cleanup to read README.md via cat
var aFile = fs.readFile(inFile, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    };

    var result = cleanup(data);
    // now pipe the result to be stored in build/README.md
//    console.log(result);

    fs.writeFile(outFile, result, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });

});
