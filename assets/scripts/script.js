// Function to contain all other functions
function initiatePlanner() {

    // Get current date and time
    // -- Homework calls for getting this using Moment.js
    function currentDateHour() {
        // All moment() and format() is coming from Moment.js library
        
        // Gets current time and date from Moment.js. Moment returns an object full of all the necessary required information.
        // const momentObj = moment();
        // Converts the converts moment object into the correct date format. Day spelled out, Month Spelled out, and day in number format. Thursday, November 20th
        // const currentDate = momentObj.format("dddd, MMMM Do");
        const currentDate = "Wednesday, November 20th";
        // Converts the moment object into the current hour from 1-24
        // const currentHour = momentObj.format("k");
        const currentHour = "22";
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
    
    // Create fake local storage for testing purposes
    function createFakeLocalStorage() {   
        // Creates an object similar to what I expect I will create when the user creates an activity
        let existingHoursObj = [
            {
                date: "Wednesday, November 20th",
                hour: "9",
                activity: "Crush it!"
            },
            {
                date: "Wednesday, November 20th",
                hour: "11",
                activity: "Keep Crushing it!"
            }
        ];
        // Turns object into a string so it can be stored in local storage
        const existingActivitiesJSON = JSON.stringify(existingActivitiesObj);
        // Stores stringified existing activities object in local storage
        window.localStorage.setItem('existingHours', existingActivitiesJSON);
    }
    // createFakeLocalStorage();
    
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
                return false;
            };
        }   
            else {
                console.log("No existing activities"); 
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
            let t = i;
            // converts t into a string, switches it from 24h to 12h, and adds AM/PM
            if(t > 12){
                t = t-12;
                t = (t.toString()+" PM");
            }else{
                t = (t.toString()+" AM");
            };
            
            let singleHour = {
                date: currentDateHour().date,
                time: i,
                stringTime: t,
                activity: ""
            };
            hours.push(singleHour);
        };
        console.log(hours);
        return hours;
    };
    
    // Render single day calendar view with a row per hour from the hours of 9 AM to 5 PM
    // -- Each day row should contain 3 columns. Col 1: the hour, Col 2: an input/display of event, and Col 3: a button with a save icon
    // -- Render current col 2 in row of hours that have passed gray, current hour red, and future hours green
    // -- Render any previously created/stored events from local storage data that was gotten.
    // Start event listener for the save button in every row
    // -- If save button clicked, save value in input and store it in local storage
    // -- Will probably have to make the default text of the input change to the inputted text to make it visible if the page is refreshed
    function renderCalendar(){
        let hours=[];
        // If hours already exist for the current date, they will be stored in the variable hours. If not, an hours array with no activities will be created.
        let check = checkLocalStorage();
        if (check){
            console.log("local storage");
            hours = checkLocalStorage;
        } else {
            console.log("Create Hours");
            hours = createHoursArray();
        };

        
        // console.log(rowEl, colEl1, saveButton, activityInput);
        for(i=0; i < hours.length; i++){
            const rowEl = document.createElement('tr');
            const colEl1 = document.createElement('td');
            const colEl2 = document.createElement('td');
            const colEl3 = document.createElement('td');
            const saveButton = document.createElement('button');
            const activityInput = document.createElement('input');
            colEl2.append(activityInput);
            colEl3.append(saveButton);
            colEl1.innerText = hours[i].stringTime;
            activityInput.value = hours[i].activity;
            rowEl.append(colEl1, colEl2, colEl3);
            document.body.append(rowEl);
        }
            
        
    };
    renderCalendar();

}
initiatePlanner();