//All Id's variable
const searchBtn = document.getElementById('search-btn');
const detailsResult = document.getElementById('details-result');
const searchResults = document.getElementById('search-results');
const showMoreBtn = document.getElementById('show-more-btn');
const searchMessage = document.getElementById('search-message');
const searchInput = document.getElementById('search-input');


//Hide and Show Content
const hideAndShow = (idVars, status) => {
    idVars.style.display = status;
    if (status === "none") {
        idVars.innerHTML = "";
    }
}
//Hiding All Content at First
hideAndShow(detailsResult, 'none');
hideAndShow(searchResults, 'none');
hideAndShow(showMoreBtn, 'none');

//Fetch Data for Searching
const searchPhone = (phoneName, start, end) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
        .then(res => res.json())
        .then(phones => showSearchedPhones(phones.data, start, end));
}


//Search Button Click Event
searchBtn.addEventListener('click', () => {

    if (searchInput.value.length > 0) {
        searchPhone(searchInput.value.toLowerCase(), 0, 20);
        searchInput.value = "";
        searchMessage.innerText = "Loading....";
        hideAndShow(searchMessage, 'block');
    } else {
        hideAndShow(searchMessage, 'block');
        searchMessage.innerText = "Your field is empty";
    }

    hideAndShow(detailsResult, 'none');
    hideAndShow(searchResults, 'none');
    hideAndShow(showMoreBtn, 'none');
});

//Showing Searched Phones
const showSearchedPhones = (phonesData, startPosition, endPosition) => {
    if (phonesData.length > 0) {
        phonesDataShorted = phonesData.slice(startPosition, endPosition);
        phonesDataShorted.forEach(phone => {
            const createNewPhoneDiv = document.createElement('div');
            createNewPhoneDiv.classList.add('p-2', 'border', 'border-gray-100', 'shadow-sm', 'rounded', 'md:flex');
            createNewPhoneDiv.innerHTML = `    
            <img src="${phone.image}" class="mx-auto w-1/3 object-contain" alt="">
            <div class="flex-1 text-center md:text-left md:ml-4">
                <h3 class="text-xl lg:text-2xl py-2">${phone.phone_name}</h3>
                <p class="text-sm">${phone.brand}</p>
                <button
                    class="py-2 px-4 outline-0 border border-gray-100 rounded-full text-center mt-2 bg-gray-50 hover:bg-gray-100"
                onclick=showDetails('${phone.slug}')>View Details </button>
            </div>
            `;
            searchResults.appendChild(createNewPhoneDiv);
        });

        hideAndShow(searchMessage, 'none');
        hideAndShow(searchResults, 'grid');

        //Adding "Show More" Button
        if (startPosition == 0 && phonesData.length > 20) {
            hideAndShow(showMoreBtn, 'inline-block');
            showMoreBtn.innerText = "Show More";
            showMoreBtn.addEventListener('click', () => {
                showSearchedPhones(phonesData, 20, phonesData.length);
                hideAndShow(showMoreBtn, 'none');
            });
        }

    } else {
        //Error Message If there's no phones found 
        searchMessage.innerText = "no phone found using this name";
        hideAndShow(searchMessage, 'block');
    }
}


//Passing the data for showing individual phone details
const showDetails = (phoneSlug) => {
    hideAndShow(detailsResult, 'none');
    searchMessage.innerText = "Loading...";
    hideAndShow(searchMessage, 'block');
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneSlug}`)
        .then(res => res.json())
        .then(data => showDetailsUi(data.data));
}

//Showing details of individual Phone
const showDetailsUi = (phoneData) => {
    //Release Date and handling if it's null or undifined
    let phoneReleaseDate = phoneData?.releaseDate;
    if (phoneReleaseDate.length === 0 || phoneReleaseDate === undefined || phoneReleaseDate === null || phoneReleaseDate === "") {
        phoneReleaseDate = "No release date found."
    }
    //Pushing all "features" in a variable & handling empty "features"
    let allFeatures = "";
    for (const featureProperty in phoneData.mainFeatures) {
        if (typeof phoneData.mainFeatures[featureProperty] !== "object") {
            allFeatures += `<br><strong>${featureProperty.toLocaleUpperCase()}</strong> : ${phoneData.mainFeatures[featureProperty]} `;
        } else if (typeof phoneData.mainFeatures[featureProperty] === "object") {
            if (phoneData.mainFeatures[featureProperty].length > 0) {
                allFeatures += `<br/><strong>${featureProperty.toUpperCase()}</strong> : `;
                phoneData.mainFeatures[featureProperty].map(sensor => {
                    allFeatures += `${sensor}, `;
                });
                allFeatures = allFeatures.slice(0, allFeatures.length - 2);
            }
        }
    }
    if (allFeatures === "") {
        allFeatures = "No Features Found."
    }

    //Pushing all "others" in a variable and handling empty "others"
    let others = "";
    for (const othersProperty in phoneData.others) {
        others += `<br><strong>${othersProperty.toLocaleUpperCase()}</strong> : ${phoneData.others[othersProperty]} `;
    }
    if (others === "") {
        others = "No others features found.";
    }

    detailsResult.innerHTML = `
        <img src='${phoneData.image}' class="min-w-xs max-w-xs" alt="">
        <div class="text-left ml-4 flex-1 md:mr-4">
            <h3 class="text-2xl py-1">${phoneData.name}</h3>
            <p class="text-sm">${phoneData.brand}</p>
            <p class="text-sm"><strong>${phoneReleaseDate}</strong> </p>
            <div class="block md:flex md:justify-between">
                <p class="text-sm mr-0 md:mr-4 md:max-w-xs"><strong>Features:</strong> ${allFeatures}</p>
                <p class="text-sm"><strong>Others:</strong> ${others}</p>
            </div>
        </div>
   `;

    hideAndShow(searchMessage, 'none');
    hideAndShow(detailsResult, 'flex');
}