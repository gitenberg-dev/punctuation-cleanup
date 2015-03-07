var replacements = require('./replacements');
//  for each object in the replacements array, go through the document and make the replacement
var cleanUp = function (someFile) {
    replacements.forEach(function(replacement) {
        someFile = someFile.replace(replacement.searchFor, replacement.replaceWith);
    })
    return someFile;
};
module.exports = cleanUp;
