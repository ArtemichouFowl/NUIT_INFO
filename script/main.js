
let score = 0 // score de feuille
let treeState = 0 // etat de l'arbre
let finalState = 5 // dernier etat

let addValue = [1,10,100,1000,10000,100000] // valeurs ajoutée à l'arbre a chaque clic
let upgradePrices = [50,500,5000,50000,500000,5000000] // valeurs pour améliorer l'arbre

let scoreTag = document.getElementById("score_number") // text score
let upgradeTag = document.getElementById("upgrade_button") // text faire pousser
let treeImage = document.getElementById("tree_img")// image arbre

updateUpgradeTag()
updateScoreTag();

treeImage.addEventListener("click", function(){
    increaseScore();
});

upgradeTag.addEventListener("click", function(){
    upgradeTree();
});

function increaseScore(){
    score+=addValue[treeState]
    updateScoreTag();
}

function upgradeTree(){
    if(treeState<finalState && score >= upgradePrices[treeState]){
        score-=upgradePrices[treeState]
        treeState++
    }
    updateScoreTag()
    updateUpgradeTag()
}

function updateScoreTag(){
    scoreTag.innerHTML = score;
}

function updateUpgradeTag(){
    if(treeState<finalState){
        upgradeTag.innerHTML = `Faire pousser l'arbre : ${upgradePrices[treeState]}`
    } else {
        upgradeTag.innerHTML = "Vous avez terminé !"
    }
}