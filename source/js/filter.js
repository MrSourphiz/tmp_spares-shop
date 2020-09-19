'use strict';
(function(){
  var filterToggle = document.querySelector('.sorting__mobile-button');
  var backFilters = document.querySelector('.filter__head-button');
  var body = document.body;

  var sliderContainer = document.querySelector('.filter__price');
  var sliderMin = document.querySelector('.filter__range-toggle--min');
  var sliderMax = document.querySelector('.filter__range-toggle--max');
  var scale = document.querySelector('.filter__scale');
  var sliderBar = document.querySelector('.filter__bar');
  var minPrice = document.querySelector('input-min-price');
  var maxPrice = document.querySelector('input-max-price');

  var minPriceValue = 0;
  var maxPriceValue = 30000;
  var minMoving = false;
  var maxMoving = false;

  var previousMinPriceValue;
  var previousMaxPriceValue;

  let filterForm = document.querySelector('.filter__form');
  let filterParametersButton = filterForm.querySelector('.filter__type-parameters');
  let filterBrandsButton = filterForm.querySelector('.filter__type-brands');

  function parsePrice(inputValue) {
    return parseInt(inputValue.replace(/ /g, ''), 10);
  }

  if (minPrice) {
    minPrice.addEventListener('focus', function (evt) {
      previousMinPriceValue = evt.target.value;
    });

    minPrice.addEventListener('blur', function (evt) {
      var newMinPrice = parsePrice(evt.target.value);
      if (newMinPrice < parsePrice(maxPrice.value)) {
        var newX = newMinPrice / (maxPriceValue - minPriceValue) * scale.clientWidth;
        updateMin(newX);
      } else {
        evt.target.value = previousMinPriceValue;
      }
    });
  }

  if (maxPrice) {
    maxPrice.addEventListener('focus', function (evt) {
      previousMaxPriceValue = evt.target.value;
    });
    maxPrice.addEventListener('blur', function (evt) {
      var newMaxPrice = parsePrice(evt.target.value);
      if (newMaxPrice > parsePrice(minPrice.value)) {
        var newX = newMaxPrice / (maxPriceValue - minPriceValue) * scale.clientWidth;
        updateMax(newX);
      } else {
        evt.target.value = previousMaxPriceValue;
      }
    });
  }

  if (sliderMin) {
    sliderMin.addEventListener('mousedown', function () {
      minMoving = true;
    });
  }

  if (sliderMax) {
    sliderMax.addEventListener('mousedown', function () {
      maxMoving = true;
    });
  }

  document.addEventListener('mousemove', function (evt) {
    if (minMoving || maxMoving) {
      var newX = evt.clientX - sliderContainer.offsetLeft;
      var newPrice = Math.floor((maxPriceValue - minPriceValue) * newX / scale.clientWidth);
      if (minMoving && newX >= 0 && newX < sliderMax.offsetLeft) {
        updateMin(newX);
        minPrice.value = newPrice;
      }
      if (maxMoving && newX >= sliderMin.offsetLeft && newX <= scale.clientWidth) {
        updateMax(newX);
        maxPrice.value = newPrice;
      }
    }
  });

  function updateMin(newX) {
    sliderMin.style.left = newX + 'px';
    sliderBar.style.marginLeft = sliderMin.style.left;
    sliderBar.style.width = (sliderMax.offsetLeft - newX) + 'px';
  }

  function updateMax(newX) {
    sliderMax.style.left = newX + 'px';
    sliderBar.style.width = (newX - sliderMin.offsetLeft) + 'px';
  }

  document.addEventListener('mouseup', function () {
    minMoving = false;
    maxMoving = false;
  });

  filterParametersButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (filterForm.classList.contains('filter__type-brands--active')) {
      filterForm.classList.remove('filter__type-brands--active');
      filterForm.classList.add('filter__type-parameters--active');
      filterParametersButton.classList.add('filter__type-link--active');
      filterBrandsButton.classList.remove('filter__type-link--active');
    }
  });

  filterBrandsButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (filterForm.classList.contains('filter__type-parameters--active')) {
      filterForm.classList.remove('filter__type-parameters--active');
      filterForm.classList.add('filter__type-brands--active');
      filterBrandsButton.classList.add('filter__type-link--active');
      filterParametersButton.classList.remove('filter__type-link--active');
    }
  });

  if (filterToggle) {
    filterToggle.addEventListener('click', function () {
      if (body) {
        if (body.classList.contains('filter-opened')) {
          body.classList.remove('filter-opened');
        } else {
          body.classList.add('filter-opened');
        }
      }
    });
  }

  if (backFilters) {
    backFilters.addEventListener('click', function () {
      if (body) {
        if (body.classList.contains('filter-opened')) {
          body.classList.remove('filter-opened');
        }
      }
    });
  }
})();
