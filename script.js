console.log('it works!!!!');
function openCity(cityName) {
  let i;
  const x = document.getElementsByClassName('city');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  document.getElementById(cityName).style.display = 'block';
}
