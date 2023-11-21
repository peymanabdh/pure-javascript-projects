// import suggestions from "suggestions.js";
let $ = document;
let autoComplateWraper = $.querySelector(".search-input");
let searchInput = $.querySelector("input");
let autoComplateBox = $.querySelector(".autocom-box");

searchInput.addEventListener("keyup", () => {
  let searchInputValue = searchInput.value;

  if (searchInputValue) {
    autoComplateWraper.classList.add("active");
    var ddd = [];
    let filterdWords = suggestions.filter((word) => {
      return word.toLowerCase().includes(searchInputValue.toLowerCase());
    });
    let filterBystart = suggestions.filter((word) => {
      return word.toLowerCase().startsWith(searchInputValue.toLowerCase());
    });
    ddd.push(filterBystart, filterdWords);
    // console.log(ddd);
    suggestiongenerator(ddd);
  } else {
    autoComplateWraper.classList.remove("active");
  }
});

function suggestiongenerator(wordList) {
  let customList = "";
  let listItem = wordList.map((words) => {
    words.forEach((w) => {
      customList += `<li>${w}</li>`;
    });
  });

  if (!customList) {
    customList = "<li>" + searchInput.value + "</li>";
  } else {
    customList;
    //console.log(customList);
  }
  autoComplateBox.innerHTML = customList;
  select();
}
function select() {
  let allListItems = autoComplateBox.querySelectorAll("li");
  allListItems.forEach((words) => {
    words.addEventListener("click", (e) => {
      searchInput.value = e.target.textContent;
      autoComplateWraper.classList.remove("active");
    });
  });
}
