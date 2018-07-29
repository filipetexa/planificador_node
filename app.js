const fs = require('fs');
const excelbuilder = require('msexcel-builder');

// retorna um array de nomes de grd's
let grd = async () => {
    const grd = await getfiles(__dirname)
    return grd
}

grd()
    .then(grd => {
        // array de grd's (nome das pastas)
        grd = grd.filter(isFolder)
        grd.forEach(getGrdFiles)

    })


function getGrdFiles(grd) {
    let newDir = __dirname + "/" + grd;
    let grdFiles = async () => {
        const grdFiles = await getfiles(newDir)
        return grdFiles
    }
    grdFiles()
        .then(files => {
            // array com todos os arquivos dwg de uma grd
            dwg = files.filter(isDwg)
        })
}

function getfiles(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            resolve(files)
        })
    })
}

function isFolder(element) {
    let arr = element.split('')
    arr = arr.filter(function (element) {
        return element == '.'
    })
    return arr.length == 0
}

function isDwg(elements) {
    let arr = elements.split('')
    let type = arr.slice(arr.length - 3, arr.length + 1)
    if (type.join('') == "dwg") {
        return true
    } else {
        return false
    }
}