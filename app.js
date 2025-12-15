'use strict';

// -----------------------------------------------------------
// 🎯 Part 1: GLOBAL VARIABLE & REGEX PATTERN
// -----------------------------------------------------------
let userName = ''; 
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

// -----------------------------------------------------------
// 🎯 Part 2: INITIAL GREETING AND TIME LOGIC (NO CHANGES)
// -----------------------------------------------------------

function initializeGreeting() {
    // ... (Your existing code for greeting and time) ...
    console.log('hey from my external sheet!');

    alert('Welcome to my page');
    alert('Nice to have you here');

    // 1. Get User Name (Pop-up sequence)
    userName = prompt('What is your name?'); 
    
    // 🛑 Confirmation check has been REMOVED as requested.

    console.log("User Name: " + userName);
    console.log('Welcome ' + userName + '!');

    // 2. Get Time and Check
    let time = parseInt(prompt('What hour is it? (0-23))')); 
    let message;

    if(time <= 11) {
        message = 'Good Morning!';
    } else if (time <= 18) {
        message = 'Good Afternoon!';
    } else if (time < 24) {
        message = 'Good Evening!';
    } else {
        message = " Whoa! That hour doesn't exist on Earth."; 
    }

    // 3. Output the greeting to the NEW HEADER ELEMENT
    const outputElement = document.getElementById('header-greeting'); // 🎯 TARGETING NEW ID
    if (outputElement) {
        outputElement.textContent = 'Hello ' + userName + '! ' + message;
    }
}


// -----------------------------------------------------------
// 🎯 Part 3: SUBSCRIPTION FORM LOGIC
// -----------------------------------------------------------

function setupSubscriptionForm() {
    const formElement = document.getElementById('subscription-form-container');
    const subscribeButton = document.getElementById('subscribe-btn');
    const emailInput = document.getElementById('userEmail');
    const errorMessage = document.getElementById('emailError'); // 🎯 Get the error element here!

    // Visually Reveal the Form (The Fade-in)
    formElement.classList.remove('form-hidden');
    formElement.classList.add('form-visible'); 

    // 1. 🎯 Attach the real-time validation listener, passing the error element
    //    We use an arrow function here to ensure emailInput and errorMessage are available
    emailInput.addEventListener('input', () => {
        runRealTimeValidation(emailInput, errorMessage);
    });
    
    // 2. Attach the click handler to the button
    subscribeButton.addEventListener('click', processSubscription);
}

// 🎯 UPDATED FUNCTION SIGNATURE: Takes the elements as arguments
function runRealTimeValidation(emailInput, errorMessage) {
    
    // The browser's built-in HTML5 validation handles the required field check.
    // This function focuses purely on the pattern check.
    if (EMAIL_PATTERN.test(emailInput.value)) {
        // Valid: Clear browser error and custom message
        emailInput.setCustomValidity(''); 
        errorMessage.textContent = '';
        errorMessage.style.color = ''; // Remove any explicit color
    } else {
        // Invalid: Set browser error and custom message
        const message = 'Please enter a valid email address (e.g., user@domain.com)';
        emailInput.setCustomValidity(message); 
        errorMessage.textContent = message;
        errorMessage.style.color = 'red'; // Set color for custom error
    }
}


function processSubscription(event) {
    // 🛑 Prevent the default form submission (page refresh)
    event.preventDefault(); 
    
    const emailInput = document.getElementById('userEmail');
    const email = emailInput.value; 
    const outputArea = document.getElementById('sub-message-output');
    
    // 1. CLEAR previous messages immediately upon click
    outputArea.textContent = '';
    outputArea.style.color = '';
    
    // 2. 🎯 FINAL VALIDATION CHECK
    if (!email || !EMAIL_PATTERN.test(email)) {
        // Validation FAILED (Either empty or bad format)
        outputArea.textContent = "Please enter a valid email address (e.g., user@domain.com)";
        outputArea.style.color = 'red';
        
        // Ensure the browser's native error message is visible too
        emailInput.reportValidity(); 
        
        return; // Stop the function here, do not proceed to confirmation
    }
    
    // 3. Validation PASSED: Proceed to Confirmation
    let confirmSubscribe = confirm("Please confirm: Subscribe " + email + " to the newsletter?");
    
    if (confirmSubscribe) {
        // Subscription ACCEPTED
        let successMessage = "Thank thank you for subscribing " + userName + "! Check your inbox at " + email + " for your free gift.";
        
        // 🎯 Set the SUCCESS message
        outputArea.textContent = successMessage;
        outputArea.style.color = 'green';
        
        // Clear the input field
        emailInput.value = ''; 
    } else {
        // Subscription CANCELED
        outputArea.textContent = 'Subscription canceled by user.';
        outputArea.style.color = 'orange';
    }
}

// -----------------------------------------------------------
// 🎯 Part 4: EXECUTION BLOCK (NO CHANGES)
// -----------------------------------------------------------

// 1. Run the initial pop-ups and greeting immediately
initializeGreeting();

// 2. Start the form fade-in process after 3 seconds
setTimeout(setupSubscriptionForm, 3000);