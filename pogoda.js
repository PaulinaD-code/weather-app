const form= document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

var apiKey ="07c328545d6cafeb9264102c3d4a4981";

const inputVal = input.value;

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=pl`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    const {main, name, sys, weather, wind } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
    <h2 class="city-name" data-name="${name},${sys.country}">
      <span>${name}</span>
      <sup class="country">${sys.country}</sup>
    </h2>
    <div class="city-temp">
    ${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
      <img class="city-icon" src=${icon} alt=${weather[0]["main"]}></img>
      <figcaption>${weather[0]["description"]}</figcaption>
    </figure>
    <figure>
      <img class="city-icon1" src="https://cdn-icons-png.flaticon.com/128/7334/7334246.png">
      <figcaption>CIŚNIENIE: ${main.pressure} HPA</figcaption>
    </figure>
    <fugure>
      <img class="city-icon1" city-icon.style.width="50%"; city-icon.style.height="50%"; src="https://cdn-icons-png.flaticon.com/128/2011/2011448.png">
      <figcaption>WIATR: ${Math.round(wind.speed*3.6)} KM/H</figcaption>
    </figure>
    `;

    li.innerHTML = markup;
    list.appendChild(li);
    msg.textContent = "";
    form.reset();
    input.focus();
  })
  
  .catch(() => {
    msg.textContent = "Nie znaleźliśmy szukanego miasta";
  });

})




















