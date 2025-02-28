document.addEventListener("DOMContentLoaded", async () => { //Had to make it all async, to make the slider code wait for github import

    const mainContainer = document.querySelector(".carousel");

    async function getGitHubData() {
        try {
            const response = await fetch("https://api.github.com/users/linneatoth/repos");
            const gitHubData = await response.json();
            console.log(gitHubData);
            //Do something with the data here!!

            for (let i = gitHubData.length - 1; i >= 0; i--) { //looping backwards to make the newest repos appear first
                const thumbnailURL = `https://raw.githubusercontent.com/LinneaToth/${gitHubData[i].name}/refs/heads/main/thumbnail.png`;

                const description = gitHubData[i].description;
                console.log(description);
                const id = gitHubData[i].id;
                const name = gitHubData[i].name;

                const portfolioItem = document.createElement("div");
                portfolioItem.draggable = "false";
                portfolioItem.id = id;
                portfolioItem.classList.add("portfolio-item");

                const thumbnailImg = document.createElement("img");
                thumbnailImg.src = thumbnailURL;
                thumbnailImg.alt = `Thumbnail image for ${name}`

                const textSection = document.createElement("section");
                const heading = document.createElement("h3");
                const paragraph = document.createElement("p");
                paragraph.classList.add("descriptiveText");

                const breakPoint = description.indexOf("|") // In my repo, I have separated the intended heading from description with a | character
                console.log(breakPoint);

                heading.innerText = description.slice(0, breakPoint);
                paragraph.innerText = description.slice(breakPoint + 1);

                console.log(thumbnailURL + title);

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



    //One requirement for this task was to find and paste somebody elses code.BELOW is an image slider, which I didn't write myself. Source: https://www.codingnepalweb.com/draggable-image-slider-html-css-javascript/

    // Select elements

    const carousel = document.querySelector(".carousel");
    const firstImage = carousel.querySelector(".portfolio-item");
    const arrowIcons = document.querySelectorAll(".wrapper i");

    // Variables for state management
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let scrollDiff = 0;

    // Helper function to toggle arrow visibility
    const toggleArrowIcons = () => {
        setTimeout(() => {
            const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
            arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
            arrowIcons[1].style.display = Math.round(carousel.scrollLeft) >= maxScroll ? "none" : "block";
        }, 100);
    };
    // Helper function to smoothly scroll the carousel
    const scrollCarousel = (direction) => {
        const cardWidth = firstImage.clientWidth + 14; // Image width + margin
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
        carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);
        toggleArrowIcons();
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
        toggleArrowIcons();
    };
    // Dragging logic
    const startDragging = (event) => {
        isDragging = true;
        startX = event.pageX || event.touches[0].pageX;
        scrollStart = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };
    const duringDrag = (event) => {
        if (!isDragging) return;
        const currentX = event.pageX || event.touches[0].pageX;
        scrollDiff = currentX - startX;
        carousel.scrollLeft = scrollStart - scrollDiff;
    };
    const stopDragging = () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove("dragging");
        if (Math.abs(scrollDiff) > 10) {
            autoCenterImage();
        }
    };
    // Attach event listeners
    carousel.addEventListener("mousedown", startDragging);
    carousel.addEventListener("touchstart", startDragging);
    document.addEventListener("mousemove", duringDrag);
    carousel.addEventListener("touchmove", duringDrag);
    document.addEventListener("mouseup", stopDragging);
    carousel.addEventListener("touchend", stopDragging);

    // Initial setup
    toggleArrowIcons();


    //One requirement for this task was to find and paste somebody elses code. ABOVE is an image slider, which I didn't write myself. Source: https://www.codingnepalweb.com/draggable-image-slider-html-css-javascript/

});