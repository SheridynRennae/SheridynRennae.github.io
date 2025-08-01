/*
Name: Sheridyn Sharpe
File: main.js
Date: 25 July 2025
A JavaScript file for reference to index.html, the image gallery.
*/

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = [
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg",
]

/* Declaring the alternative text for each image file */
const altText = {
    "pic1.jpg": "A close up shot of a human eye.",
    "pic2.jpg": "A pastel painting of a wave of the sea.",
    "pic3.jpg": "A collection of white and purple flowers.",
    "pic4.jpg": "An ancient Egyptian cave marking.",
    "pic5.jpg": "A brown moth resting on a leaf."    
}

/* Looping through images */
for (const image of images) {
    const newImage = document.createElement('img');

    // Set the src attribute to point to the images directory using template literal.
    newImage.setAttribute('src', `images/${image}`);
    // Set the alt attribute using the altText object's descriptions.
    newImage.setAttribute('alt', altText[image]);

    // Adds new img to the thumb bar.
    thumbBar.appendChild(newImage);

    // Add a click event listener to the thumbnail images, setting src and alt attributes when clicked.
    newImage.addEventListener("click", (event) => {
        displayedImage.src = event.target.src;
        displayedImage.alt = event.target.alt;
    });
}



/* Wiring up the Darken/Lighten button */
