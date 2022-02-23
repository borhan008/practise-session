fetch('https://alquranbd.com/api/hadith/')
    .then(res => res.json())
    .then(data => hadithsBooks(data));

const hadithsBooks = (data) => {
    const hadithsBookDiv = document.getElementById('hadiths_books');
    data.map(hadithBook => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML =
            `<div class="bg-blue-800 text-white p-2 border-b-2 border-blue-900 cursor-pointer" onclick="getHadithsCategory('${hadithBook.book_key}');">
            <h3 class="font-semibold">${hadithBook.nameBengali}</h3>
            <span class="text-sm">Total Hadiths: ${hadithBook.hadith_number}</span>
        </div>`;
        hadithsBookDiv.appendChild(createDiv);
    });
}

const getHadithsCategory = bookKey => {
    if (bookKey == "") {
        showHadithCategories('');
    }
    else {
        fetch(`https://alquranbd.com/api/hadith/${bookKey}`)
            .then(res => res.json())
            .then(data => showHadithCategories(data));
    }
}

const showHadithCategories = (data) => {
    const categoriesParent = document.getElementById('hadith_categories');
    categoriesParent.textContent = "";
    if (data.length == 0) {
        categoriesParent.innerHTML = `<h2 class="text-white text-center">NOT FOUND</h2>`;
    } else {
        data.map(hCategory => {
            const createCategoryDiv = document.createElement('div');
            createCategoryDiv.innerHTML =
                `<div class="bg-blue-800 text-white p-2 border-b-2 border-blue-900 cursor-pointer single-hadith" onclick="getHadiths('${hCategory.bookInitial}','${hCategory.chSerial}')">
                <h3>${hCategory.nameBengali}</h3>
                <span>${hCategory.range_start} - ${hCategory.range_end}</span>
        </div>`;
            categoriesParent.appendChild(createCategoryDiv);
        });
    }
}

const getHadiths = (bookName, chapterId) => {
    fetch(`https://alquranbd.com/api/hadith/${bookName}/${chapterId}`)
        .then(res => res.json())
        .then(data => showHadiths(data));
}

const showHadiths = data => {
    const showHadithParentDiv = document.getElementById('hadiths');
    showHadithParentDiv.textContent = "";
    data.map(hadith => {
        console.log(hadith);
        const createSingleHadithDiv = document.createElement('div');
        if (hadith['hadithBengali'] !== undefined) {
            const hadithText = hadith.hadithBengali.replace(new RegExp("<p dir='RTL'>", "g"), '<br/><br/><br/>').replace(new RegExp(']', "g"), ']<br/><br/>').replace(new RegExp('<hr />', 'g'), '<br/>');
            createSingleHadithDiv.innerHTML = `
            <div class="bg-blue-800 p-2 mb-2 text-white text-2xl">
                <p class="text-white py-2">
                ${hadithText}
                </p>
                <p class="text-xs text-white">${hadith.topicName}</p>
                <p class="text-xs text-white">বর্ণনা: ${hadith.rabiNameBn}</p>
            </div>        
        `;
            showHadithParentDiv.appendChild(createSingleHadithDiv);
        } else {
            showHadithParentDiv.innerHTML = `<h2 class="text-white text-center">NOT FOUND</h2>`;
        }

    });
}