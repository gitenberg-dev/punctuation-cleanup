//  identify each type of change, particularly for the apostrophe, since global change (e.g., /.'./g or /(\w|\d)'(\w|\d)/g) is just too risky
//  By making only known changes, stray apostrophes and quotes can be located easily
//
var replacements = [
    { searchFor: /Character set encoding: ASCII/, replaceWith: "Character set encoding: UTF-8"},  //  dashes and curly quotes aren't in ASCII
    { searchFor: /(That|that|this) 'ere/g, replaceWith: "$1 ’ere"},   //  elided consonant: (h)ere (Youth)
    { searchFor: /black 'arts/g, replaceWith: "black ’arts"},   //  black (he)arts (Conrad 'Narcissus')
    { searchFor: /black'earted/g, replaceWith: "black’earted"},   //  black (he)arted (Conrad 'Narcissus')
    { searchFor: /fo'c'sle/g, replaceWith: "fo’c’sle"},   //  fo'c'sle (forecastle) (Conrad 'Narcissus')
    { searchFor: /p'r'aps/g, replaceWith: "p’r’aps"},   //  p(e)r(h)aps (Conrad 'Narcissus')
    { searchFor: /(A|a)'n't/g, replaceWith: "$1’n’t"},   //  ain't (Conrad 'Narcissus')
    { searchFor: /'art/g, replaceWith: "’art"},   //  (he)art (Conrad 'Narcissus')
    { searchFor: /'ard/g, replaceWith: "’art"},   //  (h)ard (Conrad 'Narcissus')
    { searchFor: /'ang/g, replaceWith: "’ang"},   //  (h)ang (Conrad 'Narcissus')
    { searchFor: /'(As|as)\b/g, replaceWith: "’$1"},   //  (h)as (Conrad 'Narcissus')
    { searchFor: /"'(Cos)/g, replaceWith: "“’$1"},   //  (be)cause (Conrad 'Narcissus')
    { searchFor: /'(Cos|cos)/g, replaceWith: "’$1"},   //  (be)cause (Conrad 'Narcissus')
    { searchFor: / 'ome/g, replaceWith: " ’ome"},   //  (h)omeward (Conrad 'Narcissus')
    { searchFor: / 'old/g, replaceWith: " ’old"},   //  (h)old (Conrad 'Narcissus')
    { searchFor: / 'ell/g, replaceWith: " ’ell"},   //  (h)ell (Conrad 'Narcissus')
    { searchFor: / 'owling/g, replaceWith: " ’owling"},   //  (h)owling (Conrad 'Narcissus')
    { searchFor: /'Ow/g, replaceWith: "’Ow"},   //  (h)owling (Conrad 'Narcissus')
    { searchFor: /(--|—)s'elp/g, replaceWith: "$1s’elp"},   //  so help me (Conrad 'Narcissus')
    { searchFor: /(\s)S'elp/g, replaceWith: "$1S’elp"},   //  so help me (Conrad 'Narcissus')
    { searchFor: /ainch'ee/g, replaceWith: "ainch’ee"},   //  ain't ye (Conrad 'Narcissus')
    { searchFor: / som'thin(g|k)/g, replaceWith: " som’thin$1"},   //  something (Conrad 'Narcissus')
    { searchFor: /gran'mother/g, replaceWith: "gran’mother"},   //  gran'mother (Conrad 'Narcissus')
    { searchFor: /(G|g)i'e/g, replaceWith: "$1i’e"},   //  gi(v)e me (Conrad 'Narcissus')
    { searchFor: / '(ed|ead|ear|ad|un)\b/g, replaceWith: " ’$1"},   //  (h)e(a)d, (h)ad, good 'un (Conrad 'Narcissus')
    { searchFor: /^'(ead|ee)\b/gm, replaceWith: "’$1"},   //  (h)ead at line beginning (Conrad 'Narcissus')
    { searchFor: /([C|c]atch|Give|Eat|break|Let|made|do for) 'im/g, replaceWith: "$1 ’im"},   //  Catch 'im, Give 'im (Heart of Darkness)
    { searchFor: /(Strook)'im/g, replaceWith: "$1’im"},   //  (h)im (Conrad 'Narcissus')
    { searchFor: /"(')(Ear|It) 'im/g, replaceWith: '“’$2 ’im'},   //  (H)ear (h)im, (H)it (h)im beginning with quote (Conrad 'Narcissus')
    { searchFor: /"(')(Ere)'s/g, replaceWith: '“’$2’s'},   //  (H)ere's beginning with quote (Conrad 'Narcissus')
    { searchFor: /(\s)(')(It|it) 'im/g, replaceWith: '$1’$3 ’im'},   //  ((H|h)it (h)im not at beginning of quote (Conrad 'Narcissus')
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
    { searchFor: /(\s)'(\d\d)/g, replaceWith: "$1’$2"},   //  in 1965 and ’66 (Hacker Crackdown)
    { searchFor: /O'([A-Z])/g, replaceWith: "O’$1"},    //  O'Reilly
    { searchFor: /o'clock/g, replaceWith: "o’clock"},    //  o'clock
    { searchFor: /(o|e)'e/g, replaceWith: "$1’e"},    //  o'er, ne'er (Rime)
    { searchFor: /(sou)'west/g, replaceWith: "$1’west"},    //  sou'west (Youth)
    { searchFor: /'(em|gan|baccy|ave|ee )\b/g, replaceWith: "’$1"},    //  'em, 'gan  (Rime), 'baccy, 'ave, 'ee (Conrad 'Narcissus')
    { searchFor: /'aven'tchee/g, replaceWith: "’aven’tchee"},    //   'aven't (Conrad 'Narcissus')
    { searchFor: /'ave/g, replaceWith: "’ave"},    //   'ave (Conrad 'Narcissus')
//    { searchFor: /",/g, replaceWith: ',”'},    // comma outside quote mark
//    { searchFor: /"\./g, replaceWith: '.”'},    // period outside quote mark (transpose only)
    { searchFor: /"\b/g, replaceWith: '“'},    //  open quote (eg, precedes a 'word boundary')
    { searchFor: /(\?)"' /g, replaceWith: '$1”’ '},    //  close double quote preceding close single quote at sentence end
    { searchFor: /\b"/g, replaceWith: '”'},    //  close quote (eg, is preceded by a 'word boundary') needs to be set to follow punctuation as well
    { searchFor: /\b([\.|,|\?|!|;|:|-])"/g, replaceWith: '$1”'},    //  close quote after period (eg, is preceded by a 'word boundary')
    { searchFor: /'(Twas|Tis|twas|tis|Tain|tain)/g, replaceWith: '’$1'},    //  'Twas, 'tis, 'Tain't
    { searchFor: /t'other/g, replaceWith: "t’other"},    //  t(he) other  (Conrad 'Narcissus')
    { searchFor: / - /g, replaceWith: " — "},    //  em dash between spaces
    { searchFor: /(\w)-- /g, replaceWith: "$1— "},    //  em dash after character followed by space
    { searchFor: /(\w)--'(\w)/g, replaceWith: "$1—‘$2"},    //  em dash after character followed by right single quote and space
    { searchFor: /(\w)'--(\w)/g, replaceWith: "$1’—$2"},    //  right single quote after character followed by em dash
    { searchFor: /(\w)'-(\w)/g, replaceWith: "$1’-$2"},    //  right single quote after character followed by hyphen and character (stun'-sails, Youth)
    { searchFor: /(\w)--' /g, replaceWith: "$1—’ "},    //  em dash after character followed by right single quote and space
    { searchFor: /(\w)(in)'(\s|,)/g, replaceWith: "$1$2’$3"},    //  dropped g in -ing (darlin') (Conrad 'Narcissus')
    { searchFor: /(\s)(tho)'/g, replaceWith: "$1$2’"},    //  tho(ugh) (Conrad 'Narcissus')
    { searchFor: /(\w)'; /g, replaceWith: "$1’; "},    //  apostrophe after character followed by semi-colon and space
    { searchFor: /----(--)?"--("|“)/g, replaceWith: '——”—“'},    //  2-em dash ending quote then dash separating next quote (Conrad 'Narcissus')
    { searchFor: /----(--)?/g, replaceWith: "——"},    //  2-em dash (Conrad 'Narcissus')
    { searchFor: /^--("|“)/gm, replaceWith: '—“'},    //  line beginning with dash then open quote (Conrad 'Narcissus')
    { searchFor: /(\?)--\b/g, replaceWith: "$1—"},    //  em dash after question mark followed by word boundary
    { searchFor: /(\w)--"$/gm, replaceWith: '$1—”'},    //  em dash after character followed by right double quote at line end
    { searchFor: /(\w)--'$/gm, replaceWith: "$1—’"},    //  em dash after character followed by right single quote at line end
    { searchFor: /(\w|!|,|\?|”)--$/gm, replaceWith: "$1—"},    //  em dash after character at end of line
    { searchFor: /(\w)--!\.\.\."$/gm, replaceWith: '$1—!...”'},    //  by--!..."  (Conrad 'Narcissus')
    { searchFor: /(\w|!|,|\?|”)'--'/g, replaceWith: "$1’—‘"},    //  em dash after left single quote followed by right single quote
    { searchFor: /(\w|!|,|\?|\.|”|:)--("|“)/g, replaceWith: '$1—“'},    //  dash and open double quote preceded by miscellaneous
    { searchFor: /(\w|!|,|\?|”)'--(\w)/g, replaceWith: "$1’—$2"},    //  em dash after left single quote followed by right single quote
    { searchFor: /(\w)--(\w)--(\w)/gm, replaceWith: "$1—$2—$3"},    //  em dash after characters (or quote) followed by letter
    { searchFor: /(\w|\.|”|\))--(\w|“|\s)/g, replaceWith: "$1—$2"},    //  em dash after characters (or quote) followed by letter
    { searchFor: /(!|,|:|\.)--(\w|“|\s)/g, replaceWith: "$1—$2"},    //  em dash after punctuation and before characters (and between quotes)
    { searchFor: /(:)--("')(\w)/gm, replaceWith: "$1—“‘$3"},    //  colon then dash then open double quote then open single quote then text   (Conrad 'Narcissus')
    { searchFor: / '(Change)/g, replaceWith: " ’$1"},    //  'Change (Heart of Darkness)
    { searchFor: /(\s)'e(e)?\b/g, replaceWith: "$1’e$2"},   //  space (h)e (Conrad 'Narcissus')
    { searchFor: / '([A-Z])/g, replaceWith: " ‘$1"},    //  'Word (inner quote)
    { searchFor: / '([a-z])/g, replaceWith: " ‘$1"},    //  'word (inner quote, as in Heart of Darkness)
    { searchFor: /(\.|\?|!)'\.\.\./g, replaceWith: "$1’..."},    //  close single quote after end punctuation followed by ellipsis
    { searchFor: /(\w|,|\.|\?|!|;|:|-)' /g, replaceWith: "$1’ "},    //  close single quote after period etc; also "tot o' rum" (Conrad 'Narcissus')
    { searchFor: /(\w|,|\.|\?|!|;|:|-)" /g, replaceWith: '$1” '},    //  close single quote after period etc
    { searchFor: /(\w)'\? /g, replaceWith: "$1’? "},    //  close single quote before question mark  (Conrad 'Narcissus')
    { searchFor: /(\w|,|\.|\?|!|;|:|-)'$/gm, replaceWith: "$1’"},    //  close single quote after period etc at end of line
    { searchFor: /^(\s*)?'\b/gm, replaceWith: '$1‘'},    //  open single quote line beginning (eg, precedes a 'word boundary')
    { searchFor: /^"--("|“)(\w)/gm, replaceWith: '”—“$2'},    //  dash separating quotes, but the close quote of the first starts a new line (Conrad 'Narcissus')
    { searchFor: /(\s)"--("|“)(\w)/gm, replaceWith: '$1”—“$3'},    //  dash separating quotes, but the close quote of the first folos a space (Conrad 'Narcissus')
    { searchFor: /(\w)'" /g, replaceWith: '$1’” '},    //  close single quote followed by close double quote and space
    { searchFor: /^(\s*)?"'\b/gm, replaceWith: '$1“‘'},    //  open double quote preceding open single quote at line beginning (eg, precedes a 'word boundary')
    { searchFor: /(\w)'\.\.\.$/g, replaceWith: "$1’..."},    //  close single quote after character followed by ellipsis
    { searchFor: /(\w)(!)\.\.\.(\.|!)?"$/gm, replaceWith: '$1$2...$3”'},    //  close double quote after ellipsis preceded by char or ! (Youth)
    { searchFor: /(\w)\.\.\.(\.)?"--("|“)/gm, replaceWith: '$1...$2”—“'},    //  close double quote (preceded by three or four dots) then a dash then an open quote  (Conrad 'Narcissus')
    { searchFor: /^(\s*)?"\.\.\./gm, replaceWith: '$1“...'},    //  open quote at line beginning, followed by ellipsis
    { searchFor: /^(\s*)"\.\.\./gm, replaceWith: '$1“...'},    //  spaces then open quote at line beginning, followed by ellipsis (Youth)
    { searchFor: /^(\s*)?"'\.\.\./gm, replaceWith: '$1“‘...'},    //  open quote then open single quote at line beginning, followed by ellipsis
    { searchFor: /(D|d)'y(e|ou)/g, replaceWith: "$1’y$2"},   //  d'ye (Heart of Darkness), d'you (Conrad 'Narcissus')
    { searchFor: /(R|r)eg'lar/g, replaceWith: "$1eg’lar"},   //  reg'lar (Conrad 'Narcissus')
    { searchFor: /bo'sen/g, replaceWith: "bo’sen"},   //  bosun (Conrad 'Narcissus')
    { searchFor: /Boss'en/g, replaceWith: "Boss’en"},   //  bosun (Conrad 'Narcissus')
    { searchFor: /(e|r)'n/g, replaceWith: "$1’n"},   //  more (tha)n (Conrad 'Narcissus')
//    { searchFor: /(better|more|rather|worser|wusse)'n/g, replaceWith: "$1’n"},   //  more (tha)n (Conrad 'Narcissus')
    { searchFor: /ha'penny/g, replaceWith: "ha’penny"},   //  ha(lf)penny (Conrad 'Narcissus')
    { searchFor: /(\s|“)'(Ee|ee|Ave)/g, replaceWith: "$1’$2"},   //  space open quote (H)e (Conrad 'Narcissus')
    { searchFor: /(\s)"'(Ee|ee|Ave)/g, replaceWith: "$1“’$2"},   //  space open quote (H)e (Conrad 'Narcissus')
    { searchFor: /^'ee/gm, replaceWith: "’ee"},   //  (h)e at line beginning (Conrad 'Narcissus')
    { searchFor: /voy'ge/g, replaceWith: "yoy’ge"},   //  voy(a)ge (Conrad 'Narcissus')
    { searchFor: /(:|,) '_(\w)/g, replaceWith: "$1 ‘_$2"},   //  italic inside single quote, markdown (Youth)
    { searchFor: / '<i>/g, replaceWith: " ‘<i>"}   //  italic inside single quote, html (Heart of Darkness)
];
//
module.exports = replacements;
