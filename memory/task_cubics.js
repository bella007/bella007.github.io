var check = true;
while (check) {
    var quantityX = prompt('enter a quantity for X asic'),
        quantityY = prompt('enter a quantity for Y asic'),
        quantity = quantityY * quantityX;
    if((quantityX*quantityY)%2==0){
        check = false;
    }
}
var container = document.getElementById('container');
var x = 70*quantityX,
    y = 70*quantityY;
container.style.width = `${x}px`;
container.style.height = `${y}px`;


var size = 50,
    margin = 10;
var counter_id = 0
for (i=0; i<quantityX; i++) {
  for (j=0; j<quantityY; j++) {
    var innerCubic = document.createElement('div');
    innerCubic.classList.add('cubic-inner');
    innerCubic.style.top = `${j*size + j*9*margin}px`;
    innerCubic.style.left = `${i*size + i*9*margin}px`;
    innerCubic.style.backgroundSize = 'contain';
    innerCubic.style.backgroundRepeat = 'no-repeat';
    innerCubic.id = counter_id
    counter_id++
    container.appendChild(innerCubic);

    var outerCubic = document.createElement('div');
    outerCubic.classList.add('cubic-outer');
    outerCubic.style.top = `-${margin}px`; 
    outerCubic.style.left = `-${margin}px`;
    
    innerCubic.appendChild(outerCubic);
  }
}
var images = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png'];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function rand_img(i){
    var rand = Math.floor(Math.random()*i);
    var ff = images[rand]
    return ff;
}

var new_arr = []
function setImages() {
  var arrInnerCubics = document.getElementsByClassName('cubic-inner');
  for (var i=0; i<quantity/2; i++){
    var eleee = rand_img(images.length)
    new_arr.push(eleee)}
  for (var i=0; i<quantity/2; i++){
      new_arr.push(new_arr[i])
  }
  new_arr = shuffleArray(new_arr)
  new_arr = shuffleArray(new_arr)
  for (i=0; i<arrInnerCubics.length; i++) {
    arrInnerCubics[i].style.backgroundImage = `url(${new_arr[i]})`;
    }
  }
shuffleArray(images);
setImages();

var arrCubics = document.getElementsByClassName('cubic-outer'),
    clickCounter = 0;
var any = ''
for (i=0; i<arrCubics.length; i++) {
    arrCubics[i].addEventListener('click', function(event) {
    event.target.style.opacity = '0';
    any = event.target
    if (event.target.parentNode.classList.contains('open')) {
        event.target.parentNode.classList.remove('open');
        event.target.style.opacity='1';
        console.log('nice');
        clickCounter = 0;
    }
    else {
        event.target.parentElement.classList.add('open');
        clickCounter++;}
      //check every two clicks
    if (clickCounter==2) {
        clickCounter = 0;
      var arrOpen = document.getElementsByClassName('open');

      if (arrOpen[0].style.backgroundImage == arrOpen[1].style.backgroundImage) {
        setTimeout(function() {
          arrOpen[0].style.display = 'none';
          arrOpen[1].style.display = 'none';
          arrOpen[0].classList.remove('open');
          arrOpen[0].classList.remove('open');
        }, 500);

      }
      else setTimeout(function() {

            arrOpen[0].classList.remove('open');

            arrOpen[0].classList.remove('open');
            for (i=0; i<arrCubics.length; i++) {
              arrCubics[i].style.opacity = '1';
            }
          }, 500);
    }
  })
}
