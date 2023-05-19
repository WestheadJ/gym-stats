const dt = new Date()
let day = dt.getDay()

window.onload = () =>{
    const form = document.getElementById("record-form")

    if(day === 1){
        let container = document.createElement("div")
        container.setAttribute("id","smith-hack-squat-container")
        form.appendChild(container)

        let smithHackSmithContainer = document.getElementById("smith-hack-squat-container")
        let h3 = document.createElement("h3")
        h3.innerText = "Smith Hack Squat"
        smithHackSmithContainer.appendChild(h3)

    }
    else if(day===2){
        let container = document.createElement("div")
        container.setAttribute("id","pec-deck-container")
        form.appendChild(container)

        let smithHackSmithContainer = document.getElementById("pec-deck-container")
        let h3 = document.createElement("h3")
        h3.innerText = "Pec Deck"
        smithHackSmithContainer.appendChild(h3)
    }
    else if(day===3){
        let container = document.createElement("div")
        container.setAttribute("id","laying-hamstring-curls-container")
        form.appendChild(container)

        let smithHackSmithContainer = document.getElementById("laying-hamstring-curls-container")
        let h3 = document.createElement("h3")
        h3.innerText = "Laying Hamstring Curls"
        smithHackSmithContainer.appendChild(h3)
    }
    // Thursday
    else if(day===4){
        let container = document.createElement("div")
        container.setAttribute("id","smith-shoulder-press-container")
        form.appendChild(container)

        // Smith Shoulder Press
        let smithShoulderPressContainer = document.getElementById("smith-shoulder-press-container")
        let h3 = document.createElement("h3")
        h3.innerText = "Smith Shoulder Press"
        smithShoulderPressContainer.appendChild(h3)

        // set 1
        container = document.createElement("div")
        container.setAttribute("id","smith-shoulder-press-set1-container")
        smithShoulderPressContainer.appendChild(container)

        let smithShoulderPressContainerSet1 = document.getElementById("smith-shoulder-press-set1-container")
        let h4 = document.createElement("h4")
        h4.innerText = "Set 1"
        smithShoulderPressContainerSet1.appendChild(h4)

        let label = document.createElement("label")
        label.innerText = "Weight:"
        label.setAttribute("for","smith-shoulder-press-set1-weight")
        smithShoulderPressContainerSet1.appendChild(label)

        let weightInput = document.createElement("input")
        weightInput.setAttribute("type","number")
        weightInput.setAttribute("step","0.01")
        weightInput.setAttribute("id","smith-shoulder-press-set1-weight")
        weightInput.setAttribute("name","smith-shoulder-press-set1-weight")
        smithShoulderPressContainerSet1.appendChild(weightInput)

        label = document.createElement("label")
        label.innerText = "Reps:"
        label.setAttribute("for","smith-shoulder-press-set1-reps")
        smithShoulderPressContainerSet1.appendChild(label)

        let repsInput = document.createElement("input")
        repsInput.setAttribute("type","number")
        repsInput.setAttribute("step","1")
        repsInput.setAttribute("id","smith-shoulder-press-set1-reps")
        repsInput.setAttribute("name","smith-shoulder-press-set1-reps")
        smithShoulderPressContainerSet1.appendChild(repsInput)

        // set 2
        container = document.createElement("div")
        container.setAttribute("id","smith-shoulder-press-set2-container")
        smithShoulderPressContainer.appendChild(container)

        let smithShoulderPressContainerSet2 = document.getElementById("smith-shoulder-press-set2-container")
        h4 = document.createElement("h4")
        h4.innerText = "Set 2"
        smithShoulderPressContainerSet2.appendChild(h4)

        label = document.createElement("label")
        label.innerText = "Weight:"
        label.setAttribute("for","smith-shoulder-press-set2-weight")
        smithShoulderPressContainerSet2.appendChild(label)

        weightInput = document.createElement("input")
        weightInput.setAttribute("type","number")
        weightInput.setAttribute("step","0.01")
        weightInput.setAttribute("id","smith-shoulder-press-set2-weight")
        weightInput.setAttribute("name","smith-shoulder-press-set2-weight")
        smithShoulderPressContainerSet2.appendChild(weightInput)

        label = document.createElement("label")
        label.innerText = "Reps:"
        label.setAttribute("for","smith-shoulder-press-set2-reps")
        smithShoulderPressContainerSet2.appendChild(label)

        repsInput = document.createElement("input")
        repsInput.setAttribute("type","number")
        repsInput.setAttribute("step","1")
        repsInput.setAttribute("id","smith-shoulder-press-set2-reps")
        repsInput.setAttribute("name","smith-shoulder-press-set2-reps")
        smithShoulderPressContainerSet2.appendChild(repsInput)

        // set 2
        container = document.createElement("div")
        container.setAttribute("id","smith-shoulder-press-set3-container")
        smithShoulderPressContainer.appendChild(container)

        let smithShoulderPressContainerSet3 = document.getElementById("smith-shoulder-press-set3-container")
        h4 = document.createElement("h4")
        h4.innerText = "Set 3"
        smithShoulderPressContainerSet3.appendChild(h4)

        label = document.createElement("label")
        label.innerText = "Weight:"
        label.setAttribute("for","smith-shoulder-press-set3-weight")
        smithShoulderPressContainerSet3.appendChild(label)

        weightInput = document.createElement("input")
        weightInput.setAttribute("type","number")
        weightInput.setAttribute("step","0.01")
        weightInput.setAttribute("id","smith-shoulder-press-set3-weight")
        weightInput.setAttribute("name","smith-shoulder-press-set3-weight")
        smithShoulderPressContainerSet3.appendChild(weightInput)

        label = document.createElement("label")
        label.innerText = "Reps:"
        label.setAttribute("for","smith-shoulder-press-set3-reps")
        smithShoulderPressContainerSet3.appendChild(label)

        repsInput = document.createElement("input")
        repsInput.setAttribute("type","number")
        repsInput.setAttribute("step","1")
        repsInput.setAttribute("id","smith-shoulder-press-set3-reps")
        repsInput.setAttribute("name","smith-shoulder-press-set3-reps")
        smithShoulderPressContainerSet3.appendChild(repsInput)




    }
    else if(day===5){
        let container = document.createElement("div")
        container.setAttribute("id","leg-press-glutes-container")
        form.appendChild(container)

        let smithHackSmithContainer = document.getElementById("leg-press-glutes-container")
        let h3 = document.createElement("h3")
        h3.innerText = "Leg Press (Glutes)"
        smithHackSmithContainer.appendChild(h3)
    }
}