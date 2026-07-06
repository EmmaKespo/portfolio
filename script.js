let menuToggle = document.querySelector("#menu-toggle"); 
let menuIcon = document.querySelector("#menu-icon"); 
let navbar = document.querySelector(".navbar"); 

// Triggers execution loop upon active user event click actions
menuToggle.onclick = () => { 
    // Toggles class target references to alter CSS layout blocks
    navbar.classList.toggle("active"); 
    
    // Evaluates strings dynamically to swap presentation icons
    if (menuIcon.classList.contains('fa-bars')) { 
        menuIcon.classList.replace('fa-bars', 'fa-circle-xmark'); 
    } else { 
        menuIcon.classList.replace('fa-circle-xmark', 'fa-bars'); 
    } 
};
