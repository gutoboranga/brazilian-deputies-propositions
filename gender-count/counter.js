const fs = require('fs');
const FILENAME = 'current-deputies.json';
const ENCODING = 'utf8'
const INVALID_STRING = '\r\n  '
const GENDER_TAG = 'sexo'
const PARTY_TAG = 'partido'
const OUTPUT_FILE = 'generos.txt'

var genders = {}

function main() {
    readFile()
    writeToFile(genders)
    console.log(genders);
    // let singleThemes = splitMultipleThemes(multipleThemes)
    // writeToFile(singleThemes)
}


function readFile() {
    let data = fs.readFileSync(FILENAME, ENCODING)
    let json = JSON.parse(data)

    for (var i = 0; i < json.length; i++) {
        let deputy = json[i]
        
        let g = deputy[GENDER_TAG]
        var p = deputy[PARTY_TAG]
        
        if (p == "S.PART.") { p = "-" }
        
        // confere se esse gênero já apareceu
        if (g in genders) {
            genders[g]["count"] += 1
            
            // confere se o partido desse deputado já apareceu na lista desse gênero
            if (p in genders[g]["parties"]) {
                genders[g]["parties"][p] += 1
            } else {
                genders[g]["parties"][p] = 1
            }
            
        } else {
            genders[g] = {
                "count": 1,
                "parties": {}
            }
            genders[g]["parties"][p] = 1
        }
    }
}

function writeToFile(dict) {
    fs.writeFileSync(OUTPUT_FILE, "")
    fs.appendFileSync(OUTPUT_FILE, JSON.stringify(dict))
}

main();
