
//Everything in this file is written by me

const workExperienceContainer = document.querySelector("#work-experience");
const eduExperienceContainer = document.querySelector("#edu-experience");


//Function that creates containers for the CV-page
const createContainers = (duration, title, description, type) => {
    let divDuration = document.createElement("div");
    let article = document.createElement("article");
    let heading = document.createElement("h3");
    let paragraph = document.createElement("p");
    let targetContainer = type === "work" ? workExperienceContainer : eduExperienceContainer; //Ternary operator

    article.classList.add("experience");
    divDuration.classList.add("duration");
    divDuration.innerText = duration;
    heading.innerText = title;
    paragraph.innerText = description;

    //Preps the article container with its content of title and description
    article.appendChild(heading);
    article.appendChild(paragraph);

    //adds cv item to the DOM
    targetContainer.appendChild(divDuration);
    targetContainer.appendChild(article);
}

//Loops through all of the entries and uses the createContainers-function to place them in the DOM
const typeOutCvFromJson = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].title);
        createContainers(arr[i].duration, arr[i].title, arr[i].description, arr[i].type);
    }
}

//Grabs the CV info from JSON and has the above functions processing it
async function fetchMyExperienceData() {
    let experienceArray = [];
    try {
        let response = await fetch("./script/experience.json");
        experienceArray = await response.json();
    }
    catch (error) {
        console.log("Didn't work, this is the problem: " + error);
    }
    typeOutCvFromJson(experienceArray);
}

fetchMyExperienceData()
