const loadData = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}
const displayLesson = (lessons) =>{
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    lessons.forEach(lesson =>{
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary font-bold">lesson-${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(btnDiv)
    })
}
loadData()