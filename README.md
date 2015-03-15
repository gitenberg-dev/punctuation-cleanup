# scripts

The `punctuation-cleanup.js` script is changes ` - ` to ` — `, `'` to `’` or `‘`, and `"` to `“` or `”`. To run this script, enter this from the command line:

```
node punctuation-cleanup.js  file-to-clean.txt  cleaned-file.txt
```
If the scripts directory is at the same level as a Gitenberg folder, then from that folder a typical use might be:

```
node ../scripts/punctuation-cleanup.js  525.txt  ../cleaned/525.txt
```
