const dt = new Date()
let day = dt.getDay()

let monday = [["Smith Hack Squat (Quads)",3],["Laying Hamstring Curl",3],["Leg Extensions",4],["Leg Press (Calfs)",4],["Leg Press (Adductors",3]]
let tuesday = [["Pec Deck",3],["Smith Incline Chest Press",3],["Flat DB Press",2],["Upper Back Pulldown",2],["Lat Row",2],["Rear Delt Row",2]]
let wednesday = [["Laying Hamstring Curl",3],["Leg Press (Glutes)",3],["Smith Hack Squats (Glutes & Hams)",2],["Leg Press (Calves)",3],["Leg Extensions",3]]
let thursday = [["Smith Shoulder Press",3],["Cable Lat Raise",3],["Tricep Pushdown (Single Arm)",3],["Behind Cable Curls",2],["Overhead Tricep Extensions (Single Arm)",2],["Preacher Curl",2]]
let friday = [["Leg Press (Glutes)",3],["RDLs",2],["Leg Extensions",3],["Leg Press (Calf Raises)",2],["Laying Hamstring Curl",2]]

function addExerciseToPage(form,exercise,sets){
    let container = document.createElement("div")
    container.setAttribute("id",`${exercise.replaceAll(' ', '-')}-container`)
    container.setAttribute("class","exercise-container")
    form.appendChild(container)

    let exerciseContainer = document.getElementById(`${exercise.replaceAll(" ","-")}-container`)
    let h3 = document.createElement("h3")
    h3.innerText = `${exercise} - Volume: `
    exerciseContainer.appendChild(h3)

    let span = document.createElement("span")
    span.innerText = 0
    span.setAttribute("id",`${exercise.replaceAll(" ","-")}-volume`)
    h3.appendChild(span)


    for(i=0;i<sets;i++){
        let setContainer = document.createElement("div")
        setContainer.setAttribute("id",`${exercise.replaceAll(" ","-")}-set${i+1}-container`)
        setContainer.setAttribute("class","set-container")
        exerciseContainer.appendChild(setContainer)

        let label = document.createElement("label")
        label.innerText = "Weight:"
        label.setAttribute("for",`${exercise.replaceAll(" ","-")}-set${i+1}-weight`)
        setContainer.appendChild(label)

        let weightInput = document.createElement("input")
        weightInput.setAttribute("type","number")
        weightInput.setAttribute("step","0.01")
        weightInput.setAttribute("id",`${exercise.replaceAll(" ","-")}-set${i+1}-weight`)
        weightInput.setAttribute("name",`${exercise.replaceAll(" ","-")}-set${i+1}-weight`)
        setContainer.appendChild(weightInput)

        label = document.createElement("label")
        label.innerText = "Reps:"
        label.setAttribute("for",`${exercise.replaceAll(" ","-")}-set${i+1}-reps`)
        setContainer.appendChild(label)

        let repsInput = document.createElement("input")
        repsInput.setAttribute("type","number")
        repsInput.setAttribute("step","1")
        repsInput.setAttribute("id",`${exercise.replaceAll(" ","-")}-set${i+1}-reps`)
        repsInput.setAttribute("name",`${exercise.replaceAll(" ","-")}-set${i+1}-reps`)
        setContainer.appendChild(repsInput)

    }
}

function addSubmitButton(form){
    let submitButton = document.createElement("button")
    submitButton.innerText = "Submit"
    submitButton.setAttribute("type","submit")
    submitButton.setAttribute("value","Submit")
    form.appendChild(submitButton)
}

function update(e){
    console.log(e.target)
}

window.onload = () =>{
    const form = document.getElementById("record-form")

    if(day === 1){
        monday.forEach(item=>addExerciseToPage(form,item[0],item[1]))
        addSubmitButton(form)

    }
    else if(day===2){
        tuesday.forEach(item=> addExerciseToPage(form,item[0],item[1]))
        addSubmitButton(form)
    }
    else if(day===3){
        wednesday.forEach(item=> addExerciseToPage(form,item[0],item[1]))
        addSubmitButton(form)
    }
    else if(day===4){
        thursday.forEach(item=>addExerciseToPage(form,item[0],item[1]))
        addSubmitButton(form)
    }
    else if(day===5){
        friday.forEach(item=>addExerciseToPage(form,item[0],item[1]))
        addSubmitButton(form)
    }
}