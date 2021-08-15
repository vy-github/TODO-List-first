
// Moving activness of tabs
// sub-container moving as tab clicked

const addClassForTabss = document.querySelectorAll('.tabs');
const subContainers = document.querySelectorAll('.content');

addClassForTabss[0].addEventListener('click', () => {
   addClassForTabss[0].classList.add('reminder-tab');
   subContainers[0].style.left = 0 +'%';
   subContainers[1].style.left = 100 + '%';
});

addClassForTabss[1].addEventListener('click', () => {
   addClassForTabss[0].classList.remove('reminder-tab');
   subContainers[0].style.left = -100 + '%';
   subContainers[1].style.left = 0 + '%';
});




// Set todays date as minimum to DateTime Control

const setDate = document.getElementsByTagName('input');
// setDate[1].value = new Date().toISOString().substring(0, 10);
setDate[1].min = new Date().toISOString().substring(0, 10);




// set remaining today's hour and minuts

const dt = new Date();

// const currentDate = dt.toLocaleDateString().split('/').join('-');
// const year = dt.getFullYear();
// const month = String(dt.getMonth() + 1).padStart(2, '0');
// const day = String(dt.getDate()).padStart(2, '0');
// const currentDate = `${year}-${month}-${day}`;
const hour = dt.getHours();
const minute = dt.getMinutes();


setDate[1].addEventListener('focusout', funHour => {
   const currentDate = setDate[1].value;

   const selectHours = document.getElementById('hours');
   selectHours.innerHTML = "";
   let creatingOptionForHour = document.createElement('option');
   creatingOptionForHour.text = "Select Hour";
   selectHours.add(creatingOptionForHour);

   const selectMinutes = document.getElementById('minutes');
   selectMinutes.innerHTML = "";
   let creatingOptionForMinute = document.createElement('option');
   creatingOptionForMinute.text = "Select Minute";
   selectMinutes.add(creatingOptionForMinute);

   if (setDate[1].value === currentDate) {
      for (let i = hour; i <= 23; i++) {
         creatingOptionForHour = document.createElement('option');
         creatingOptionForHour.value = i;
         creatingOptionForHour.innerHTML = i;
         selectHours.appendChild(creatingOptionForHour);
      }

      selectHours.addEventListener('focusout', funMinute => {
         selectMinutes.innerHTML = "";
         let creatingOptionForMinute = document.createElement('option');
         creatingOptionForMinute.text = "Select Minute";
         selectMinutes.add(creatingOptionForMinute);

         if (selectHours.value == hour && setDate[1].value === currentDate) {
            for (let i = minute+2; i <= 59; i++) {
               creatingOptionForMinute = document.createElement('option');
               creatingOptionForMinute.value = i;
               creatingOptionForMinute.innerHTML = i;
               selectMinutes.appendChild(creatingOptionForMinute);
            }
            // console.log(mn);
            // for (i = mn-1; i >= 0; i--) {
            //    selectMinutes.remove(2);
            // }

         } else {

            for (let i = 0; i <= 59; i++) {
               creatingOptionForMinute = document.createElement('option');
               creatingOptionForMinute.value = i;
               creatingOptionForMinute.innerHTML = i;
               selectMinutes.appendChild(creatingOptionForMinute);
            }
         }
      });

   } else {
      for (let i = 0; i <= 23; i++) {
         creatingOptionForHour = document.createElement('option');
         creatingOptionForHour.value = i;
         creatingOptionForHour.innerHTML = i;
         selectHours.appendChild(creatingOptionForHour);
      }
      for (let i = 0; i <= 59; i++) {
         creatingOptionForMinute = document.createElement('option');
         creatingOptionForMinute.value = i;
         creatingOptionForMinute.innerHTML = i;
         selectMinutes.appendChild(creatingOptionForMinute);
      }
   }
});




// Save data to localStorage

const gettingButton = document.querySelector('button');

gettingButton.addEventListener('click', () => {
   const gettingInputTag = document.getElementsByTagName('input');
   const gettingSelectTag = document.getElementsByTagName('select');
   const gettingTextAreaTag = document.getElementsByTagName('textarea');

   const gettingTitle = gettingInputTag[0].value;
   const gettingDate = gettingInputTag[1].value;
   const gettingHour = gettingSelectTag[0].value;
   const gettingMinute = gettingSelectTag[1].value;
   let gettingRepeat = "";
   const gettingDesc = gettingTextAreaTag[0].value;

   const repeatKeys = ['once', 'daily', 'weekly', 'monthly', 'annually'];
   for (let i = 2; i <= 6; i++) {
      if (gettingInputTag[i].checked)
         gettingRepeat = repeatKeys[i-2];
   }

   const value = JSON.stringify({
      title : gettingTitle,
      date : gettingDate,
      hour : gettingHour,
      minute : gettingMinute,
      repeat : gettingRepeat,
      desc : gettingDesc
   })

   localStorage.setItem(localStorage.length + 1, value);
});




// render data from local storage

function getData() {
   const renderHook = document.getElementsByClassName('history');
   const createMultipleCards = document.createElement('div');
   
   for (let i = localStorage.length; i >= 1; i--) {

      const data = JSON.parse(localStorage.getItem(i));

      const createCards = document.createElement('div');
      createCards.className = 'cards';
      createCards.id = 'cards' + i;
      createCards.innerHTML = 
         `
            <div class="card-area">

               <div class="card-data title">
                  <h3>${data.title}</h3>
                  <h4>on <span>${data.date}</span> </h4>
               </div>

               <div class="card-data desc">
                  <h4>${data.desc}</h4>
                  <h4>at <span>${data.hour}:${data.minute}</span> </h4>
               </div>

            </div>

            <div class="button-area">
               <button id='${i}' onclick="cancelReminder(id)">Cancel</button>
            </div>
         `
      createMultipleCards.append(createCards);
   }
   renderHook[0].append(createMultipleCards);
}

getData();

// for (let i = 0; i < localStorage.length; i++) {
//    const key = localStorage.key(i);
//    console.log(`${key}: ${localStorage.getItem(key)}`);
// }





// Cancel the Reminder as per given id

function cancelReminder(name) {
   console.log(name);
   document.getElementById('cards'+name).remove();

   for (let i = parseInt(name)+1; i <= localStorage.length; i++) {
      const data = localStorage.getItem(i);
      localStorage.setItem(i-1,data);
   }
   
   localStorage.removeItem(localStorage.length);
}



// Reminder as per given time and date

function reminder() {
   
   let minuteDum = 0;
   
   setInterval( () => {
      const dt = new Date();

      const year = dt.getFullYear();
      const month = String(dt.getMonth() + 1).padStart(2, '0');
      const day = String(dt.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;

      const hour = dt.getHours();
      const minute = dt.getMinutes();

      if (minuteDum != minute) {
         
         for (let i = 1; i <= localStorage.length; i++) {
            const data = JSON.parse(localStorage.getItem(i));

            if (data.date == currentDate && data.hour == hour && data.minute == minute) {
               showNotification(data.title, data.desc);
               
               if (data.repeat == 'once'){
                  cancelReminder(i);
                  location.reload();
               }
               else{
                  updateReminder(i);
                  location.reload();
               }
            }

         }

      }
      
      minuteDum = minute;

   },1000);
   
}

reminder();




// Desktop Notification

function showNotification(title, desc) {
   const notification = new Notification(title, {
      body: desc
   });
}




// updating reminder

function updateReminder(idToUpdate) {
   const data = JSON.parse(localStorage.getItem(idToUpdate));
   
   let newDate = 0;
   let dt = new Date();

   if (data.repeat == 'daily') {
      dt = addDays(data.date, 1);
   } else if (data.repeat == 'weekly') {
      dt = addDays(data.date, 7);
   } else if (data.repeat == 'monthly') {
      const dtObj = new Date(data.date);
      dt = new Date(dtObj.setMonth(dtObj.getMonth() + 1));
   } else if (data.repeat == 'annually') {
      const dtObj = new Date(data.date);
      dt = new Date(dtObj.setFullYear(dtObj.getFullYear() + 1));
   }

   const newYear = dt.getFullYear();
   const newMonth = String(dt.getMonth() + 1).padStart(2, '0');
   const newDay = String(dt.getDate()).padStart(2, '0');
   const newCurrentDate = `${newYear}-${newMonth}-${newDay}`;

   data.date = newCurrentDate;
   localStorage.setItem(idToUpdate, JSON.stringify(data));
}




// adding days in given date

function addDays(date, days) {
   var dt = new Date(date);
   dt.setDate(dt.getDate() + days);
   return dt;
}