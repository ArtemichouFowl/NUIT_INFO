
let score = 0 // score de feuille
let treeState = 0 // etat de l'arbre
let finalState = 5 // dernier etat

let addValue = [1, 10, 100, 1000, 10000, 100000] // valeurs ajoutée à l'arbre a chaque clic
let upgradePrices = [50, 500, 5000, 50000, 500000, 5000000] // valeurs pour améliorer l'arbre

let scoreTag = document.getElementById("score_number") // text score
let upgradeTag = document.getElementById("upgrade_button") // text faire pousser
let treeImage = document.getElementById("tree_img")// image arbre

let questionJSONArr = [{
      "titre": "Les scientifiques sont tous d'accord",
      "reponse": "Le GIEC (Groupe d’experts intergouvernemental sur l’évolution du climat), formé par les Nations Unies, étudie depuis une vingtaine d’années les différents travaux des scientifiques du monde entier. Tous les rapports de cet organisme indiquent la dangerosité du réchauffement climatique, provoqué par l’homme et les émissions de gaz à effet de serre.",
      "solution": true
    },
    {
      "titre": "Le changement climatique peut être résolu par les progrès scientifiques",
      "reponse": "Les progrès technologiques pourront peut-être dans un futur lointain nous permettre de coloniser de nouvelles planètes, comme solution de sauvegarde de l’espèce humaine… Mais aucune découverte scientifique majeure n’a pu influer sur le climat.",
      "solution": false
    },
    {
      "titre": "Le réchauffement climatique est limité",
      "reponse": "La dernière décennie a été considérée comme la plus chaude depuis le début des relevés de températures. Le réchauffement climatique risque de provoquer des records de chaleur à l’avenir et de provoquer une augmentation des réfugiés climatiques, face à la sécheresse et à la pénurie d’eau.",
      "solution": false
    },{
      "titre": "La France sera peu touchée par le changement climatique",
      "reponse": "Il s’agit d’une idée reçue : si le réchauffement climatique va provoquer des catastrophes humanitaires dans les régions déjà arides, les pays plus tempérés comme la France en subiront aussi les effets. La destruction de la faune et de la flore de nombreuses régions, telles que les vignes du Bordelais ou les espèces végétales en haute montagne, pourrait advenir.",
      "solution": false
    },{
      "titre": "Les politiques écologiques ne suffisent pas à endiguer le problème",
      "reponse": "L’engagement de la communauté internationale à limiter le réchauffement climatique à moins de 2 degrés est un pas important. Mais les mesures écologiques plus ambitieuses comme l’abandon des énergies fossiles ne sont pas encore envisagées au niveau mondial.",
      "solution": true
    }]

updateUpgradeTag()
updateScoreTag();


document.addEventListener('DOMContentLoaded', startFallingLeaves);

treeImage.addEventListener("click", function () {
    increaseScore();
    playAudio();
});

upgradeTag.addEventListener("click", function () {
    upgradeTree();
});

function increaseScore() {
    score += addValue[treeState]
    updateScoreTag();
}

function wrongAnswer(){
    score-=addValue[treeState]
}

function upgradeTree(){
    if(treeState<finalState && score >= upgradePrices[treeState]){
        score-=upgradePrices[treeState]
        treeState++
    }
    updateScoreTag()
    updateUpgradeTag()
}

function updateScoreTag() {
    scoreTag.innerHTML = score;
}

function updateUpgradeTag() {
    if (treeState < finalState) {
        upgradeTag.innerHTML = `Faire pousser l'arbre : ${upgradePrices[treeState]}`
    } else {
        upgradeTag.innerHTML = "Vous avez terminé !"
    }
}

function playAudio() {
    let audio = document.getElementById("clickMusic")
    audio.play()
}



function createFallingLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    document.body.appendChild(leaf);

    const startPosition = Math.random() * window.innerWidth;
    leaf.style.left = startPosition + 'px';

    setTimeout(() => {
        leaf.remove();
    }, 8000); // Adjust the time based on your preference
}

function startFallingLeaves() {
    setInterval(createFallingLeaf, 1000); // Adjust the interval based on your preference
}

