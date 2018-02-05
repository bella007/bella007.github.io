<!--Кнопка Begin-->

var buttonBegin=document.getElementById('beginButton');
var logo=document.querySelector('.logo');
var logoStart=document.querySelector('.logoStart');
var result=document.querySelector('.result');
buttonBegin.onclick=Start;

    function Start() {
    var container = document.getElementById('box');
    var quantity=+document.getElementById('quantity').value;
    logo.style.display = "none";
    logoStart.style.display = "none";
    result.style.display = "none";
    container.style.zIndex=10;

<!--end of Кнопка Begin-->

    <!--Sasha works -->

    //quantity = +prompt('enter number from 1 to 10'),
    numbers = [],
    blocks = document.getElementsByClassName('block'),
    sound = new Audio(),
    colors = ['#a18cb8', '#bf7e7a', '#bdadab', '#e6eff1', '#e5bd89'],
    fontsizes = [40, 20, 10, 30];

sound.src = 'sounds/error.mp3';
sound.load();


while (quantity < 1 || quantity > 10) {
  //  quantity=+document.getElementById('quantity').value;
  quantity = +prompt('Try again. Enter number from 1 to 10')
}
function createBlocks(quantity) {
  for (var i=1; i <= quantity*quantity; i++) {
    var block = document.createElement('div');
    block.classList.add('block');
    if (quantity<10) {
      block.style.width = `${100/quantity}%`;
      block.style.height = `${100/quantity}%`;
    } else {
      block.style.width = `10%`;
      block.style.height = `10%`;
    }
    container.appendChild(block);
    numbers.push(i);
    var random = Math.floor(Math.random() * 5);
    block.style.backgroundColor = `${colors[random]}`;
    block.style.fontSize = `${fontsizes[random]}px`;
  }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function putNumbers() {
    for (i=0; i<numbers.length; i++) {
    blocks[i].innerHTML = `${numbers[i]}`;
  }
}

createBlocks(Math.floor(quantity));
shuffleArray(numbers);
putNumbers();

function startGame() {
  var current = 1;
    for (var i=0; i<blocks.length; i++) {
      blocks[i].addEventListener('click', function(event) {
        console.log(event.target.innerHTML);
        if (+event.target.innerHTML == current) {
          event.target.style.backgroundColor = 'red';
          current++;
            if(current == quantity*quantity+1){
                logoEndDiv();
                clearTimeout(tt);
            }
        } else if (+event.target.innerHTML > current){
          sound.play();

        }
      })
    }
  console.log('End');
}

function logoEndDiv() {
    clean();
    var logo=document.querySelector('.logo');
    var logoWin=document.querySelector('.logoWin');
    console.log("you win");
    //stopTimer();
    logoWin.style.display="block";
    logo.style.display="block";
    container.style.zIndex=-1;
}

startGame();
console.log(numbers);

<!--isabella code-->

        var timer_element = quantity*quantity*2+1;
        var timerField = document.createElement('div');
        container.appendChild(timerField);
        timerField.classList.add('timer-field');
        var tt = '';
        function timer(){
            timer_element--;
            if (timer_element>0) {
                tt = setTimeout(timer, 1000);
                if (timer_element <= 3){  timerField.classList.add('blinking');     }
                timerField.innerHTML = timer_element;
                console.log(timer_element);
            }
            else{
                timerField.classList.remove('blinking')
                youLose();
                setTimeout(function(){},1000);
            }
        }
        setTimeout(timer,500);

<!--isabella code end-->

        function clean() {
            var block = document.querySelectorAll('.block');
            var box = document.getElementById('box');
            for (var i=0; i<block.length;i++) {
                box.removeChild(block[i]);
            }
            box.removeChild(timerField);
        }

        function youLose() {
            clean();
            var logoLosy = document.querySelector('.logoLosy');
            var box = document.getElementById('box');
            var logoWin=document.querySelector('.logoWin');
            logoWin.style.display="none";
            logoLosy.style.display="block";
            logo.style.display="block";
            box.style.zIndex=-1;
        }

        var tryAgain=document.querySelector('.TryAgain');
        tryAgain.onclick=function () {
            Start();
        };
        var tryAgain2=document.getElementById('TryAgain2');
        tryAgain2.onclick=function () {
            Start();
        };

        var returnToLogoStart = document.querySelector('.returnToLogoStart');
        returnToLogoStart.onclick=function () {
            var logoWin=document.querySelector('.logoWin');
            logoStart.style.display="block";
            logo.style.display="block";
            logoWin.style.display="none";
        };
        var returnToLogoStart2 = document.getElementById('returnToLogoStart2');
        returnToLogoStart2.onclick=function () {
            var logoWin=document.querySelector('.logoWin');
            var logoLosy = document.querySelector('.logoLosy');
            logoStart.style.display="block";
            logo.style.display="block";
            logoWin.style.display="none";
            logoLosy.style.display="none";
        };

    };
var ResultButton = document.getElementById('ResultButton');
ResultButton.onclick=function () {
    var result=document.querySelector('.result');
    result.style.display="block";
    logoStart.style.display="none";
};
var returnToLogoStart3 = document.getElementById('returnToLogoStart3');
returnToLogoStart3.onclick=function () {
    var logoWin=document.querySelector('.logoWin');
    logoStart.style.display="block";
    logo.style.display="block";
    logoWin.style.display="none";
    result.style.display="none";
};