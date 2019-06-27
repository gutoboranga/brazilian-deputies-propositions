const fs = require('fs');
const DATA_DIR = './data/';
const ENCODING = 'utf8'
const INVALID_STRING = '\r\n  '
const THEME_TAG = 'tema'
const OUTPUT_FILE = 'temas.txt'


function main() {
    fs.readdir(DATA_DIR, (err, files) => {
        cleanFile()
        files.forEach(file => {
            let multipleThemes = readFile(file)
            let singleThemes = splitMultipleThemes(multipleThemes)
            writeToFile(singleThemes)
        });
        console.log("> file " + OUTPUT_FILE + " created")
    });
}


function readFile(file) {
    let path = DATA_DIR + file
    let data = fs.readFileSync(path, ENCODING)
    let json = JSON.parse(data)

    var themes = []

    console.log(path);

    for (var i = 0; i < json.length; i++) {
        let t = json[i][THEME_TAG]

        if (t != INVALID_STRING) {
            themes.push(t)
        }
    }
    return themes
}


function splitMultipleThemes(themes) {
    var singleThemes = []

    for (var i = 0; i < themes.length; i++) {
        let t = themes[i]
        let words = t.split(', ').join('#').split('; ').join('#').split(' e ').join('#').split('#')

        for (var j = 0; j < words.length; j++) {
            let w = words[j]
            if (w != '') {
                singleThemes.push(words[j])
            }
        }
    }

    return singleThemes
}


function cleanFile() {
    fs.writeFileSync(OUTPUT_FILE, "")
}


function writeToFile(themes) {
    for (var i = 0; i < themes.length; i++) {
        let data = themes[i] + "\n"
        fs.appendFileSync(OUTPUT_FILE, data)
    }
}

main();
