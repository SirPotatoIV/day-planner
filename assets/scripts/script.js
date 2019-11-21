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

    // Check for any previously created events in local storage.
    // -- If they exist store in array
    // -- If they don't exist set array equal to an empty array
    
    // Create fake local storage for testing purposes
    function createFakeLocalStorage() {   
        // Creates an object similar to what I expect I will create when the user creates an activity
        let existingActivitiesObj = [
            {
                hour: "9",
                activity: "Crush it!"
            },
            {
                hour: "11",
                activity: "Keep Crushing it!"
            }
        ];
        // Turns object into a string so it can be stored in local storage
        const existingActivitiesJSON = JSON.stringify(existingActivitiesObj);
        // Stores stringified existing activities object in local storage
        window.localStorage.setItem('existingActivities', existingActivitiesJSON);
    }
    createFakeLocalStorage();
    
    function checkLocalStorage(){
        // Defines a variable to store existing activities ... unsure if neccessary to define
        let existingActivities = [];
        
        // If state used to see if there are any existing activities created by the user, that were stored in local storage
        if(localStorage.getItem('existingActivities')){
            activitiesStringified = localStorage.getItem('existingActivities');
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
            existingActivities = JSON.parse(activitiesStringified);
            console.log(existingActivities);
            return existingActivities;
        }   
            else {
                console.log("No existing activities"); 
                return false;
        };
    }
    checkLocalStorage();
    // Render single day calendar view with a row per hour from the hours of 9 AM to 5 PM
    // -- Top row should be 
    // -- Each day row should contain 3 columns. Col 1: the hour, Col 2: an input/display of event, and Col 3: a button with a save icon
    // -- Render current col 2 in row of hours that have passed gray, current hour red, and future hours green
    // -- Render any previously created/stored events from local storage data that was gotten.
    // Start event listener for the save button in every row
    // -- If save button clicked, save value in input and store it in local storage
    // -- Will probably have to make the default text of the input change to the inputted text to make it visible if the page is refreshed

}
initiatePlanner();