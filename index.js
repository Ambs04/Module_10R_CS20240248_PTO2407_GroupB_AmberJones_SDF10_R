//IMPORTS
import{ initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import{ getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-3505f-default-rtdb.europe-west1.firebasedatabase.app/"
}

//DATABASE DECLARATIONS
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

//DECLARATIONS
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

//FUNCTIONS
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputField()

})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {

        let itemsInArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsInArray.length; i++) {

            let currentItem = itemsInArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addItemToShoppingList(itemsInArray[i])

        }
    }else {
        shoppingListEl.innerHTML = "No items are here... yet"
    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputField() {
    inputFieldEl.value = ""
}

function addItemToShoppingList(item) {

    let itemID = item[0]
    let itemValue = item[1]
    let newElement = document.createElement("li")

    newElement.textContent = itemValue

    newElement.addEventListener("click", function() {
        
        let locationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(locationOfItemInDB)

    })

    shoppingListEl.append(newElement)

}