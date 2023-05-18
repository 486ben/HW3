
// this can live on this page or on a dedicate js for this page
function generate_territories(){
  result = "<ol>"
  territory_data = {
    "name"      : ["#cap##syl#",  "#cap##syl##syl#",  "#cap##syl# #cap##syl#"],
    // sourve https://en.wikipedia.org/wiki/Provinces_of_Spain
    "cap"       : ["A", "Ala", "Alba", "Ali", "Alm", "Ast", "Ba", "Bal", "Bar", "Burg", "Can", "Cag", "Cac", "Cast", "Cord", "Ceuen", "Gran", "Gur", "Jan", "Lle", "Lu", "Ma", "Mur", "Na", "Pal", "Pont", "Pal", "San", "Tar", "Tole", "Val", "Zam", "Zar"],
    "syl"       : ["la", "va", "ba", "ve", "me", "ce", "ria", "rias", "cay", "lona", "gos", "seres", "lon", "dad", "do", "esca", "ga", "varre", "ra", "go", "na", "dis", "res", "coa", "ru", "turias"],
    "story"     : [": #simple#", "", "", "", "", "", "", ],
    "simple"    : ["They say all #entities# can be traced to this land.", "All #people group# agree this is a #descriptor# place.", "Known for its #descriptor# people.", "The local cuisine features #ingredient# heavily.", "The people here never eat #ingredient#.", "Many cults remain in this territory. They are #hated# for their heretical worship of a #symbol#."],
    "people group" : ["of its inhabitants", "visitors", "princesses", "merchants", "beekeepers", "soldiers"],
    "entities"  : ["heroes", "goblins", "horses", "raccoons", "devils", "wizards"],
    "descriptor": ["boring", "terrifying", "cursed", "robust", "genuine", "doomed", "glorious"],
    "ingredient": ["parsly", "venisin", "root vegetables", "cheese", "eggs", "sweet apples", "bread"],  
    "hated"     : ["despised", "hated", "hunted", "rejected"],
    "symbol"    : ["#color# #animal# eating #ingredient#", "#descriptor# #animal#"],
    "color"     : ["golden", "white", "brown", "red", "green", "blue", "black"],
    "animal"    : ["bear", "hound", "elephant", "whale", "dragon"],
    "origin"    : "#name##story#"
  }
  console.log(territory_data)
  for (let i = 0; i < 23; i++){
    result += "<li>" + grammars.GenerationSimple(territory_data) + "</li>";
  }
  result += "</ol>";
  console.log(result)
  io.write_into_element(result, "territories")
}