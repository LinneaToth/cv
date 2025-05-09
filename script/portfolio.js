//Unless otherwise stated, the code in this file is written by me. One criteria for this assignment was to paste somebody elses code to the project to add functinoality to the site. I have added a slider below. 

document.addEventListener("DOMContentLoaded", async () => { //Had to make it all async, to make the slider code wait for github import

    //Selecting DOM-elements to use later in the code
    const mainContainer = document.querySelector(".carousel");
    const loadDots = document.querySelector("#loading");

    //Massive function that gets data from github and turns it into project cards on the portfolio page
    async function getGitHubData() {
        try {
            const response = await fetch("https://api.github.com/users/linneatoth/repos?sort=created&direction=desc"); //query added to get the latest repos first
            const gitHubData = await response.json();

            //Looping through all of the repos to create cards for each
            for (let i = 0; i < gitHubData.length; i++) {
                if (gitHubData[i].topics.includes("nofolio")) {
                    continue;
                }

                const id = gitHubData[i].id; //Repo ID
                const name = gitHubData[i].name; //Repo name

                //PROJECT CARD 
                const portfolioItem = document.createElement("div"); //creates the container for each card
                portfolioItem.id = id;
                portfolioItem.classList.add("portfolio-item");

                //PROJECT IMAGE
                const thumbnailURL = `https://raw.githubusercontent.com/LinneaToth/${gitHubData[i].name}/refs/heads/main/thumbnail.jpg`; //Project image URL
                const thumbnailImg = document.createElement("img"); // creates the image for each card
                thumbnailImg.src = thumbnailURL;
                thumbnailImg.alt = `Thumbnail image for ${name}`

                //PROJECT SPECIFIK LINKS FROM EACH CARD
                const linkContainer = document.createElement("div"); //div container with links for each project
                linkContainer.classList.add("linkContainer");
                const links = {}; //creates an object containing different links for each repo
                links.repo = `https://github.com/LinneaToth/${gitHubData[i].name}`;
                links.live = `https://linneatoth.github.io/${gitHubData[i].name}`;
                links.code = `https://github.dev/LinneaToth/${gitHubData[i].name}`;

                //Looping through the properties in the links object, typing out the links that go in the card
                for (const link in links) {
                    let anchorTag = document.createElement("a");
                    anchorTag.href = links[link];
                    anchorTag.innerText = ">> " + link;
                    linkContainer.appendChild(anchorTag);
                }

                //TECHNOLOGY ICONS
                //Returns an array with the topics I have entered for each repo
                const topics = gitHubData[i].topics;

                //Variables for icons representing different technologies,two classes are needed for these fontawesome icons; that is what is represented in the arrays
                const htmlIcon = ["fa-brands", "fa-html5"]
                const cssIcon = ["fa-brands", "fa-css"]
                const jsIcon = ["fa-brands", "fa-square-js"]
                const sassIcon = ["fa-brands", "fa-sass"]
                const reactIcon = ["fa-brands", "fa-react"]
                const apiIcon = ["fa-solid", "fa-server"]
                const twIcon = ["fa-solid", "fa-t"]

                //Creating container div for the icons
                const iconContainer = document.createElement("div");
                iconContainer.classList.add("iconContainer");

                //Function to make sure the correct icon is displayed for each of the items in the topics array
                topics.forEach((topic) => {
                    let icon = "";
                    if (topic === "css") {
                        icon = cssIcon;
                    } else if (topic === "html5") {
                        icon = htmlIcon;
                    } else if (topic === "javascript") {
                        icon = jsIcon;
                    } else if (topic === "sass") {
                        icon = sassIcon;
                    } else if (topic === "react") {
                        icon = reactIcon;
                    } else if (topic === "api") {
                        icon = apiIcon;
                    } else if (topic === "tailwind") {
                        icon = twIcon;
                    } else {
                        return; //Skip unrecognized topics
                    }
                    const iconElement = document.createElement("i");
                    //Looping through the icon arrays a couple of lines above, since Font Awesome require not one but several classes to procure an icon
                    icon.forEach((cl) => {
                        iconElement.classList.add(cl);
                        iconElement.title = topic;
                    })
                    iconContainer.appendChild(iconElement);
                })

                //CARD TEXT
                //Creating the different elements needed for the text part of each card
                const textSection = document.createElement("section");
                const heading = document.createElement("h3");
                const paragraph = document.createElement("p");
                paragraph.classList.add("descriptiveText");

                //Dealing with the text from github
                const description = gitHubData[i].description;

                // In my repo, I have separated the intended heading from description with a | character. That's where I divide the string into heading and paragraph. 
                const breakPoint = description.indexOf("|")
                heading.innerText = description.slice(0, breakPoint);
                paragraph.innerText = description.slice(breakPoint + 1);

                //PUTTING IT ALL TOGETHER AND POSTING IT ON THE PAGE
                textSection.appendChild(linkContainer);
                textSection.appendChild(iconContainer);
                textSection.appendChild(heading);
                textSection.appendChild(paragraph);

                portfolioItem.appendChild(thumbnailImg);
                portfolioItem.appendChild(textSection);

                mainContainer.appendChild(portfolioItem);

            }

        } catch (error) {
            console.log(error.message);
        }
    }

    await getGitHubData() // the rest of the code needs to wait for this to be completed

    // *****************************************************************************************************
    //One requirement for this task was to find and paste somebody elses code. BELOW is an image slider, which I did NOT write myself. Source: https://www.codingnepalweb.com/draggable-image-slider-html-css-javascript/

    // Select elements
    const carousel = document.querySelector(".carousel");
    const firstImage = carousel.querySelector(".portfolio-item");
    const arrowIcons = document.querySelectorAll(".arrowIcon");

    // Helper function to smoothly scroll the carousel
    const scrollCarousel = (direction) => {
        const cardWidth = firstImage.clientWidth + 14; // Image width + margin
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
        carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);
        // toggleArrowIcons();
    };
    // Event listeners for arrows
    arrowIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            const direction = icon.id === "right" ? "right" : "left";
            scrollCarousel(direction);
        });
    });
    // Automatic adjustment after dragging
    const autoCenterImage = () => {
        const cardWidth = firstImage.clientWidth + 14;
        const offset = carousel.scrollLeft % cardWidth;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        if (carousel.scrollLeft > 0 && carousel.scrollLeft < maxScroll) {
            if (offset > cardWidth / 3) {
                carousel.scrollLeft += cardWidth - offset; // Snap to the next image
            } else {
                carousel.scrollLeft -= offset; // Snap to the previous image
            }
        }
        // toggleArrowIcons();
    };

    //End of pasted code. One requirement for this task was to find and paste somebody elses code. ABOVE is an image slider, which I did NOT write myself. Source: https://www.codingnepalweb.com/draggable-image-slider-html-css-javascript/
    // *****************************************************************************************************

    loadDots.remove(); //removes the loading info when all is loaded. 

});
