'use strict';

import './navigation+tab.js';

const fetchAndProcessHTML = async (url, processData, data) => {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    processData(data, doc);
};
  
const loadData = async () => {
    const response = await fetch('../data.json');
    const data = await response.json();

    // Fetch and process destination.html
    fetchAndProcessHTML('../html/destination.html', load_DestinationEle, data);

    // Fetch and process crew.html
    fetchAndProcessHTML('../html/crew.html', load_CrewEle, data);

    // Fetch and process technology.html
    fetchAndProcessHTML('../html/technology.html', load_TechEle, data);
};

function load_DestinationEle(data, doc) {
    // Access elements within the parsed document
    if ('content' in doc.createElement('template')) {
        const d_ImagesTemplate = doc.querySelector('#destination-images');
        const d_ArticleTemplate = doc.querySelector('#destination-articles');

        // Loop through each destination and create an element for it
        data.destinations.forEach((destination, index) => {
            const cloneImg = d_ImagesTemplate.content.cloneNode(true);
            const cloneArt = d_ArticleTemplate.content.cloneNode(true);

            let d_PictureEle = cloneImg.querySelector('picture');
            d_PictureEle.id = `${destination.name.toLowerCase()}-image`;

            let d_ArticleEle = cloneArt.querySelector('article');
            d_ArticleEle.id = `${destination.name.toLowerCase()}-tab`;

            if (index >= 1 && index <= 3) { //initial condition
                d_PictureEle.setAttribute('hidden', '');
                d_ArticleEle.setAttribute('hidden', '');
            }

            d_PictureEle.innerHTML = `
                <source srcset="../assets/destination/image-${destination.name.toLowerCase()}.webp" type="image/webp">
                <img src="../assets/destination/image-${destination.name.toLowerCase()}.png" alt="the ${destination.name.toLowerCase()}">
            `;

            d_ArticleEle.innerHTML = `
                <h2 class="fs-800 uppercase ff-serif">${destination.name}</h2>
                <p>${destination.description}</p>
                <div class="destination-meta flex">
                    <div>
                        <h3 class="text-accent fs-200 uppercase">Avg. distance</h3>
                        <p class="ff-serif uppercase">${destination.distance}</p>
                    </div>
                    <div>
                        <h3 class="text-accent fs-200 uppercase">Est. travel time</h3>
                        <p class="ff-serif uppercase">${destination.travel}</p>
                    </div>
                </div>
            `;

            let tabListEle = document.querySelector('.tab-list');
            let parentDiv = tabListEle.parentNode; // which is the main tag
            parentDiv.insertBefore(d_PictureEle, tabListEle);
            parentDiv.appendChild(d_ArticleEle);
        });
    }
}


function load_CrewEle(data, doc) {
    // Access elements within the parsed document
    if ('content' in doc.createElement('template')) {
        const c_ImagesTemplate = doc.querySelector('#crew-images');
        const c_ArticleTemplate = doc.querySelector('#crew-articles');

        // Loop through each crew and create an element for it
        data.crew.forEach((crewMember, index) => {
            const cloneImg = c_ImagesTemplate.content.cloneNode(true);
            const cloneArt = c_ArticleTemplate.content.cloneNode(true);

            let c_PictureEle = cloneImg.querySelector('picture');
            c_PictureEle.id = `${crewMember.role.toLowerCase().split(' ')[0]}-image`;

            let c_ArticleEle = cloneArt.querySelector('article');
            c_ArticleEle.id = `${crewMember.role.toLowerCase().split(' ')[0]}-tab`;

            if (index >= 1 && index <= 3) { //initial condition
                c_PictureEle.setAttribute('hidden', '');
                c_ArticleEle.setAttribute('hidden', '');
            }

            c_PictureEle.innerHTML = `
                <source srcset="../assets/crew/image-${crewMember.name.toLowerCase().replace(' ', '-')}.webp" type="image/webp">
                <img src="../assets/crew/image-${crewMember.name.toLowerCase().replace(' ', '-')}.png" alt="${crewMember.name}">
            `;

            c_ArticleEle.innerHTML = `
                <header class="flow flow--space-small">
                    <h2 class="fs-600 ff-serif uppercase">${crewMember.role}</h2>
                    <p class="fs-700 uppercase ff-serif">${crewMember.name}</p>
                </header>
                <p>${crewMember.bio}</p>
            `;

            let dotIndicatorsEle = document.querySelector('.dot-indicators');
            let parentDiv = dotIndicatorsEle.parentNode; // which is the main tag
            parentDiv.appendChild(c_PictureEle);
            parentDiv.appendChild(c_ArticleEle);
        });
    }
}


function load_TechEle(data, doc) {
     // Access elements within the parsed document
     if ('content' in doc.createElement('template')) {
        const t_ImagesTemplate = doc.querySelector('#tech-images');
        const t_ArticleTemplate = doc.querySelector('#tech-articles');

        // Loop through each tech and create an element for it
        data.technology.forEach((tech, index) => {
            const cloneImg = t_ImagesTemplate.content.cloneNode(true);
            const cloneArt = t_ArticleTemplate.content.cloneNode(true);

            let t_PictureEle = cloneImg.querySelector('picture');
            let t_ArticleEle = cloneArt.querySelector('article');
            
            if (index >= 1 && index <= 3) { //initial condition
                t_PictureEle.setAttribute('hidden', '');
                t_ArticleEle.setAttribute('hidden', '');
            }

            t_PictureEle.id = `${tech.name.toLowerCase().replace(' ', '-')}-image`;
            t_ArticleEle.id = `${tech.name.toLowerCase().replace(' ', '-')}-tab`;

            t_PictureEle.innerHTML = `
                <img class="tech-image-portrait" src=".${tech.images.portrait}" alt="${tech.name}">
                <img class="tech-image-landscape" src=".${tech.images.landscape}" alt="${tech.name}">
            `;

            t_ArticleEle.innerHTML = `
                <header class="flow flow--space-small">
                    <h2 class="fs-400 ff-sans-cond uppercase letter-spacing-2">The terminology</h2>
                    <p class="fs-700 uppercase ff-serif">${tech.name}</p>
                </header>
                <p>${tech.description}</p>
            `;

            let numIndicatorsEle = document.querySelector('.number-indicators');
            let parentDiv = numIndicatorsEle.parentNode; // which is the main tag
            parentDiv.appendChild(t_PictureEle);
            parentDiv.appendChild(t_ArticleEle);
        });
    }
}


// Fetch data on page load
document.addEventListener('DOMContentLoaded', loadData);