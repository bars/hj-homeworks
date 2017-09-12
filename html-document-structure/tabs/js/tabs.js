const tabs = document.getElementById('tabs'),
      articles = tabs.getElementsByClassName('tabs-content')[0],
      nav = tabs.getElementsByClassName('tabs-nav')[0],
      example = nav.firstElementChild;      
let current = articles.firstElementChild;

example.parentNode.removeChild(example);

for (current; current !== null; current = current.nextElementSibling) {
  
  let icon = current.getAttribute('data-tab-icon'),
      title = current.getAttribute('data-tab-title');
  
  current.classList.add(title);
  current.classList.add('hidden');
  
  if (nav.getElementsByClassName(icon).length === 0) {
    nav.appendChild(example.cloneNode(true));
    tab = (nav.lastElementChild).firstElementChild;
    tab.classList.add(icon);
    tab.textContent = title;
    tab.addEventListener('click', switchTab);
  }
}

nav.firstElementChild.classList.add('ui-tabs-active');
activeElement = nav.firstElementChild;
let activeArticles = Array.from(articles.getElementsByClassName(activeElement.firstElementChild.textContent));
activeArticles.forEach(article => article.classList.remove('hidden'));

function switchTab() {
  activeArticles.forEach(article => article.classList.add('hidden'));
  activeElement.classList.remove('ui-tabs-active');
  activeElement = event.target.parentNode;
  activeElement.classList.add('ui-tabs-active');
  activeArticles = Array.from(articles.getElementsByClassName(event.target.textContent));
  activeArticles.forEach(article => article.classList.remove('hidden'));
}
