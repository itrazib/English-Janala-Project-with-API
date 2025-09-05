const loadData = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}
const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessonWord(data.data))

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
        return;
      }
      words.forEach(word => {
             const card = document.createElement("div")
             card.innerHTML = `<div class="bg-white text-center py-10 px-5 rounded-xl shadow-sm h-full space-y-5">
            <h2 class="text-3xl font-bold">${word.word}</h2>
            <p class="text-xl font-medium">Meaning /Pronounciation</p>
            <div class="text-3xl font-bangla mb-8">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></i></button>
            </div>
        </div>`;
             lessonWord.append(card)
             })
}
      
      
const displayLesson = (lessons) =>{
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    lessons.forEach(lesson =>{
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary font-bold"><img src="./assets/fa-book-open.png"> lesson - ${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(btnDiv)
    })
}
loadData()