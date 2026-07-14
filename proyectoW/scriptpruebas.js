const boton = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

boton.addEventListener("click", () => {
    menu.classList.toggle("mostrar");
});