//Everything in this file is my own work

document.addEventListener("DOMContentLoaded", async () => { //Had to make it all async, to make the removal of the loading screen await data fetching and rendering

    //Selecting DOM-element to use later in the code
    const loadDots = document.querySelector("#loading-index");

    async function getGitHubData() {
        try {
            //Selecting the card wrapping div 
            const cardWrapper = document.querySelector(".card-wrapper");

            //Fetching data from github 
            const response = await fetch("https://api.github.com/users/linneatoth/repos");
            const gitHubData = await response.json();

            //Creation of project cards
            for (let i = gitHubData.length - 1; i >= gitHubData.length - 4; i--) { //looping backwards to make the four latest added repos appear first

                //Text content 
                const description = gitHubData[i].description; //Description from github
                const breakPoint = description.indexOf("|") // In my repo, I have separated the intended heading from description with a | character
                const heading = document.createElement("h3");
                heading.innerText = description.slice(0, breakPoint);

                //Creating the card itself
                const card = document.createElement("article");
                card.classList.add("project-card");
                const thumbnailURL = `https://raw.githubusercontent.com/LinneaToth/${gitHubData[i].name}/refs/heads/main/thumbnail.jpg`; //getting the needed image URL
                card.style.backgroundImage = `url(${thumbnailURL})`; //adding the project thumbnail as background image


                //Creating the "see more" link
                const link = document.createElement("a");
                link.href = `./portfolio.html#${gitHubData[i].id}`;
                const seeMore = document.createElement("p");
                seeMore.innerText = ">> see more";

                //Putting it all together and placing it on the page! 
                link.appendChild(seeMore);
                card.appendChild(heading);
                card.appendChild(link);
                cardWrapper.appendChild(card);

            }

        } catch (error) {
            console.log(error);
        }
    }

    await getGitHubData(); //The removal of loading dots needs to await content from GitHub

    loadDots.remove(); //Removes the loading screen

})

