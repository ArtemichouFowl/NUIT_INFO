//Fonction create
function create(tagName, container, text = null, classs = null, id = null) {
    let element = document.createElement(tagName)
    container.appendChild(element)
    if (text)
        element.appendChild(document.createTextNode(text))
    if (classs)
        element.classList.add(classs)
    if (id)
        element.id = id
    return element
}

let score = 0 // score de feuille
let treeState = 0 // etat de l'arbre
let finalState = 5 // dernier etat

let addValue = 1 // ajout onClick de feuille
let autoValue = 1 // ajout auto de feuille

let upgradePrices = [10,500,5000,50000,500000,5000000] // valeurs pour améliorer l'arbre

let treeImages = ["arbre1.svg","arbre2.svg","arbre3.svg","arbre4.svg","arbre5.svg","arbre6.svg"]

let scoreTag = document.getElementById("score_number") // text score
let upgradeTag = document.getElementById("upgrade_button") // text faire pousser
let treeImage = document.getElementById("tree_img")// image arbre
let shopContainer = document.getElementById("shop") // boutique de fruit
let addValueTag = document.getElementById("addValue") // boutique de fruit
let autoValueTag = document.getElementById("autoValue") // boutique de fruit

let fruitJSON = [
    {
        "name" : "Cerise",
        "nb" : 0,
        "addValue" : 1,
        "autoValue" : 1,
        "unlockState" : 0,
        "price" : 10,
        "url" : "style/img/cerise.png"
    },
    {
        "name" : "Fraise",
        "nb" : 0,
        "addValue" : 1,
        "autoValue" : 1,
        "unlockState" : 1,
        "price" : 10,
        "url" : "style/img/fraise.png"
    },
    {
        "name" : "Raisin",
        "nb" : 0,
        "addValue" : 1,
        "autoValue" : 1,
        "unlockState" : 2,
        "price" : 10,
        "url" : "style/img/raisin.png"
    },
    {
        "name" : "Peche",
        "nb" : 0,
        "addValue" : 1,
        "autoValue" : 1,
        "unlockState" : 3,
        "price" : 10,
        "url" : "style/img/pêche.png"
    },
    {
        "name" : "Pomme",
        "nb" : 0,
        "addValue" : 1,
        "autoValue" : 1,
        "unlockState" : 4,
        "price" : 10,
        "url" : "style/img/pomme.png"
    },
    {
        "name" : "Gapple",
        "nb" : 0,
        "addValue" : 1,
        "autoValue" : 1,
        "unlockState" : 5,
        "price" : 10,
        "url" : "style/img/doree.png"
    }
]

let questionJSONArr = [     {
      "titre": "Les scientifiques sont tous d'accord sur la dangerosité du dérèglement climatique",
      "reponse": "Le GIEC (Groupe d’experts intergouvernemental sur l’évolution du climat), formé par les Nations Unies, étudie depuis une vingtaine d’années les différents travaux des scientifiques du monde entier. Tous les rapports de cet organisme indiquent la dangerosité du réchauffement climatique, provoqué par l’homme et les émissions de gaz à effet de serre.",
      "solution": true
    },
     {
      "titre": "Le dérèglement climatique peut être résolu par les progrès scientifiques",
      "reponse": "Les progrès technologiques pourront peut-être dans un futur lointain nous permettre de coloniser de nouvelles planètes, comme solution de sauvegarde de l’espèce humaine… Mais aucune découverte scientifique majeure n’a pu influer sur le climat.",
      "solution": false
    },
     {
      "titre": "Les voitures électriques sont plus écologiques que les voitures thermiques",
      "reponse": "Les voitures électriques sont généralement plus écologiques que les voitures thermiques, principalement parce qu'elles émettent moins de gaz à effet de serre lors de leur utilisation. Cependant, leur fabrication, en particulier celle des batteries, peut être plus polluante.",
      "solution": false
    },
     {
      "titre": "La France sera peu touchée par le changement climatique",
      "reponse": "Il s’agit d’une idée reçue : si le réchauffement climatique va provoquer des catastrophes humanitaires dans les régions déjà arides, les pays plus tempérés comme la France en subiront aussi les effets. La destruction de la faune et de la flore de nombreuses régions, telles que les vignes du Bordelais ou les espèces végétales en haute montagne, pourrait advenir.",
      "solution": false
    },
     {
      "titre": "Les politiques écologiques ne suffisent pas à endiguer le problème",
      "reponse": "L’engagement de la communauté internationale à limiter le réchauffement climatique à moins de 2 degrés est un pas important. Mais les mesures écologiques plus ambitieuses comme l’abandon des énergies fossiles ne sont pas encore envisagées au niveau mondial.",
      "solution": true
    }]

updateUpgradeTag()
updateScoreTag()
updateFruitList()
updateAddTags()
updateTreeImage()


//click sur le tree -> augmente le score
treeImage.addEventListener("click", function () {
    increaseScoreClick();
});



//augmente le score au click
function increaseScoreClick() {
    score += addValue
    updateScoreTag();
}
//augmente le score auto
function increaseScoreAuto() {
    score += autoValue
    updateScoreTag();
}
setInterval(increaseScoreAuto, 1000);

//fausse reponse a l'upgrade
function wrongAnswer(){
    score-=upgradePrices[treeState]
    updateScoreTag()
}

function updateTreeImage(){
    treeImage.src = "style/img/"+treeImages[treeState]
}

//bonne reponse a l'upgrade
function upgradeTree() {
    if (treeState < finalState && score >= upgradePrices[treeState]) {
        score -= upgradePrices[treeState]
        treeState++
        playAudio();
    }
    updateScoreTag()
    updateUpgradeTag()
    updateFruitList()
    updateTreeImage()
}

//met a jour le score
function updateScoreTag() {
    scoreTag.innerHTML = score+" feuilles";
}

//met a jour le bouton d'amélioration
function updateUpgradeTag() {
    if (treeState < finalState) {
        upgradeTag.innerHTML = `Faire pousser l'arbre : ${upgradePrices[treeState]}`
    } else {
        upgradeTag.innerHTML = "Vous avez terminé !"
    }
}

//met a jour les tags d'ajout de value
function updateAddTags(){
    addValueTag.innerHTML = "+"+addValue+"/clic"
    autoValueTag.innerHTML = "+"+autoValue+"/sec"
}

function isUpgradable() {
    return (score >= upgradePrices[treeState])
}

function getQuestion() {
    return questionJSONArr[treeState]
}

function buyFruit(index){
    if(score>=fruitJSON[index].price){
        playAudio();
        score-=fruitJSON[index].price
        fruitJSON[index].nb++
        addValue+=fruitJSON[index].addValue
        autoValue+=fruitJSON[index].autoValue
        updateFruitList()
        updateAddTags()
        updateScoreTag()
    }
}



//Function pour jouer l'audio lors du clique sur l'arbre
function playAudio() {
    let audio = document.getElementById("clickMusic")
    audio.play()
}

function updateFruitList(){
    shopContainer.innerHTML = ""
    for(i in fruitJSON){
        if(fruitJSON[i].unlockState <= treeState){
            let index = i
            let shopItem = create("div",shopContainer,null,"item-shop")

            
            let info_item = create("div",shopItem,null,"info_item",null)

            let text_item = create("div",info_item,null,"item_text",null)
            create("p",text_item,fruitJSON[i].nb+" "+fruitJSON[i].name)
            create("p",text_item,"+"+fruitJSON[i].addValue+" /clic")
            create("p",text_item,"+"+fruitJSON[i].autoValue+" /sec")

            let img_item = create("div",info_item,null,"item_img",null)
            let img = create("img",img_item,null,"fruit_img",null)
            img.src = fruitJSON[i].url

            let button_item = create("div",shopItem,null,"item_button",null)

            let button = create("button",button_item,"Acheter : "+fruitJSON[i].price)
            button.addEventListener("click", function(){
                buyFruit(index)
            })
        }
    }
}