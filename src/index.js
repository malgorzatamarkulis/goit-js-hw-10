import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from '../cat-api';
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const init = true;

// hide elements
hideElement(breedSelect);
hideElement(catInfo);
showLoader(true).then(() => {
    showElement(breedSelect);
});
fetchBreeds()
    .then(data => {
        const html = data
            .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
            .join('');
        breedSelect.innerHTML = html;
        showElement(breedSelect); // hide loader
        hideElement(loader);
    })
    .catch(error => {
        handleRequestError(error);
    });

breedSelect.addEventListener('change', handleBreedSelectChange);

function showLoader(init) {
    return new Promise(resolve => {
        showElement(loader);
        hideElement(catInfo);
        if (init) {
            hideElement(breedSelect);
        }
        setTimeout(() => {
            resolve();
        }, 500);
    });
}
function hideLoader(init) {
    hideElement(loader);
    showElement(catInfo);
    if (init) {
        showElement(breedSelect);
    }
}

function handleBreedSelectChange() {
    const selectedBreedId = breedSelect.value;

    // reset
    resetUIElements();

    // show loader
    showLoader();

    fetchCatByBreed(selectedBreedId)
        .then(catData => {
            // show cat info
            showElement(catInfo);

            const { url, breeds } = catData[0];
            const breedInfo = breeds[0];

            catInfo.innerHTML = `
        <img src="${url}" alt="${breedInfo.name}"/>
        <p><b>Name:</b> ${breedInfo.name}</p>
        <p><b>Description:</b> ${breedInfo.description}</p>
        <p><b>Temperament:</b> ${breedInfo.temperament}</p>
      `;
        })
        .catch(error => {
            // handle error
            handleRequestError(error);
        })
        .finally(() => {
            // hide loader
            hideLoader();
        });
}

function resetUIElements() {
    hideElement(loader);
    hideElement(catInfo);
}

function showElement(element) {
    element.classList.remove('is-hidden');
}

function hideElement(element) {
    element.classList.add('is-hidden');
}

function handleRequestError(error) {
    Notiflix.Notify.failure(
        'Oops! Something went wrong. Please try again later.'
    );
    console.error(error);
}