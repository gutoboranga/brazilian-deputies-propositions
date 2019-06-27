const fs = require('fs');
const INPUT_FILE = 'temas.txt'
const OUTPUT_FILE = 'ocorrencias.txt'
const ENCODING = 'utf8'


function main() {
    let themes = readFile(INPUT_FILE)
    let occurences = count(themes)

    cleanFile()
    writeToFile(occurences)
    console.log("> file " + OUTPUT_FILE + " created");
}


function readFile(file) {
    return fs.readFileSync(file).toString().split("\n");
}


function count(themes) {
    var themeOccurences = {}

    for (var i = 0; i < themes.length; i++) {
        let key = themes[i]

        if (key == '') {
            continue
        }

        if (key in themeOccurences) {
            themeOccurences[key] += 1
        } else {
            themeOccurences[key] = 1
        }
    }

    return themeOccurences
}


function cleanFile() {
    fs.writeFileSync(OUTPUT_FILE, "")
}


function writeToFile(occurences) {

    var sortedOccurences = sortByKeys(occurences)
    let keys = Object.keys(sortedOccurences)

    for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        let data = sortedOccurences[key] + "\n"
        fs.appendFileSync(OUTPUT_FILE, data)
    }
}

function sortByKeys(occurences) {
    var items = Object.keys(occurences).map(function(key) {
      return [key, occurences[key]];
    });

    items.sort(function(first, second) {
      return second[1] - first[1]
    });

    return items
}

main();
