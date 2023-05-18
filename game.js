
let game_state = {}
  game_state.soldiers = 23000;
  game_state.dead = 0;
  game_state.reports = ["No battles have occured"];
  game_state.allignment = 256;

function render_game_state(gs){
  document.getElementById("soldiercount").innerHTML = gs.soldiers
  document.getElementById("deadcount").innerHTML = gs.dead
  gs.allignment = Math.round((gs.soldiers - gs.dead) / (gs.soldiers + gs.dead) * 256);
  if (gs.allignment < 0) gs.allignment = 0;
  let av = gs.allignment.toString(16);
  if (av.length == 1)
    av = "0" + av;
  
  //console.log(av)
  //document.getElementById("mouth_display").style.backgroundColor = "#ff" + gs.allignment.toString(16) + gs.allignment.toString(16);
  document.getElementsByTagName("body")[0].style.backgroundColor = "#ff" + av + av;
  
  //console.log( "#ff" + gs.allignment.toString(16) + gs.allignment.toString(16) ) 
  document.getElementById("battle_report").innerHTML = gs.reports[gs.reports.length-1]
}

function trigger_eclipse(){
  document.getElementById("eclipse").style.visibility = "visible";
}

function next_round(gs){
  gs.soldiers += 2300;
  render_game_state(game_state)
}

function run_battle_sim (gs){
  if (gs.dead > gs.soldiers){
      trigger_eclipse()
  }
  else {
    battle_object = {
      a_skill: Number(document.getElementById("a_skill").value),
      d_skill: Number(document.getElementById("d_skill").value),
      a_agg: Number(document.getElementById("a_agg").value),
      d_agg: Number(document.getElementById("d_agg").value),
      a_sold: Number(document.getElementById("a_sold").value),
      d_sold: Number(document.getElementById("d_sold").value),
      river: document.getElementById("river").checked,
      forts: Number(document.getElementById("forts").value)
    }
    //console.log(battle_object);
    let river = 0
    if (battle_object.river === true)
      river = 2;
    
    let skill_check = Math.ceil(Math.random()*7) - 4 + battle_object.a_skill - battle_object.d_skill - battle_object.forts - river;
    //console.log(Math.ceil(Math.random()*7) - 4 , battle_object.a_skill , battle_object.d_skill , battle_object.forts , river);
    let death_toll_multiplier = 1 + (battle_object.a_agg/100) + (battle_object.d_agg/100);
    
    let fallen_a = 0;
    let fallen_d = 0;
    let smaller_force = Math.min(battle_object.a_sold, battle_object.d_sold);
    //console.log(battle_object.a_sold, battle_object.d_sold, smaller_force)
    if (skill_check == 0)
    {
    fallen_a = Math.floor((smaller_force*0.33) * death_toll_multiplier)  
    fallen_d = Math.floor((smaller_force*0.33) * death_toll_multiplier);
    }
    if (skill_check > 0)
    {
    fallen_a = Math.floor((smaller_force*0.15) * death_toll_multiplier)  
    fallen_d = Math.floor((smaller_force*0.40) * death_toll_multiplier);
    }
    if (skill_check > 3)
    {
      fallen_a = Math.floor((smaller_force*0.15) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.40) * death_toll_multiplier);
    }
    if (skill_check > 5)
    {
      fallen_a = Math.floor((smaller_force*0.05) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.60) * death_toll_multiplier);
    }
    if (skill_check < 0)
    {
    fallen_a = Math.floor((smaller_force*0.40) * death_toll_multiplier)  
    fallen_d = Math.floor((smaller_force*0.15) * death_toll_multiplier);
    }
    if (skill_check < -3)
    {
      fallen_a = Math.floor((smaller_force*0.40) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.15) * death_toll_multiplier);
    }
    if (skill_check < -5)
    {
      fallen_a = Math.floor((smaller_force*0.60) * death_toll_multiplier)  
      fallen_d = Math.floor((smaller_force*0.05) * death_toll_multiplier);
    }
    if (fallen_a > battle_object.a_sold)  fallen_a = battle_object.a_sold;
    if (fallen_d > battle_object.d_sold)  fallen_d = battle_object.d_sold;
    
    //console.log(fallen_a, fallen_d, skill_check, death_toll_multiplier, smaller_force)
    
    gs.soldiers -= (fallen_a + fallen_d);
    gs.dead += (fallen_a + fallen_d);
    
    let report = generate_battle_report(skill_check, (fallen_a / battle_object.a_sold), (fallen_d / battle_object.d_sold), forts, river, gs.allignment)
   
    report += "<br> Galactic Empire lost " + fallen_a + " Fighters and Soldiers." + "<br> Rebel Alliance lost " + fallen_d + " Fighters and Soldiers." 
    
    gs.reports.push(report)
   
    render_game_state(game_state)
  }
}

function generate_battle_report(skill_check, a_loss_percent, d_loss_percent, forts, river, allignment){
  console.log(allignment)
  result = ""
  
  // commander skill contribution   river and fort conditionals


  //console.log(allignment)
  skill_check_data = {
    "attacker_learn": ["","#caught# by the #star_destroyer#'s #tactical_acumen#, the #fighter# pilot learns to maneuver with precision and #increase# their skill. +1 Rebel Alliance reputation"],
    "defender_learn":["", "#caught# by the #fighter#'s #piloting_mastery#, the #star_destroyer# captain learns to adapt their strategies and #increase# their skill. +1 Galactic Empire reputation"],
    "increase": ["+1", "+2"],
    "caught" : ["Caught off guard", "Surprised", "Outmaneuvered", "Cornered"],

    //Start Destory is the GE Side
    "star_destroyer": ["Super Star Destroyer", "Imperial-class Star Destroyer", "Victory-class Star Destroyer", "Executor-class Star Dreadnought"],
    "tactical_acumen": ["strategic planning", "targeting systems", "fleet coordination", "formation tactics"],

    //Fighter is the Rebel Allianc side
    "fighter" : ["X-wing", "A-wing", "Y-wing", "B-wing"],
    "piloting_mastery" : ["precise maneuvers", "evasive maneuvers", "target tracking", "weapon accuracy"],
    "battle" : ["clash", "skirmish", "struggle", "fight", "confrontation"],
    "origin" : ""
}

if (skill_check > 5) skill_check_data.origin += "You, as a Rebel Alliance  commander demonstrates extreme skill in slaying the Star Destoryer. You gain 1 Glory."
if (skill_check < -5) skill_check_data.origin += "The Galactic Empire Star Destoryer and Fighters demonstrates extreme skill in defending against the Rebel Alliance. They gain 1 evil."
if (skill_check > 0) skill_check_data.origin += "The #battle# goes to the #star_destroyer#. The #fighter# must go back to flagship to rest."
if (skill_check < 0) skill_check_data.origin += "The #battle# goes to the #fighter#. The #star_destroyer# must retreat to the outskirts of the death star's territory with their commander to avoid further casualties."

if (skill_check > 3) skill_check_data.origin += " #defender_learn#"
if (skill_check < -3) skill_check_data.origin += " #attacker_learn#"

  
  
  result += "<br>" + grammars.GenerationSimple(skill_check_data)
  
// how bloody the fighting is it is
// how fierce the fighting is
bloody_data = {
  "destroyed"                   : ["are annihilated by the Death Star's devastating firepower", ". . . none of them. None of them survive the Death Star's destructive force.", ". . . not even one escapes the Death Star's devastating assault"],
  "commander_tragedy"           : ["is consumed by the Death Star's destructive power", "gains 2 shame but survives thanks to their loyal troops", "is banished for their failure and condemned to roam the galaxy as an outcast", "escapes with a charred #body_part# after the Death Star's onslaught", "escapes with a missing #body_part# following the devastating attack by the Death Star", "gains 2 shame and a burning desire for vengeance against the galaxy empire commander. They will relentlessly pursue retribution."],
  "body_part"                   : ["engine", "wing", "blaster", "cockpit", "hyperdrive", "shield generator"],
  
  "attacking_suffer_few"        : ["", "For the #attackers#, this is a futile effort against the might of the Imperial fleet.", "The Star Destroyers scoff at their feeble attempts."],
  "attacking_suffer_moderate"   : ["", "It cost a #body_part# and a #body_part#, but the attackers remain resolute."],
  "attacking_suffer_many"       : ["", "No pilot emerged unscathed, as many lost their comrades to the relentless onslaught of enemy fighters.", "So much death, and the battle rages on with no end in sight."],
  "attacking_destroyed"         : ["", "The #attackers# are completely #destroyed# by the overwhelming might of the Imperial fleet. The attacking commander #commander_tragedy#. The galaxy empire commander earns 1 glory."],
  "attackers"                   : ["Imperial forces", "Galactic Empire", "Star Destroyer fleet", "TIE fighter squadrons", "Imperial stormtroopers"],
  
  "river_clean"                 : ["", "Despite the disadvantage of attacking amidst a meteor shower, few casualties are caused by the falling debris.", "The meteorites seem to avoid the battlefield, sparing the combatants from their destructive path.", "The invaders find solace in the fact that the meteorites pose little threat during the battle."],
  "river_red"                   : ["", "The Rebel Alliance and the Imperial fleet encountered each other within the meteorite field and a fierce conflict erupted. Both sides suffered devastating losses.", "The personnel from both sides were driven to a state of fury, piloting their fighters to ram into enemy battleships. The clash resulted in a brutal display of destruction and casualties on both sides.", "The fighters from both fleets opted for kamikaze attacks, choosing to sacrifice themselves and inflicting devastating casualties on both sides. The battle witnessed a tragic display of self-destruction, leaving behind a grim aftermath of immense loss and devastation for both factions."],

  "defending_suffer_few"        : ["", "The #attackers# prove to be no match for the steadfast defenders of the Rebel Alliance."],
  "defending_suffer_moderate"   : ["", "Battered and scorched, the #defenders# valiantly hold their ground against the relentless assault."],
  "defending_suffer_many"       : ["", "The majority of #defenders# are left wounded and face an arduous battle to recover from the onslaught unleashed by the galaxy empire forces."],
  "defending_destroyed"         : ["", "The #defenders# are attack and destory the Star Destoryer and fighters of the galaxy empire. Their forces is weak and escape now! . The Rebel Alliance commander #commander_tragedy#. The Rebel Alliance commander gains one glory. #bonus#"],
  "bonus"                       : ["","", "The galaxy empire commander may make another action after casualties are resolved."],
  "defenders"                   : ["Rebel protectors fighter", "Rebel guardians fighter", "Rebel battleship defenders ", "Rebel flagship", "Rebel fighter"],
  
  "fort_strong"                 : ["", "The Rebel Alliance flagship stands strong against the Imperial onslaught.", "The Rebel Alliance's fortifications prove resilient against the enemy's relentless attacks.", ""],
  "fort_fail"                   : ["", "The Rebel Alliance flagship is reduced to ashes under the overwhelming power of the Imperial assault., and Rebel Alliance have a new flagship again!", ""],
  "origin"                      : ""
  }
  
  
  //console.log(allignment)
  if (0.3 > a_loss_percent)
    bloody_data.origin+=(["#attacking_suffer_few#"])
  else if (0.6 > a_loss_percent)
    bloody_data.origin+=(["#attacking_suffer_moderate#"])
  else if (1 > a_loss_percent)
    bloody_data.origin+=(["#attacking_suffer_many#"])
  else
    bloody_data.origin+=(["#attacking_destroyed#"])
  
  if (0.6 > a_loss_percent && river)
    bloody_data.origin+=([" #river_clean#"])
  else if (0.6 > a_loss_percent && river)
    bloody_data.origin+=([" #river_red#"])
  
  if (0.3 > d_loss_percent)
    bloody_data.origin+=([" #defending_suffer_few#"])
  else if (0.6 > d_loss_percent)
    bloody_data.origin+=([" #defending_suffer_moderate#"])
  else if (1 > d_loss_percent)
    bloody_data.origin+=([" #defending_suffer_many#"])
  else
    bloody_data.origin+=([" #defending_destroyed#"])
  
  if (0.6 > a_loss_percent && forts)
    bloody_data.origin+=([" #fort_strong#"])
  else if (0.6 > a_loss_percent && forts)
    bloody_data.origin+=([" #fort_fail#"])
  
  
  
  result += "<br>" + grammars.GenerationSimple(bloody_data)
  
// doom sneaks
doom_data = {
    "bad_omen": ["Many Rebel Alliance fighters seem to have gone with no reason.", "An unusual number of Imperial Star Destroyers are making the area around the battlefield unsettled.", "The skies are filled with dark clouds and the deafening sounds of TIE fighters."],
    "worse_omen": ["Imperial TIE fighters have infested the area where the Rebel Alliance forces were planning their attack.", "Rebel Alliance gear is covered in the blood of their enemies, and it seems impossible to clean.", "The howling of Imperial Star Destroyers echoes through the battlefield, making the Rebel Alliance uneasy."],
    "terrible_omen": ["The fallen Rebel soldiers are being consumed by scavenger droids in the middle of the night.", "The ground shakes with the sound of Imperial walkers marching toward the battlefield, their eyes glowing with fury.", "The smell of death and decay attracts hordes of Imperial Star Destroyers to the battlefield."],
    "thing": ["deathly", "imposing", "menacing", "relentless", "unstoppable"],
    "weapon": ["blasters", "armor", "engines", "shields", "communication systems"],
    "machine": ["scavenger droids", "probe droids", "repair droids", "security droids", "interrogation droids"],
    "origin": [""]
}

if (allignment < 200)
  doom_data.origin=["#bad_omen#"]
if (allignment < 150)
  doom_data.origin=["#worse_omen#","#worse_omen#","#bad_omen#",]
if (allignment < 100)
  doom_data.origin=["#terrible_omen#", "#terrible_omen#", "#worse_omen#"]
  
result += "<br>" + grammars.GenerationSimple(doom_data)


  //console.log(doom_data, grammars.GenerationSimple(doom_data))
  //console.log(result)
  
  return result

}
   
