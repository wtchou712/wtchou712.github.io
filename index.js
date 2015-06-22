
var data = {
                "assassin": ["zed","leblanc","ahri"],
                "mage": ["annie", "leblanc", "ahri"],
                "marksman": ["caitlyn", "ezreal", "corki"], 
                "tank": ["mundo", "maokai", "sion"],
                "fighter": ["darius", "irelia"], 
                "support": ["thresh", "blitzcrank", "annie"] 
           }
function selectChampion(){
    var selectedLane = document.getElementById("lane").value;
    var selectedRole = document.getElementById("role").value;

    if(selectedLane=="random"){
        //determine a random lane for the user
        var randNum = Math.floor((Math.random()*4)+1);
        if(randNum==1){
            selectedLane = "top";
        }
        else if (randNum==2){
            selectedLane = "mid";
        }
        else if (randNum==3){
            selectedLane = "jungle";
        }
        else {
            selectedLane = "bot";
        }
    }

    if(selectedRole=="random"){
        //determine a random role for the user
        var randNum = Math.floor((Math.random()*6)+1);
        if(randNum==1){
            selectedRole = "assassin";
        }
        else if (randNum==2){
            selectedRole = "mage";
        }
        else if (randNum==3){
            selectedRole = "marksman";
        }
        else if (randNum==4){
            selectedRole = "tank";
        }
        else if (randNum==5){
            selectedRole = "fighter";
        }
        else {
            selectedRole = "support";
        }
    }

    var possibleChamps = data[selectedRole];
    var totalChampsPossible = possibleChamps.length;
    var randNum = Math.floor((Math.random()*totalChampsPossible));

    var selectedChampion = possibleChamps[randNum];
    var result = "You are playing " + selectedChampion + " as a " + selectedRole + " in " + selectedLane + ".";
    var champProBuild = "www.probuilds.net/champions/" + selectedChampion;

    $('#selection').html(result);
    $('#probuilds').html("Probuilds for " + selectedChampion);
    document.getElementById("probuilds").href = champProBuild;
}
