function getFiles(dir) {
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

const fs = require('fs');
const exBuilder = require('./excel-builder')

async function planificadora() {
  const files = await getFiles(__dirname);
  const folders = files.filter(isFolder);

  //content = array de obj's com grd e seus dwgfiles
  const content = await getDwgInFolders(folders);
  const libera = await preenchedora(content);
  if(libera){
      exBuilder.criaPlanilha()
      console.log("criando Planilha ");
  }

}

async function preenchedora(content){
    let linha = 1;
    for(let obj of content){
       linha = await exBuilder.preencherPlanilha(linha,obj)
    }
    return new Promise ((resolve, reject) => {
      resolve(true)
    })
  }

async function getDwgInFolders(folders) {
 let dwg = [];
 let obj;
  for(let folder of folders){
   obj = await getDWG(folder);
   dwg.push(obj);
 }
  return new Promise((resolve, reject) => {
    resolve(dwg)
  })
}



function getDWG(folder){
let newDir = __dirname + "/" + folder;
let folderFiles = async () => {
  const folderFiles = await getFiles(newDir)
  // pode ser que na parte do get folder isso de certo pois o tempo é muito curto 
  const dwgfiles = folderFiles.filter(isDwg)
  return new Promise((resolve,reject) =>{
    resolve({
      grd: folder,
      dwg:dwgfiles
    })
  })
}
let aux = folderFiles()
return aux
}
planificadora()