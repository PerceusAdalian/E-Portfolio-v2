// Checks
console.log("App Status -- OK");

// Variables
const toggleMode = document.querySelector('.mode-toggle');

// Functions
toggleMode.addEventListener('click', () =>
{
    document.body.classList.toggle('dark-mode');
});

