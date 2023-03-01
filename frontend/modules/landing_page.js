import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response = await fetch('http://13.126.104.35:8082/cities');
    const users = await response.json();
    return users;
   }catch(error){
     console.error("Error Found",error);
     return null; 
   }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cont = document.getElementById('data');
  
  const division = document.createElement("div");
  division.setAttribute("class","tile col-lg-3 col-md-6 col-sm-12");

  let link =document.createElement("a");
  link.setAttribute("href","pages/adventures/?city="+id);
  division.setAttribute("id",id);

  let divtile = document.createElement("div");
  divtile.setAttribute("class","tile");

  const imagee = document.createElement("img");
  imagee.setAttribute("src",image);
  // image.setAttribute("class","tile");
  imagee.height =100;
  imagee.width = 100;
  divtile.appendChild(imagee);

  const text = document.createElement("div");
  text.setAttribute("class","tile-text");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  h2.textContent = city;
  p.textContent = description;

  text.append(h2);
  text.append(p);

  
  divtile.appendChild(text);
  link.appendChild(divtile);

  division.appendChild(link);
  cont.appendChild(division);

}

export { init, fetchCities, addCityToDOM };
