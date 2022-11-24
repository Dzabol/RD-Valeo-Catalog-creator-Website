const dropDownBox = document.querySelector(".dropDown-box");
const dropDownSelectButton = dropDownBox.querySelector(".dropDownSelect-button");
const listOfElements = dropDownBox.querySelector(".listoOfItems");
const searchInput = dropDownBox.querySelector(".searchInput");


let elementsOnTheList = ["Arrival", "Audi", "BMW", "DAF", "Hyundau", "Alpina", "MAN", "Mercedes-Benz"];

function addElementsToTheList(selectedElement) {
    listOfElements.innerHTML = "";
    elementsOnTheList.forEach(element => {
        let isSelected = element == selectedElement ? "selected" : "";
        let li = '<li onclick="updateNemeOfSelectedFromTheList(this)" class="' + isSelected + '">' + element + '</li>';
        listOfElements.insertAdjacentHTML("beforeend", li);
    });
}
addElementsToTheList();

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}


function updateNemeOfSelectedFromTheList(selectedOnTheList) {
    searchInput.value = "";
    addElementsToTheList(selectedOnTheList.innerText);
    dropDownBox.classList.remove("active")
    dropDownSelectButton.firstElementChild.innerText = selectedOnTheList.innerText;
}

dropDownSelectButton.addEventListener("click", () => {
    dropDownBox.classList.toggle("active");
});


searchInput.addEventListener("keyup", () => {
    let array = [];
    let searchedValue = searchInput.value.toLowerCase();
    array = elementsOnTheList.filter(data => {
        return data.toLowerCase().startsWith(searchedValue);
    }).map(data => '<li onclick="updateNemeOfSelectedFromTheList(this)">' + data + '</li>').join(""); //Map and join searched values to one list
    listOfElements.innerHTML = array ? array : '<p> Not Found </p>';
});