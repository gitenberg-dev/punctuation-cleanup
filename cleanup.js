var replacements = require('./replacements');
var cleanUp = function (someFile) {
    replacements.forEach(function(replacement) {
        someFile = someFile.replace(replacement.searchFor, replacement.replaceWith);
    })
    return someFile;
};
module.exports = cleanUp;
