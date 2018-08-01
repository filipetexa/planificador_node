const excelbuilder = require('msexcel-builder');
// Create a new workbook file in current working-path
const workbook = excelbuilder.createWorkbook('./', 'sample.xlsx')

// Create a new worksheet with 10 columns and 12 rows
const sheet1 = workbook.createSheet('sheet1', 100, 120);

// na outra pagina dwg.reduce(criaPlanilha)
async function preencherPlanilha(linha, obj) {
    for (let i in obj.dwg) {
        await sheet1.set(1, linha, obj.grd);
        await sheet1.set(2, linha, obj.dwg[i]);
        linha++
    }
    return linha
}
function criaPlanilha() {
    // Save it
    workbook.save(function (ok) {
        if (!ok)
            workbook.cancel();
        else
            console.log('congratulations, your workbook created');
    });
}


module.exports = {
    preencherPlanilha,
    criaPlanilha
}