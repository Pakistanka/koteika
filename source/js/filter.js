// not exactly vanilla as there is one lodash function

var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
var allPlayers = Array.from(document.querySelectorAll('.cards__card'));
var checked = {};
var button = document.querySelector('.form__button--white');

getChecked('size');
getChecked('facility');

Array.prototype.forEach.call(allCheckboxes, function (el) {
  el.addEventListener('change', toggleCheckbox);
});

function toggleCheckbox(e) {
  getChecked(e.target.name);
  if (e.hasAttribute = "checked") {
    setVisibility();
    button.style.visibility = 'visible';
  } else{
    button.style.visibility = 'hidden'; 
  }

}

function getChecked(name) {
  checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
    return el.value;
  });
}

function setVisibility() {
  allPlayers.map(function (el) {
    var size = checked.size.length ? _.intersection(Array.from(el.classList), checked.size).length : true;
    var facility = checked.facility.length ? _.intersection(Array.from(el.classList), checked.facility).length : true;
    if (size && facility) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
}