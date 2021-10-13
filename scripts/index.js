let herosList = document.querySelector("#heros");
const IMG_BASE_URL = 'https://starwars-visualguide.com/assets/img/characters/${id}.jpg'
let heros = []
let count;
let current_page = 1;
let records_per_page = 1;

const generateButtons = (index) => {
    return `
        <div id="list_element_${index}" class="list_element">
            <input type="text" id="input_${index}" />

            <button>
                Change name
            </button>
        </div>`
}

const prevPage = () => {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

const nextPage = () => {
    if (current_page< numPages() ) {
        current_page++;
        changePage(current_page);
    }
}

const changePage = (page) => {
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    herosList.innerHTML = "";

    for (let i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        herosList.innerHTML += generateHeroLayout(heros[i], i);
    }



    let btn_next = document.getElementById("btn_next");
    let btn_prev = document.getElementById("btn_prev");
    let page_span = document.getElementById("page");
    let pages = document.getElementById("pages");

    let current_page1 = document.getElementById("current_page");

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    }else {
        btn_next.style.visibility = "visible";
    }

    page_span.innerHTML = page;
    pages.innerHTML = count;
    btn_prev.innerHTML = current_page-1;
    current_page1.innerHTML = current_page;
    btn_next.innerHTML = current_page+1;


}

const numPages = () => {
    return Math.ceil(heros.length / records_per_page);
}

const generateHeroLayout = (heroData, index) => {

    let heroUrl = heroData.url;
    let splitted = heroUrl.split('/');
    let heroId = splitted[splitted.length - 2];

    const heroImgUrl = IMG_BASE_URL.replace('${id}', heroId);

  return `<li class="hero-element">
    <div>
      <img src="${heroImgUrl}" alt=""/>
    </div>
    <div class="hero-details">
        <span>
        name: ${heroData.name}
        </span>
        <span>
        height: ${heroData.height}
        </span>
        <span>
        mass: ${heroData.mass}
        </span>
        <span>
        hair_color: ${heroData.hair_color}
        </span>
        <span>
        skin_color: ${heroData.skin_color}
        </span>
        <span>
        eye_color: ${heroData.eye_color}
        </span>
        <span>
        birth_year: ${heroData.birth_year}
        </span>
        <span>
        skin_color: ${heroData.skin_color}
        </span>
        <span>
          gender ${heroData.gender}
        </span>
    </div>
    </li>
    <div id=pag>
      <a href="javascript:prevPage()" style="text-decoration: none" id="btn_prev">  </a>

      <a href="javascript:changePage(current_page)"  id="current_page">  </a>

      <a href="javascript:nextPage()" style="text-decoration: none" id="btn_next">  </a>
      <br> page: <span id="page"></span>  of  <span id="pages"></span>
    </div>`;
};

const generateList = (heros) => {
  herosList.innerHTML = '';
  for (let i = 0; i < records_per_page; i++) {
    herosList.insertAdjacentHTML("beforeend", generateHeroLayout(heros[i], i));
  }
};

const handleInputChange = (event) => {
    console.log(event.target.value)
}

const handleBtnClick = (heroName, index) => {
    const hero = heros[index]
    hero.name = heroName;
    generateList(heros)
    const lis = document.querySelectorAll('li')
    const toChangeLi = lis[index]

    toChangeLi.classList.add('red');
}

fetch("https://swapi.dev/api/people")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    heros = data.results;
    count = data.count;
	console.log(count);

    for(let i = 2; i <= 9; i++){
      fetch("https://swapi.dev/api/people/?page=3".replace('3', i)).then((response) => {return response.json();}).then((dat) => {
        heros = heros.concat(dat.results);
      })

    }
    changePage(1)
    // const listElements = document.querySelectorAll('.list_element')
    //
    // for(let i = 0; i < listElements.length; i++) {
    //     const el = listElements[i];
    //     const [input, button] = el.children
    //
    //     button.addEventListener('click', () => handleBtnClick(input.value, i))
    //
    //    input.addEventListener('input', handleInputChange);
    // }
  });
