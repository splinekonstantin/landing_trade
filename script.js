console.log('it works!!!!');

const navButtons = document.querySelectorAll('.nav-button');

function openContentOption(option) {
  // let i;
  const options = document.querySelectorAll('.content-option');
  for (i = 0; i < options.length; i++) {
    options[i].style.display = 'none';
  }
  // document.getElementById(option).style.display = 'block';
}
navButtons.forEach(function(button) {
  button.addEventListener('click', openContentOption);
});
