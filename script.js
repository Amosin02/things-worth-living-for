const submitBtn = document.getElementById("submit-btn")
const outputItem = document.getElementById("inner-content-output")
const inputItem = document.getElementById("input-value")

let importantThings = [];
let itemToBeSaved = {}
loadStorage()
showOutput()

inputItem.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        program()
        event.preventDefault()
    }
})

submitBtn.addEventListener("click", () => {
    program()
})

function program() {
    addThing()
    inputItem.value = ""
    showOutput()
}

function addThing() {
    const thingIndex = importantThings.findIndex((item) => item.id === itemToBeSaved.id)

    const thingObj = {
        id: `${inputItem.value}-${Date.now()}`,
        item: inputItem.value,
    }

    if (thingIndex === -1) {
        importantThings.unshift(thingObj);
    } else {
        console.log("function")
    }
    putToStorage(importantThings)
}

function showOutput() {
    outputItem.innerHTML = ""

    importantThings.forEach(({item, id}) => {
        outputItem.innerHTML += `
        <div class="item-list" id="${id}">
            <button onclick="deleteThing(this)" class="button-4">
                Delete
            </button>
            ${item}
        </div>`
    })
}

function deleteThing(buttonId) {
    const dataArrIndex = importantThings.findIndex(
        (item) => item.id === buttonId.parentElement.id
    )

    buttonId.parentElement.remove()
    importantThings.splice(dataArrIndex, 1)
    putToStorage(importantThings)
}

let dummyTask = [
    { id:"123", item: "good food"},
    { id:"124", item: "exploring"},
    { id:"125", item: "art"},
    { id:"125", item: "coffee"},
    { id:"125", item: "games"},
]

function putToStorage(toStore) {
    localStorage.setItem("key", JSON.stringify(toStore))
}

function loadStorage() {
    let savedList = JSON.parse(localStorage.getItem("key")) 

    if (savedList !== null) {
        savedList.forEach((obj) => importantThings.push(obj))
    } else {
        return savedList = []
    }
}