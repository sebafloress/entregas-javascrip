const productos = [
    { id: 1, nombre: 'Pelota adidas afa22 pro', precio: 110000, cantidad: 30, imagen: './fotos/pelotaA.png' },
    { id: 2, nombre: 'Pelota orbita serie A', precio: 130000, cantidad: 20, imagen: './fotos/pelota-puma.png' },
    { id: 3, nombre: 'Canillera kick topper', precio: 13000, cantidad: 43, imagen: './fotos/canilleras.png' },
    { id: 4, nombre: 'Botines fútbol nike mercurial superfly 9 elite Fg', precio: 380000, cantidad: 15, imagen: './fotos/botines-nike.png' },
    { id: 5, nombre: 'Botines predator adidas', precio: 380000, cantidad: 15, imagen: './fotos/botines.jpeg' },
    { id: 6, nombre: 'Paleta De padel adidas metalbone Hrd 3.2', precio: 527000, cantidad: 20, imagen: './fotos/padel.png' }
];

const IVA = 0.21;
let carrito = [];
let total = 0;

const cuerpo = document.body;
const container = document.querySelector('.container');
const productosDark =document.querySelector('.Productos')
const botons =document.querySelector('botones')
const carritoDark = document.querySelector('cart')



document.addEventListener('DOMContentLoaded', function() {
    const buttonToggle = document.getElementById('toggle-button');

    buttonToggle.addEventListener('click' , function() {
        cuerpo.classList.toggle('modo-oscuro');
        container.classList.toggle('modo-oscuro');
        productosDark.classList.toggle('modo-oscuro');
        botons.classList.toggle('modo-oscuro');
        carritoDark.classList.toggle
        updateButtonText();
    })

    function updateButtonText() {
        if(cuerpo.classList.contains('modo-oscuro')) {
            buttonToggle.textContent = 'Cambiar a modo claro';
        } else {
            buttonToggle.textContent = 'Cambiar a modo oscuro';
        }
    }

    updateButtonText();
})

document.addEventListener('DOMContentLoaded', () => {

    const carritoGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('total');

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = parseFloat(totalGuardado);
        actualizarCarrito();
    }

    mostrarProductos();
    document.getElementById('filtrar-precio').addEventListener('click', filtrarProductos);
    document.getElementById('buscar-producto').addEventListener('click', buscarProducto);
    document.getElementById('mostrar-resumen').addEventListener('click', mostrarResumen);
    document.getElementById('reiniciar-compra').addEventListener('click', confirmarReinicioCompra);
});



