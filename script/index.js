//Everything in this file is written by me

document.addEventListener("DOMContentLoaded", async () => {

    const loadDots = document.querySelector("#loading-index");

    async function getGitHubData() {
        try {
            const cardWrapper = document.querySelector(".card-wrapper");
            const response = await fetch("https://api.github.com/users/linneatoth/repos");
            const gitHubData = await response.json();


            for (let i = gitHubData.length - 1; i >= gitHubData.length - 4; i--) { //looping backwards to make the newest repos appear first
                const card = document.createElement("article");
                const description = gitHubData[i].description;
                const thumbnailURL = `https://raw.githubusercontent.com/LinneaToth/${gitHubData[i].name}/refs/heads/main/thumbnail.png`;
                card.classList.add("project-card");

                const heading = document.createElement("h3");
                const breakPoint = description.indexOf("|") // In my repo, I have separated the intended heading from description with a | character
                heading.innerText = description.slice(0, breakPoint);

                const link = document.createElement("a");
                link.href = `./portfolio.html#${gitHubData[i].id}`;

                const seeMore = document.createElement("p");
                seeMore.innerText = ">> see more";

                link.appendChild(seeMore);

                card.style.backgroundImage = `url(${thumbnailURL})`;
                card.appendChild(heading);
                card.appendChild(link);
                cardWrapper.appendChild(card);

            }

        } catch (error) {
            console.log(error);
        }
    }

    await getGitHubData(); //The removal of loading dots needs to await content from GitHub

    loadDots.remove();

})
