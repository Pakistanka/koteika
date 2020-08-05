
// var tl = gsap.timeline({paused: true});

// tl.to(".preview", {display: none})
//   .to(".questions", {display: flex});



// function play() {
//   tl.play();
// }

// reverse.onclick = function() {
//   tl.reverse();
// }

var button = document.querySelector('.button');
var questions = document.querySelector('.questions');
var preview = document.querySelector('.preview');
console.log("hm")
button.addEventListener('click', function() {
  console.log("wow");
  preview.style.display = "none";
  questions.style.display = "flex";
})

