import './css/styles.css';
import Notiflix from 'notiflix';

import photoСardTpl from './templates/gallery-markup.hbs';
import getRefs from './refs';
import NewsApiService from './js/api-service';

const refs = getRefs();
const newsApiService = new NewsApiService();
console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');

function onSearch(e) {
    e.preventDefault();
    
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    if (newsApiService.query === '') {
        onFetchError();
        return;
    }
    newsApiService.resetPage();
    clearHitsContainer();
    
    newsApiService.fetchArticles().then(appendHitsMarkup);
}

function onLoadMore(e) {
    newsApiService.fetchArticles().then(appendHitsMarkup);

}
function appendHitsMarkup(hits) {
    if (hits.length === 0) {
        onFetchError();
        return;
    }
    
    refs.hitsContainer.insertAdjacentHTML('beforeend', photoСardTpl(hits));
    refs.loadMoreBtn.classList.remove('is-hidden');
}

function clearHitsContainer() {
  refs.hitsContainer.innerHTML = '';
}

function onFetchError() {
    refs.hitsContainer.innerHTML = "";
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    refs.loadMoreBtn.classList.add('is-hidden');
}