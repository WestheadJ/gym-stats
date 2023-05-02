function updatePreview(){
    let title = document.getElementById("exercise-title").value
    document.getElementById("exercise-title-preview").innerText = title

    let sets = document.querySelectorAll(".set")
    sets.forEach(item=>{
        let itemID = item.getAttribute("id")
        document.getElementById(`${itemID}-preview`).innerText = item.value
    })

}

function addSet(){
    let sets = document.querySelectorAll('.set').length

    let form = document.getElementById("exercise-form")

    let p = document.createElement("p")
    p.innerText = `Set ${sets+1}:`
    form.appendChild(p)

    let label = document.createElement("label")
    label.setAttribute("for",`exercise-set-${sets+1}`)
    label.innerText = "Rep Range:"
    form.appendChild(label)

    let input = document.createElement("input")
    input.setAttribute("class","set")
    input.setAttribute("name",`exercise-set-${sets+1}`)
    input.setAttribute("id",`exercise-set-${sets+1}`)
    input.setAttribute("oninput","updatePreview()")
    form.appendChild(input)

    let preview = document.getElementById("preview")

    p = document.createElement("p")
    p.innerText = `Set ${sets+1}:`
    p.setAttribute("id",`set-${sets+1}-p-preview`)
    preview.appendChild(p)

    p = document.getElementById(`set-${sets+1}-p-preview`)
    let span = document.createElement("span")
    span.setAttribute("id",`exercise-set-${sets+1}-preview`)
    p.appendChild(span)



}