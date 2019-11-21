// Function to contain all other functions
function initiatePlanner() {

    // Get current date and time
    // -- Homework calls for getting this using Moment.js
    function currentDateTime() {
        const UNIXdate = moment();
        console.log("Date gotten from Moment.js: "+ UNIXdate);
        const formattedDate = UNIXdate.format("dddd, MMMM Do");
        console.log("UNIX date formatted using Moment.js: "+formattedDate);
    }
    currentDateTime(); 
    
    // Check for any previously created events in local storage.
    // -- If they exist store in array
    // -- If they don't exist set array equal to an empty array
    // Update header to show current date
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