let ahadis =[];
async function  GetData( ) {
    let request = await fetch(`https://hadis-api-id.vercel.app/hadith/abu-dawud?page=2&limit=300`)

    let data = await request.json();
    ahadis = data.items;
    DisplayNews()
}
GetData();

let hadisNum = 0;

function DisplayNews() {
    let temp="";
    let hadisindex = 0;
    for (let i = 0; i < ahadis.length; i++) {
    temp = `"${ahadis[hadisNum].arab}"`;
    hadisindex = `${hadisNum} - ${ahadis.length}`;
    }
    document.getElementById("hadisApi").innerHTML=temp;
    document.getElementById("index").innerHTML=hadisindex;

}

let next = document.querySelector(".hadis .next")
let prev = document.querySelector(".hadis .prev")

next.addEventListener("click", function () {
    hadisNum++;
    if (hadisNum > ahadis.length - 1) {
        hadisNum = 0;
    }
    DisplayNews();
})

prev.addEventListener("click", function () {
    hadisNum--;
    if (hadisNum < 0) {
        hadisNum = ahadis.length - 1;
    }   
    DisplayNews();
})

// quraan

let quraan =[];
async function  GetDataQuran( ) {
    let request = await fetch(`https://api.alquran.cloud/v1/surah`)

    let res = await request.json();
quraan = res.data;
   Displayquran() 
   ayaatEvent(); 
}
GetDataQuran();

function Displayquran() {
    let temp="";
    for (let i = 0; i < 114; i++) {
    temp += `
    <div index-surah="${quraan[i].number}"  class="card ">
    <div class="ar"> ${quraan[i].name}</div>
    <div class="en">${quraan[i].englishName}</div>
</div>`;
    }
    document.getElementById("quranCardApi").innerHTML=temp;

}

// ayaat

 function ayaatEvent(){
    let cards =document.querySelectorAll(".quran .card ") ;
    let surahNum ;
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
        surahNum = this.getAttribute("index-surah");
        GetDataAyaat(surahNum);
        pop.style.display="block"
        navbar.style.display="none";

    })   
}}

let ayaat=[];
async function  GetDataAyaat(surahNum) {
    let request = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`)

    let res = await request.json();
    ayaat = res.data.ayahs
   DisplayAyaat() 
}

function DisplayAyaat() {
    let temp="";
    for (let i = 0; i < ayaat.length; i++) {
    temp += `<div class="aya">${ayaat[i].text} (${ayaat[i].numberInSurah})</div>`;

    }
    document.getElementById("ayaatApi").innerHTML=temp;

}



// salah times api
function Displaysalah()  {
    let temp="";
    // let hadisindex = 0;
    for (let i = 0; i < keyNames.length; i++) {
    temp += `<div class="cardd">
    <div class="circle">
        <svg>
            <Circle cx="100" cy="100" r="100"></Circle>
        </svg>
        <div class="prayTime" >${salahTimes[keyNames[i]]}</div>
    </div>
    <p>${keyNames[i]}</p>
</div>`;

    }
    document.getElementById("salahApi").innerHTML=temp;
}

let salahTimes ;
var keyNames;
async function  GetDatasalah( ) {
    let request = await fetch(`https://api.aladhan.com/v1/calendar/2023/4?latitude=51.508515&longitude=-0.1254872&method=2     `)

    let res = await request.json();
    salahTimes = res.data[12].timings
    keyNames = Object.keys(salahTimes);
Displaysalah();

}
GetDatasalah();




// navBar

let navbar = document.getElementById('navBar');


window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    navbar.classList.add('scrolled');

  } else {
    navbar.classList.remove('scrolled');
  }
});

//close button

let close =document.querySelector(".ayaatPopUp .btn-close")
let pop =document.querySelector(".ayaatPopUp")


close.addEventListener("click",function(){

pop.style.display="none";
navbar.style.display="block";


})
let shortcutNav =document.querySelector(".navbar-inner .shortcut")
let ulNav =document.querySelector(".navbar-inner ul")
shortcutNav.addEventListener("click" , function(){
    if (ulNav.style.display === 'none') {
        ulNav.style.display = 'flex';
      } else {
        ulNav.style.display = 'none';
      }

})

// Create a media query that matches screens with a maximum width of 768px
const mediaQuery = window.matchMedia('(max-width: 768px)');

// Define a function to handle the media query
function handleMediaQuery(mediaQuery) {
  if (mediaQuery.matches) {
    // Code to execute when screen size is <= 768px
    // console.log('Screen size is less than or equal to 768px');
    ulNav.style.display = 'none';
  } else {
    // Code to execute when screen size is > 768px
    // console.log('Screen size is greater than 768px');
    ulNav.style.display = 'flex';
  }
}
// Call the function to initially apply the correct logic based on screen size
handleMediaQuery(mediaQuery);

// Add an event listener to the media query that calls the function when the screen size changes
mediaQuery.addListener(handleMediaQuery);


// indicator logo to home

const logo = document.getElementById('logo');

logo.addEventListener('click', () => {
  const home = document.querySelector('.home');
  home.scrollIntoView({ behavior: 'smooth' });
});