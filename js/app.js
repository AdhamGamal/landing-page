// Define Global Variables
const sections = document.querySelectorAll('section');
let prevPos = 0;
const up = true;
const down = false;
let dir = down;

let scrollPos = 0;
let speed = 100

// build the nav
function buildNav(){

  const navbar__list = document.getElementById('navbar__list');

  const myDocFrag = document.createDocumentFragment();
  sections.forEach(section => {
    // create link
    const a = document.createElement('a');
    a.className = 'menu__link';
    a.href = '#'+section.id;
    a.innerText = section.dataset.nav;

    // create list item and add link to it
    const li = document.createElement('li');
    li.appendChild(a);
    //Add scroll acton on Click Event
    li.addEventListener('click',(event) => {
      event.preventDefault();

      // section.scrollIntoView(); //too easy :D I don't feel any different

      // alternative solution, bit harder but nice
      scrollPos = section.offsetTop;
      speed = 100; // you can increase scroll speed here
      scroll();
    })
    myDocFrag.appendChild(li);
  });

  navbar__list.appendChild(myDocFrag);

}

function scroll(){
  const currentPos = window.pageYOffset;
  const distance = scrollPos - currentPos;
  if ((distance > 0 && distance < speed) || (distance < 0 && distance > -speed)) speed -= speed / 2;
  if (distance < 0) {
    window.scrollBy({  top: -speed,  left: 0,  behavior: 'smooth'  });
    window.requestAnimationFrame(scroll);
  }else if(distance > 0) {
    window.scrollBy({  top: speed,  left: 0,  behavior: 'smooth'  });
    window.requestAnimationFrame(scroll);
  }
}


function isVisible(section, pos) {

  const coords = section.getBoundingClientRect();
  const top = Math.floor(coords.top);
  const bottom = Math.floor(coords.bottom);

  let threshold = 250;
  if (dir == up) {
    threshold = 500;
  }
  if (pos < prevPos) {
    dir = up;
    threshold=500;
  }
  if (pos > prevPos) {
    dir = down;
  }

  prevPos=pos;
  return top < threshold && bottom >= threshold;

}

function init(){

  buildNav();

  // Add class 'active' to section when near top of viewport
  window.addEventListener('scroll',(event)=>{
    const pos = window.pageYOffset;
    sections.forEach(section => {
      isVisible(section, pos) ? section.classList.add('active') : section.classList.remove('active');
    });
  })
}

init();
