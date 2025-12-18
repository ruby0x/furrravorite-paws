'use strict'; // Tells the browser: "Be strict! If I make a typo, tell me immediately."

// -----------------------------------------------------------
// 🎯 Part 1: THE GLOBAL TOOLS
// -----------------------------------------------------------

// A "bucket" to hold the user's name so we can use it in different functions later.
let userName = ''; 

// A pattern that checks if a string looks like a real email (it must have @ and a dot).
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

// -----------------------------------------------------------
// 🎯 Part 2: THE GREETING
// -----------------------------------------------------------

function initializeGreeting() { 
    // Show a simple pop-up box when the page first loads.
    alert('Welcome to my page!\nNice to have you here.');

    // Ask the user for their name and save it in our "userName" bucket.
    userName = prompt('What is your name?'); 
    
    // Ask for the hour and convert the text they type into a real number.
    let time = parseInt(prompt('What hour is it? (0-23)')); 

    // If they typed something that isn't a number, or a number like 99...
    if (isNaN(time) || time < 0 || time > 23) {
        alert("Whoa! That hour doesn't exist on Earth."); 
        // Give them one more chance.
        time = parseInt(prompt('Please try again. Enter a number between 0 and 23:'));
    }

    // Create a variable to hold our "Morning/Afternoon" message.
    let timeMessage; 
    
    if (time <= 11) { 
        timeMessage = 'Good Morning'; 
    } else if (time <= 18) { 
        timeMessage = 'Good Afternoon'; 
    } else if (time < 24) { 
        timeMessage = 'Good Evening'; 
    } else { 
        timeMessage = "Have a great day"; 
    }

    // Find the spots in the HTML where we want to write the greeting.
    const outputElement = document.getElementById('header-greeting'); 
    const greetingContainer = document.getElementById('greeting-container');
    
    if (outputElement) { 
        // Check if the user entered a name. If not, just use "Welcome!"
        let welcomePart = (userName && userName !== "null" && userName.trim() !== "") 
            ? 'Welcome ' + userName + '! ' 
            : 'Welcome! '; 
        
        outputElement.textContent = welcomePart + timeMessage; 
        
        if (greetingContainer) {
            greetingContainer.style.display = 'block';
        }
    }
}

// -----------------------------------------------------------
// 🎯 Part 3: SETTING UP THE FORM
// -----------------------------------------------------------

function setupSubscriptionForm() { 
    const formElement = document.getElementById('subscription-form-container'); 
    const subscribeButton = document.getElementById('subscribe-btn'); 
    const emailInput = document.getElementById('userEmail'); 
    const errorMessage = document.getElementById('emailError'); 

    // If the form exists, make it visible by switching its CSS class.
    if (formElement) {
        formElement.classList.remove('form-hidden'); 
        formElement.classList.add('form-visible'); 
    }

    // Listen to the user typing. Every time they press a key, check the email.
    emailInput.addEventListener('input', () => {
        runRealTimeValidation(emailInput, errorMessage);
    });
    
    // Listen for when they click the "Subscribe" button.
    subscribeButton.addEventListener('click', processSubscription);
}

// -----------------------------------------------------------
// 🎯 Part 4: CHECKING THE EMAIL
// -----------------------------------------------------------

function runRealTimeValidation(emailInput, errorMessage) { 
    if (EMAIL_PATTERN.test(emailInput.value)) { 
        emailInput.setCustomValidity(''); 
        errorMessage.textContent = ''; 
    } else {
        const message = 'Please enter a valid email address.';
        emailInput.setCustomValidity(message); 
        errorMessage.textContent = message; 
        errorMessage.style.color = 'red'; 
    }
}

function processSubscription(event) {
    // Stop the page from refreshing when the button is clicked.
    event.preventDefault(); 
    
    const emailInput = document.getElementById('userEmail');
    const email = emailInput.value; 
    const outputArea = document.getElementById('sub-message-output'); 
    
    outputArea.textContent = ''; 
    
    if (!email || !EMAIL_PATTERN.test(email)) { 
        outputArea.textContent = "Please enter a valid email address.";
        outputArea.style.color = 'red';
        emailInput.reportValidity(); 
        return; 
    }
    
    let confirmSubscribe = confirm("Subscribe " + email + "?"); 
    
    if (confirmSubscribe) { 
        outputArea.textContent = "Thank you " + (userName || "Friend") + "!";
        outputArea.style.color = 'green';
        emailInput.value = ''; 
    } else { 
        outputArea.textContent = 'Subscription canceled.';
        outputArea.style.color = 'orange';
    }
}

// -----------------------------------------------------------
// 🎯 Part 5: THE GUESSING GAME
// -----------------------------------------------------------

function playGuessingGame() {
    const targetNumber = Math.floor(Math.random() * 10) + 1; 
    let userGuess = 0; 
    let attempts = 0; 

    while (userGuess !== targetNumber) {
        userGuess = parseInt(prompt("GUESS THE NUMBER: 1 to 10. What is it?"));

        if (isNaN(userGuess)) {
            alert("Game exited.");
            break; 
        }

        attempts++; 

        if (userGuess < targetNumber) {
            alert("Too low!"); 
        } else if (userGuess > targetNumber) {
            alert("Too high!"); 
        } else {
            alert("CORRECT! It took you " + attempts + " tries.");
        }
    } 
}

// -----------------------------------------------------------
// 🎯 Part 6: CHANGING BUTTON COLORS
// -----------------------------------------------------------

function pickButtonColor() {
    let userColor = prompt("What is your favorite color for the subscribe button?");

    if (!userColor) return; 

    // This creates a "invisible" test to see if the browser understands the color name.
    let s = new Option().style;
    s.color = userColor;

    if (s.color !== "") {
        const subBtn = document.getElementById('subscribe-btn');
        if (subBtn) {
            subBtn.style.backgroundColor = userColor; 
            subBtn.style.color = "white"; 
        }
    } else {
        alert("I don't know that color!");
    }
}

// -----------------------------------------------------------
// 🎯 Part 7: THE NAVIGATION MENU (CLEANED UP)
// -----------------------------------------------------------

function setupGlobalMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    // We only select the links inside the nav to close the menu when clicked.
    const navLinks = document.querySelectorAll('.main-nav a');

    if (hamburger && navMenu) {
        // Toggle the menu open/closed when clicking the hamburger icon.
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // When a link is clicked, we hide the menu.
                // We don't need to manually reset "blur" anymore because we removed it!
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// -----------------------------------------------------------
// 🎯 Part 8: THE "BACK TO TOP" BUTTON
// -----------------------------------------------------------

function setupBackToTop() {
    const topBtn = document.getElementById("backToTop");

    window.onscroll = function() {
        // If the user scrolls down more than 300 pixels, show the button.
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block"; 
        } else {
            topBtn.style.display = "none"; 
        }
    };

    topBtn.onclick = function() {
        // Scroll back to X: 0, Y: 0 smoothly.
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

// -----------------------------------------------------------
// 🎯 Part 8.5: AUTOMATIC YEAR UPDATER
// -----------------------------------------------------------

function updateCopyrightYear() {
    // 1. Find the span we created in the HTML.
    const yearElement = document.getElementById('current-year');
    
    // 2. Ask the computer for the current date and pull out just the year.
    const currentYear = new Date().getFullYear();
    
    // 3. If we found the element, put the year inside it.
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}
// -----------------------------------------------------------
// 🎯 Part 9: THE ON SWITCHES
// -----------------------------------------------------------

// This triggers all the functions above when the script loads.
initializeGreeting();
playGuessingGame();
setupSubscriptionForm();
pickButtonColor();
setupBackToTop();
setupGlobalMenu();
updateCopyrightYear();