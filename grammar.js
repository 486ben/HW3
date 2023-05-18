function choose(arr){
    return arr[Math.floor(Math.random()*(arr.length))]
}
function capitalize (string){return  string.replace(/^\w/, c => c.toUpperCase())}

let grammars = {
    GenerationSimple : function (gram){
        //console.log(gram)
        g = tracery.createGrammar(gram);
        return g.flatten("#origin#")
    }

}