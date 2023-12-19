const textAria = document.getElementById("textaria");
const inputVal = document.getElementById("search-value");
const btn = document.getElementById("btn");
btn.addEventListener("click", search);
const API_URL = "https://jsonplaceholder.typicode.com";
async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  let data = await response.json();
  show(data);
}

function show(data) {
  var parrotFact = [];

  data.forEach((element, i) => {
    //console.log(element.body, i);
    parrotFact.push(element.body);
  });

  var randomIndex = Math.floor(Math.random() * parrotFact.length);
  var randomMessage = parrotFact[randomIndex];
  document.getElementById("textaria").innerText = randomMessage;
  //console.log(randomMessage);
}

fetchPosts();
function search() {
  const text = textAria.innerText.trim();
  const value = inputVal.value.trim();
  if (text == "" || value == "") {
    alert("please enter a value");
    return;
  }
  const regex = new RegExp(value, "gi");
  if (regex.test(text)) {
    const highlighted = text.replace(
      regex,
      `<span class="highlighted">$&</span>`
    );
    textAria.innerHTML = highlighted;
  } else {
    alert("dose not match");
  }
}
