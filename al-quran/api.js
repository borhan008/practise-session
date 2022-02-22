fetch('quran_bn.json')
    .then(res => res.json())
    .then(data => gettingData(data));

function gettingData(data) {
    const container = document.getElementById('container')
    data.map(surah => {
        const div = document.createElement('div');
        let surahType;
        if (surah.type == "meccan") {
            surahType = "মাক্কী";
        } else {
            surahType = "মাদানী";

        }
        div.innerHTML =
            `<div id="surah-title" class="w-full bg-yellow-200 p-5 flex justify-between items-center">
            <h3 class="bg-yellow-500 px-4 py-2 text-center rounded-full">${surah.id}</h3>
            <h2 class=" surah-title-text text-5xl text-black text-center ">${surah.name} <span
                    class="text-xl block bangla mt-2">${surah.translation}</span></h2>
            <h3>${surahType} <span class="bg-yellow-500 px-4 py-2 text-center rounded-full">${surah.total_verses}</span></h3>
        </div>           
         <div class="sura-verse text-center p-5 bg-yellow-300 border-b-2 border-yellow-400">
                <h3 class="text-3xl arabic">
                    بِسۡمِ
                    ٱللَّهِ ٱلرَّحۡمَٰنِ
                    ٱلرَّحِيمِ</h3>
                <p class="text-xl pt-2 bangla">শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।</p>
            </div>`;


        container.appendChild(div);

        surah.verses.map(ayat => {
            const div2 = document.createElement('div');
            div2.innerHTML = `<div class="sura-verse text-right p-5 bg-yellow-100 border-b-2 border-yellow-400 flex justify-between items-center ">
             <button onClick=ayatPlay(${surah.id},${ayat.id},'play',this) class="bg-yellow-700 p-2 rounded-full all-btn text-white disabled:bg-yellow-600">Play</button>
             <div>
                <h3 class="text-4xl arabic">
                    
                    <span>${ayat.text}</span><span class="bg-yellow-500 py-1 px-3 text-center rounded-full text-sm mr-4">${ayat.id}</span>
                </h3>
                    <p class="text-xl pt-2 bangla">${ayat.translation}</p>
                   </div>
                </div>`;
            container.appendChild(div2);
        })
    });
}

function ayatPlay(surahNum, ayatNum, Isplay, event) {
    var surahNum2 = surahNum.toString().padStart(3, 0);
    var ayatNum2 = ayatNum.toString().padStart(3, 0);
    if (Isplay == "play") {
        event.classList.remove('all-btn');

        var audios = document.getElementsByClassName('all-btn');
        for (const audio_single of audios) {
            audio_single.setAttribute('disabled', 'true');
        };

        var audio = document.createElement('audio');
        audio.style.display = "none";
        audio.src = `http://www.everyayah.com/data/Alafasy_64kbps/${surahNum2}${ayatNum2}.mp3`;
        audio.autoplay = true;
        audio.setAttribute("id", `ayat${surahNum2}${ayatNum2}`);
        event.setAttribute('onclick', `ayatPlay(${surahNum},${ayatNum},'Stop',this)`);
        event.innerText = "Stop";
        audio.onended = function () {
            audio.remove() //Remove when played.
            event.setAttribute('onclick', `ayatPlay(${surahNum},${ayatNum},'play',this)`);
            event.innerText = "Play";
            event.classList.add('all-btn');
            for (const audio_single of audios) {
                audio_single.removeAttribute('disabled');
            };
        };
        document.body.appendChild(audio);


    } else {
        event.classList.add('all-btn');

        const audioId = document.getElementById(`ayat${surahNum2}${ayatNum2}`);
        audioId.remove();
        var audios = document.getElementsByClassName('all-btn');
        for (const audio_single of audios) {
            audio_single.removeAttribute('disabled');
        };
        event.setAttribute('onclick', `ayatPlay(${surahNum},${ayatNum},'play',this)`);
        event.innerText = "Play";

    }
}

