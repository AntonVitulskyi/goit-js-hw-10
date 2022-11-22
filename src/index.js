import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const searchCountryInputEl = document.querySelector('#search-box')
const createOneCountriesEl = document.querySelector('.country-info')
const createFewCountriesEl = document.querySelector('.country-list')
const DEBOUNCE_DELAY = 300;

const createFewCountries = (array) => {
let stringElem = array.map(element => { 
  const nameOficial = element.name.official;
  const flagsSvg = element.flags.svg;
 return `<li class="country-item"><img class="flag-svg" src="${flagsSvg}" alt="flag" width='30px'></img><p class="country-name">${nameOficial}</p></li>`
}).join('');
createFewCountriesEl.insertAdjacentHTML("afterbegin", stringElem)
}

const createOneCountry = (array) => {
  const languages = Object.values(array[0].languages);
  const population = array[0].population;
  const capital = array[0].capital;
  const nameOficial = array[0].name.official;
  const flagsSvg = array[0].flags.svg;
  let stringElem = `<div class="country-item"><img class="flag-svg" src="${flagsSvg}" alt="flag" width='30px'>
  </img>
  <p class="one-country-name">${nameOficial}</p></div>
  <ul class="country-list">
<li class="info-item">Capital: <span class="value">${capital}</span></li>
<li class="info-item">Population: <span class="value">${population}</span></li>
<li class="info-item">Languages: <span class="value">${languages}</span></li>
</ul>`;
createOneCountriesEl.insertAdjacentHTML("afterbegin", stringElem);
}



const onInputSearch = event => {
  createOneCountriesEl.innerHTML = '';
  createFewCountriesEl.innerHTML = '';

  let inputValue = event.target.value.trim();
  if(inputValue === ''){
    return;
  }

    fetchCountries(inputValue).then(data => {
      if(data.length > 10){
        Notify.info("Too many matches found. Please enter a more specific name.", { fontSize: '22px', width: '500px'},);
      return;
    }
      if(data.length >= 2 && data.length <= 10 ){
        createFewCountries(data)
      }
      if(data.length === 1){
        createOneCountry(data)
      }
    }).catch(err => {
      Notify.failure("Oops, there is no country with that name", { fontSize: '22px', width: '500px'},)
    })
  
} 

searchCountryInputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))