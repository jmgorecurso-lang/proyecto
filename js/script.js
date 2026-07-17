/*==================================================
                    TOOLBOX 2.0
==================================================*/

let currentCategory = "diagnostico";

/*==================================================
                    INICIO
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    init();

});

function init(){

    initClock();

    loadCategories();

    loadCategory(currentCategory);

}

/*==================================================
                    RELOJ
==================================================*/

function initClock(){

    updateClock();

    setInterval(updateClock,1000);

}

function updateClock(){

    const clock=document.getElementById("clock");

    if(!clock) return;

    clock.textContent=new Date().toLocaleTimeString();

}

/*==================================================
                CARGAR CATEGORÍAS
==================================================*/

async function loadCategories(){

    try{

        const response=await fetch("data/categories.json");

        const categories=await response.json();

        createCategoryButtons(categories);

        document.getElementById("categoryCounter").textContent=categories.length;

    }

    catch(error){

        console.error(error);

    }

}

function createCategoryButtons(categories){

    const menu=document.getElementById("categoryMenu");

    menu.innerHTML="";

    categories.forEach(category=>{

        menu.innerHTML+=`

        <button
            class="category-btn"
            onclick="loadCategory('${category.id}')">

            <i class="bi ${category.icon}"></i>

            ${category.name}

        </button>

        `;

    });

}

/*==================================================
                CARGAR HERRAMIENTAS
==================================================*/

async function loadCategory(category){

    currentCategory=category;

    try{

        const response=await fetch(`data/${category}.json`);

        const tools=await response.json();

        createCards(tools);

        updateDashboard(tools);

        document.getElementById("breadCategory").textContent=capitalize(category);

    }

    catch(error){

        console.error(error);

    }

}

/*==================================================
                CREAR TARJETAS
==================================================*/

function createCards(tools){

    const grid=document.getElementById("toolGrid");

    grid.innerHTML="";

    tools.forEach(tool=>{

        grid.innerHTML+=`

        <a
            class="tool-card"

            href="${tool.url}"

            target="viewer"

            onclick="openTool(event,'${tool.name}','${tool.description}')">

            <div class="tool-icon">

                <img src="${tool.icon}" alt="${tool.name}">

            </div>

            <h4>${tool.name}</h4>

            <p>${tool.description}</p>

        </a>

        `;

    });

}

/*==================================================
                ABRIR HERRAMIENTA
==================================================*/

function openTool(event,title){

    document.getElementById("viewerTitle").textContent=title;

    document.getElementById("breadTool").textContent=title;

    document.getElementById("statusMessage").textContent="Abriendo "+title+"...";

    showToast(title+" abierto correctamente");

    const logo=document.getElementById("appLogo");

    if(logo){

        logo.src="assets/logo/openTB.png";

    }

}

/*==================================================
                DASHBOARD
==================================================*/

function updateDashboard(tools){

    document.getElementById("toolsCounter").textContent=tools.length;

}

/*==================================================
                    TOAST
==================================================*/

function showToast(message){

    const toast=document.getElementById("toast");

    const text=document.getElementById("toastText");

    if(!toast || !text) return;

    text.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

/*==================================================
                UTILIDADES
==================================================*/

function capitalize(text){

    return text.charAt(0).toUpperCase()+text.slice(1);

}