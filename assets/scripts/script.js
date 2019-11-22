// Function to contain all other functions
function initiatePlanner() {

    // Get current date and time
    // -- Homework calls for getting this using Moment.js
    function currentDateHour() {
        // All moment() and format() is coming from Moment.js library
        
        // Gets current time and date from Moment.js. Moment returns an object full of all the necessary required information.
        const momentObj = moment();
        // Converts the converts moment object into the correct date format. Day spelled out, Month Spelled out, and day in number format. Thursday, November 20th
        const currentDate = momentObj.format("dddd, MMMM Do");
        // const currentDate = "Wednesday, November 20th";
        // Converts the moment object into the current hour from 1-24
        const currentHour = momentObj.format("k");
        // const currentHour = "22";
        const current = {
            date: currentDate,
            hour: currentHour
        };

        // Used so that when the function is called the value it returns is the object current.
        return current;
    }
    
    // Update header to show current date
    function showCurrentDate(){
        // Recieves the object current from function currentDateHour and stores it in variable DateHour
        const DateHour = currentDateHour();
        // Gets the element that displays the day in the header of the calendar
        const currentDayEl = document.getElementById('currentDay');
        // Changes the inner text of the element that displays the day to the current day.
        currentDayEl.innerText = DateHour.date;  
    }
    // The header needs to be updated with the current day any time the page is loaded, therefore the function needs to automatically run everytime the page is loaded
    showCurrentDate();

    // Check for any previously created activities in local storage.
    // -- If they exist check to see if they are from the current day
    // -- -- If they are not, return false
    // -- -- If they are, return the acivities
    // -- If they don't exist set return false
    
    // Checks if the user has created and stored any activites previously. If user has created activities, the activities are returned.
    function checkLocalStorage(){
        // Defines a variable to store existing activities ... unsure if neccessary to define
        let existingHours = [];
        
        // If statement used to see if there are any existing activities created by the user, that were stored in local storage and if those activities are from the current date
        if(localStorage.getItem('existingHours')){
            // Gets existingHours, which is stringified, and stores it in the variable activitiesStringified
            const hoursStringified = localStorage.getItem('existingHours');
            // Transforms stringified data into an object
            existingHours = JSON.parse(hoursStringified);
            // Get date of existing data
            const existingDate = existingHours[0].date;
            // Get current date
            const currentDate = currentDateHour().date;
            // Compare current date and the date of the existing data. If they are equal, the data is used for rendering the calendar, if not the data is not used.
            if (currentDate === existingDate){
                // returns the object existingActivities, which contains any activities the user created for that date.
                return existingHours;
            }
            else{
                // This makes sure data from a previous day is not used.
                return false;
            };
        }   
            else {
                // This makes sure if there is no data, a blank array is created.
                return false;
        };
    };
    
    // Creates an array that will be used to render the calendar. If an array already exists due to activities already being created that day, function won't be ran
    function createHoursArray() {
        
        // Creates an array that will store either existing activities or a blank set of activities used to fill out the calendar
        let hours = [];
        // Creates said array
        // -- i starts at 9 and ends at 17 to create the hours 9am - 5pm
        for(let i=9; i <= 17; i++){
            // t is used as an integer of time
            // let t = i;
            // converts t into a string, switches it from 24h to 12h, and adds AM/PM
            // if(t > 11){
            //     t = t-12;
            //     t = (t.toString()+" PM");
            // }else{
            //     t = (t.toString()+" AM");
            // };
            // Creates an object for the hour
            let t = moment(i, "H").format("h:mm A");
            let singleHour = {
                date: currentDateHour().date,
                time: i,
                stringTime: t,
                activity: " "
            };
            // Adds the hour object to the array
            hours.push(singleHour);
        };
  
        // Returns array of hours, which contains an object per hour for the hours of 9AM to 5PM
        return hours;
    };

    // Render single day calendar view with a row per hour from the hours of 9 AM to 5 PM
    // -- Each day row should contain 3 columns. Col 1: the hour, Col 2: an input/display of event, and Col 3: a button with a save icon
    // -- Render colors of inputs based on hours that have passed gray, current hour white, and future hours green
    // -- Render any previously created/stored activities in the input from local storage data that was gotten.
    // Start event listener for the save button in every row
    // -- If save button clicked, save value in input and store it in local storage
    function renderCalendar(){
        
        let hours=[];
        // If hours already exist for the current date, they will be stored in the variable hours. If not, an hours array with no activities will be created.
        let check = checkLocalStorage();

        if (check){
            hours = checkLocalStorage();
        } else {
            hours = createHoursArray();
        };

        // Creates each row of the calendar
        for(i=0; i < hours.length; i++){
            // Creates a table row element
            const rowEl = document.createElement('row');
            rowEl.classList.add('row');
            // Creates one of table column elements. Time col
            const colEl1 = document.createElement('div');
            colEl1.classList.add('time-block', 'hour', 'col-2', 'p-0');
            // Creates one of table column elements. Input col
            const colEl2 = document.createElement('div');
            colEl2.classList.add('description', 'col-9', 'p-0');
            // Creates one of table column elements. Button col
            const colEl3 = document.createElement('div');
            colEl3.classList.add('button-column', 'col-1', 'p-0');
            // Creates a button that will be used to save the value of the input
            const saveButton = document.createElement('button');
            // Adds floppy save icon to buttons.
            // Flavicon used from Font Awesome
            saveButton.classList.add('far', 'fa-save', 'saveBtn');
            // Creates an input for the user to input activities to save or to display already saved activities
            const activityInput = document.createElement('input');
            activityInput.classList.add('description')
            
            // Styles inputs based on time of day. Past is gray, present is white, future is green
            if(hours[i].time < moment().add(14,'hours').format("k")){
                activityInput.classList.add('past')
            }
            if(hours[i].time === moment().add(14,'hours').format("k")){
                activityInput.classList.add('present')
            }
            if(hours[i].time > moment().add(14,'hours').format("k")){
                activityInput.classList.add('future')
            }
            
            // Creates a unique id for each input. Used later for button event listener
            activityInput.setAttribute("id","input-"+(i));
            // Creates a unique id for each button. Used later for button event listener
            saveButton.setAttribute("id", "button-"+(i));
            // updates inner text of column 1 to display the time for that row
            colEl1.innerText = hours[i].stringTime;
            // appends input to column 2
            colEl2.append(activityInput);
            // appends button to column 3
            colEl3.append(saveButton);
            // updates input value with corresponding activity for that row if any exist
            activityInput.value = hours[i].activity;
            // appends all three columns to the row
            rowEl.append(colEl1, colEl2, colEl3);
            // appends the row to the table. This eventually causes the rows to stack nicely making the complete calendar
            
            const containerEl = document.querySelector('.container');
            containerEl.append(rowEl);
            containerEl.classList.add('mx-auto')

            // When a save button is clicked, the text in the corresponding input is saved to local storage
            saveButton.addEventListener('click', function(){ 
                // Gets the id of the button clicked from the event. Replaces the text button- with input- in the string.
                const hourInput = event.target.id.replace('button-','input-');
                
                // Gets the id of the button clicked from the event. Removes the text button- in the string.
                const hoursIndex = event.target.id.replace('button-','');

                // Updates the activity property of the array hours (the array that stores all the info for the calendar) at index hoursIndex with the value of the corresponding input
                hours[hoursIndex].activity = document.getElementById(hourInput).value;
                
                // Stringifies the array that contains all the info for the calendar
                const hoursStringified = JSON.stringify(hours); 
                
                // Updates the local storage with the array that contains all of the calendar info
                localStorage.setItem('existingHours', hoursStringified);

            });
        };
    };
    renderCalendar();

    function hourFormatSwitch(){
        let hourSwitchbtnEl = document.getElementById('hour-switch');
        
        hourSwitchbtnEl.addEventListener('click', function(){
            
            console.log('switch button clicked',hourSwitchbtnEl.innerText);
            const timeArray = createHoursArray();
            if(hourSwitchbtnEl.innerText === "24H"){
                
                hourSwitchbtnEl.innerText = "12H";
                const hourTexts = document.querySelectorAll(".hour");
                
                for(let i=0; i < timeArray.length; i++){
                    hTime = timeArray[i].time;
                    // Help from tutor on how to use moment to convert time. Struggled to find in documentation.
                    hhTime = moment(hTime, "H").format("HHmm");
                    hourTexts[i].innerText = hhTime;

                }

            } else {
                hourSwitchbtnEl.innerText = "24H";
                const hourTexts = document.querySelectorAll(".hour");
               
                for(let i=0; i < timeArray.length; i++){
                    backTime = timeArray[i].stringTime;
                    // Help from tutor on how to use moment to convert time. Struggled to find in documentation.
                    hourTexts[i].innerText = backTime;

                }
            }; 
        });
    }
    hourFormatSwitch();
};
initiatePlanner();