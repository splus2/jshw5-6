var buttonStart = document.getElementById('button-start');
var buttonStop= document.getElementById('button-split');
var buttonReset= document.getElementById('button-reset');

var timeShow = document.querySelector('.time-show');

var timerId; // Идентификатор таймера

var clickCounter = 0; // Счетчик кликов на кнопку Start/Stop

var clickShowTimeCount = 0; // Счетчик кликов при выводе значений таймера для состояний Stop и Split

var ms = s = m = h = '00'; // Переменные для милисекунд, секунд, минут, дней

var buttonNameChange;


function startTimerButton() {
  clickCounter++; // При каждом клике счетчик увеличивается на 1

  // Если значение счетчика не четное, запускаем таймер, меняем название кнопки на Stop
  if (clickCounter % 2 !== 0) {
    buttonNameChange = document.getElementById('button-start');
    buttonNameChange.value = 'Stop'; 
    buttonNameChange.style.background = 'blue';
 
    workTimer();

    // Если значение счетчика четное, останавляиваем таймер, выводим значение таймера и меняем название кнопки на Start
  } else if (clickCounter % 2 == 0) {
      clearTimeout(timerId);

      clickShowTimeCount++;

      timeValue = document.createElement('p');
      timeValue.className= 'time-value-ouput';
      timeValue.innerHTML = clickShowTimeCount + '.' + ' ' + 'Stop: ' + h + ':' + m + ':' + s + '.' + ms;
      timeShow.appendChild(timeValue);

      buttonNameChange = document.getElementById('button-start');
 
      buttonNameChange.value = 'Continue';
      buttonNameChange.style.background = 'green';
    }

  console.log('COUNT: ', clickCounter);
}

  function workTimer() {    
    var timer = document.getElementById('timer');
    ms++;
      if (ms < 10) ms = '0' + ms;
      if (ms > 99) {
        ms = '00';
        s++;

        if (s < 10) s = '0' + s;
        if (s > 59 ) {
          s = '00';
          m++;
            
            if (m < 10) {
              m = '0' + m;
            }

            if (m > 59) {
              m = '00';
              h++;

              if (h < 10) {
                h = '0' + h;
              }

              if (h > 23) {
                h = '00';
                m = '00';
                s = '00';
                ms = '00';
              }
            }
        }
      }   
    timer.innerHTML = h + ':' + m + ':' + s + '.' + ms;
    timerId = setTimeout(workTimer, 9);

   }


function splitTimerButton() {

  // Если значение счетчика четное, то таймер остановлен и выводить состояние Split не нужно
  if ((clickCounter % 2 == 0) || (clickCounter == 0)) {

    return;

    // Если значение счетчика не четное, выводим текущее значение таймера (состояние Split)
  } else {

      timeValue = document.createElement('p');

      clickShowTimeCount++;

      timeValue.className = 'time-value-ouput';
      timeValue.innerHTML = clickShowTimeCount + '.' + ' ' + 'Split: ' + h+":"+m+":"+s + '.' + ms;
      timeShow.appendChild(timeValue);
    }
}


function resetTimerButton() {

  clearTimeout(timerId);

  ms = s = m = h = '00';

  document.getElementById('timer').innerHTML = h + ':' + m + ':' + s + '.' + ms;
  timeShow.innerHTML = '';
  
  // Сбрасываем счетчики кликов
  clickShowTimeCount = 0;
  clickCounter = 0;
  buttonNameChange = document.getElementById('button-start');
  buttonNameChange.value = 'Start';
  buttonNameChange.style.background = 'green';
}
  
  buttonNameChange = document.getElementById('button-start');
  buttonNameChange.value = 'Start';
  buttonNameChange.style.background = 'green';


buttonStart.addEventListener('click', startTimerButton);
buttonStop.addEventListener('click', splitTimerButton);
buttonReset.addEventListener('click', resetTimerButton);
