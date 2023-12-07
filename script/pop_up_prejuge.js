let upgrade_click = document.getElementById('upgrade_button')


upgrade_click.addEventListener('click', function(e) {
    if(isUpgradable()){
      let prejuge = getQuestion()

      let modal = document.getElementById('modal')
  
      let modal_reponse = document.getElementById('modal_reponse')
  
      document.getElementById('question_modal').textContent = prejuge.titre
  
      modal.style.display = 'block'
  
      let true_button = document.getElementById('button_true_answer')
  
      let false_button = document.getElementById('button_false_answer')
  
  
      true_button.addEventListener('click', function(e) {
  
          modal.style.display = 'none'
  
          let solution = document.getElementById('solution')
  
          if(prejuge.solution == true){
  
              solution.textContent = "Bravo !"
  
              upgradeTree()
  
          } else {
  
              solution.textContent = "Tu as perdu !"
  
              wrongAnswer()
          }
  
          let reponse = document.getElementById('reponse')
  
          reponse.textContent = prejuge.reponse
  
          modal_reponse.style.display = 'block'
  
      });
  
      false_button.addEventListener('click', function(e) {
  
          modal.style.display = 'none'
  
          let solution = document.getElementById('solution')
  
          if(prejuge.solution == false){
  
              solution.textContent = "Bravo !"
  
              upgradeTree()
  
          } else {
  
              solution.textContent = "Tu as perdu !"
  
              wrongAnswer()
          }
  
          let reponse = document.getElementById('reponse')
  
          reponse.textContent = prejuge.reponse
  
          modal_reponse.style.display = 'block'
  
      });
  
    }
  });

document.getElementById('modal-close').addEventListener('click', function(e) {
document.getElementById('modal').style.display = 'none'
})

document.getElementById('modal-close_reponse').addEventListener('click', function(e) {
    document.getElementById('modal_reponse').style.display = 'none'
    })
