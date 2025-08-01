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

    // Set the src and alt attribute of the img element using template literal (for src concat.) and array look-up.
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', altText[image]);

    // Adds new img to the thumb bar.
    thumbBar.appendChild(newImage);


}



/* Wiring up the Darken/Lighten button */
