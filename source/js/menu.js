'use strict';
(function(){
  let headerButton = document.querySelector('.page-header__menu-toggle');
  let body = document.body;
  let menuIsOpened = false;

  let menuToggle = function() {
    if (!menuIsOpened) {
      body.classList.add('menu-opened');
      headerButton.classList.add('page-header__menu-toggle--active');
      menuIsOpened = !menuIsOpened;
    } else {
      body.classList.remove('menu-opened');
      headerButton.classList.remove('page-header__menu-toggle--active');
      menuIsOpened = !menuIsOpened;
    }
  }

  headerButton.addEventListener('click', menuToggle);
})();
