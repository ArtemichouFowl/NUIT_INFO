let upgrade_click = document.getElementById('upgrade_button')


upgrade_click.addEventListener('click', function(e) {
    
    document.getElementById('modal').style.display = 'block'
  });

document.getElementById('modal-close').addEventListener('click', function(e) {
document.getElementById('modal').style.display = 'none'
})