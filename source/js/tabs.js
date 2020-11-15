'use strict';
(function(){
  let tabs = document.querySelectorAll('.tabs__list');

  let showActivePanel = function(panelClass, panelArray) {
    for(let j = 0; j < panelArray.length; j++) {
      if (panelArray[j].classList.contains(panelClass)) {
        panelArray[j].classList.add('tabs__panel--active');
      }
    }
  };

  let removeActiveClass = function(buttonArray, panelArray) {
    for (let k = 0; k < buttonArray.length; k++) {
      buttonArray[k].classList.remove('tabs__button--active');
      panelArray[k].classList.remove('tabs__panel--active');
    }
  };

  for (let i = 0; i < tabs.length; i++) {
    let buttonClass = tabs[i].id + '__button';
    let panelClass = tabs[i].id + '__panel';
    let currentButtonList = document.querySelectorAll('.' + buttonClass);
    let currentPanelList = document.querySelectorAll('.' + panelClass);

    tabs[i].addEventListener('click', (event) => {
      let target = event.target;
      let currentPanelClass = target.name + '-panel';

      if (target.classList.contains('tabs__button')) {
        removeActiveClass(currentButtonList, currentPanelList);
        target.classList.add('tabs__button--active');
        showActivePanel(currentPanelClass, currentPanelList);
      }
    });
  };
})();
