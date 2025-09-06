const createElement = (arr) =>{
    const htmlElement  = arr.map(el => `<span class="btn"> ${el} </span>`)
    return(htmlElement.join(" "))
}
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove('hidden')
        document.getElementById("lesson-word").classList.add('hidden')
    }
    else{
        document.getElementById("lesson-word").classList.remove('hidden')
        document.getElementById("spinner").classList.add('hidden')
    }
}
const loadData = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}
const loadDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}
const displayWordDetails = (details) =>{
    const modalBox = document.getElementById("details-container")
    modalBox.innerHTML = `<div id="details-container" class=" space-y-4">
    <h2 class="text-3xl font-bangla font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h2>
    <div>
        <h3 class="font-semibold text-xl">Meaning</h3>
        <p>${details.meaning}</p>
    </div>
    <div>
        <h3 class="font-semibold text-xl">Example</h3>
        <p class="text-gray-400">${details.sentence}</p>
    </div>
    <div>
        <h3 class="text-xl font-bangla">সমার্থক শব্দ গুলো</h3>
       <div>${createElement(details.synonyms)}</div>
    </div>
    
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>`
    document.getElementById("my_modal_5").showModal();
}
const remove = () =>{
    const allBtn = document.querySelectorAll(".lesson-btn");
    allBtn.forEach(btn => {
        btn.classList.remove("active");
    })
}
const loadLevelWord = (id) =>{
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const btnActive = document.getElementById(`lesson-btn-${id}`);
        remove();
        btnActive.classList.add("active");
        displayLessonWord(data.data);
       
    })

}
const displayLessonWord = (words) =>{
      const lessonWord = document.getElementById("lesson-word");
      lessonWord.innerHTML = "";
      if(words.length === 0){
        lessonWord.innerHTML = `<div class="text-center col-span-full space-y-5 font-bangla py-4">
            <img class="mx-auto" src = "./assets/alert-error.png">
            <p class="text-gray-400 text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-4xl font-bold">নেক্সট Lesson এ যান</h1>
        </div>`;
         manageSpinner(false);
        return;
        
      }
      words.forEach(word => {
             const card = document.createElement("div")
             card.innerHTML = `<div class="bg-white text-center py-10 px-5 rounded-xl shadow-sm h-full space-y-5">
            <h2 class="text-3xl font-bold">${word.word? word.word : "শব্দ পাওয়া যায় নি"}</h2>
            <p class="text-xl font-medium">Meaning /Pronounciation</p>
            <div class="text-3xl font-bangla mb-8">"${word.meaning? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation? word.pronunciation : "pronunciation পাওয়া যায় নি"}"</div>
            <div class="flex justify-between items-center">
              <button onclick="loadDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></i></button>
            </div>
        </div>`;
             lessonWord.append(card)
             })
              manageSpinner(false);
}
      
      
const displayLesson = (lessons) =>{
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    lessons.forEach(lesson =>{
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary font-bold lesson-btn"><img src="./assets/fa-book-open.png"> lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(btnDiv)
    })
}
loadData()