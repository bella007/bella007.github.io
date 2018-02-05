var blocks = document.querySelectorAll('.block'),
    selected = [],
    arrayImages = [],
    arrayResult = [[], [], []],
    images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'],
    amount = 50,
    cash = document.querySelector('.cash'),
    audioAddMoney = new Audio(),
    timer,
    x = true;

cash.innerHTML = `${amount}\$`;
audioAddMoney.src = 'sounds/money.mp3';
audioAddMoney.load();


//initial filling of images
function SlotItem(img, imgId) {
  this.img = img;
  this.imgId = imgId;
}
function createSlot() {
  for (var i=0; i<images.length; i++) {
    var random = (Math.ceil(Math.random()*4));
    for (var j=0; j<random; j++) {
    arrayImages.push(new SlotItem(images[i], i+1));
    }
  }
}
createSlot();

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
shuffleArray(arrayImages);

//
function FillImages(element, arr) {
  for (var i=0; i<arr.length; i++) {
    var pic = document.createElement('div');
    pic.classList.add('image');
    pic.setAttribute('data-imgid', arr[i].imgId);
    pic.style.backgroundImage = `url(images/${arr[i].img})`;
    pic.style.left = '0px';
    pic.style.top = `${100*i}px`;
    element.append(pic);

  }
}
for (var i=0; i<blocks.length; i++) {
  blocks[i].innerHTML = '';
  FillImages(blocks[i], arrayImages);
}
//end of initial filling of images

function scrollImage() {
  for (var i=0; i<blocks.length; i++) {
    var randIndex = Math.ceil(Math.random()*5);
    children = blocks[i].children;
    for (var j=0; j<arrayImages.length; j++) {
      children[j].style.transition = '1s';
      var currentPosition = children[j].style.top.slice(0, -2) - randIndex*100;
      children[j].style.top = `${currentPosition}px`;
    }
  }
  setTimeout(ChangePosition, 1000);

}

function ChangePosition() {
  for (var i=0; i<blocks.length; i++) {
    children = blocks[i].children;
    for (var j=0; j<children.length; j++) {
      if (children[j].style.top.slice(0, -2) < 0) {
        children[j].style.transition = '0s';
        var newCurrentPosition = +children[j].style.top.slice(0, -2) + children.length*100;
        children[j].style.top = `${newCurrentPosition}px`;
      }
    }
  }
}

function checkIndex() {
  for (var i=0; i<blocks.length; i++) {
    children = blocks[i].children;
    for (var j=0; j<children.length; j++) {
      if (children[j].style.top.slice(0, -2) == 0) {
        arrayResult[0].push(children[j].getAttribute('data-imgid'));
      }
      if (children[j].style.top.slice(0, -2) == 100) {
        arrayResult[1].push(children[j].getAttribute('data-imgid'));
      }
      if (children[j].style.top.slice(0, -2) == 200) {
        arrayResult[2].push(children[j].getAttribute('data-imgid'));
      }
    }
  }
}

var temp;

function addCash() {
  cash.innerHTML = `${amount}\$`;
  audioAddMoney.play();

  // timer += 3000;
  setTimeout(function() { audioAddMoney.pause(); }, 2000);
}

function analyzeResult(arr) {
  if (arr[0][0] == arr [0][1] && arr [0][1]== arr[0][2]) {
    amount+=100;
      temp = 0;
    setTimeout(addCash, 1000);
    lineHor1.style.animationPlayState = 'running';
  }
  if (arr[1][0] == arr [1][1] && arr [1][1] == arr[1][2]) {
    amount+=150;
      temp = 0;
    setTimeout(addCash, 1000);
    lineHor2.style.animationPlayState = 'running';
  }
  if (arr[2][0] == arr [2][1] && arr [2][1] == arr[2][2]) {
    amount+=100;
      temp = 0;
    setTimeout(addCash, 1000);
    lineHor3.style.animationPlayState = 'running';
  }
  if (arr[0][0] == arr [1][1] && arr [1][1] == arr[2][2]) {
    amount+=50;
      temp = 0;
    setTimeout(addCash, 1000);
    lineDiag1.style.animationPlayState = 'running';
  }
  if (arr[0][2] == arr [1][1] && arr [1][1] == arr[2][0]) {
    amount+=50;
      temp = 0;
    setTimeout(addCash, 1000);
    lineDiag2.style.animationPlayState = 'running';
  }
}
function clearAnimation() {
  var lines = document.querySelectorAll('.line');
  for (var i=0; i<lines.length; i++) {
    lines[i].style.animationPlayState = 'paused';
  }
}
start.addEventListener('click', function(event) {
  if (x) {
    temp = 1;
    // timer = 1000;
    x = false;
    arrayResult = [[], [], []];
    amount-= 5;
    cash.innerHTML = `${amount}\$`;


    scrollImage();
    clearAnimation();
    checkIndex();
    analyzeResult(arrayResult);
    console.log('temp', temp);
    if (temp) {
      timer = 1000;
    } else {timer = 4000};
    console.log('final timer', timer);
    setTimeout(function(){x = true;}, timer);

  }

});
