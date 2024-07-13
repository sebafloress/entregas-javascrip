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
const productosDark = document.querySelector('.Productos');
const botones = document.querySelectorAll('.botones');
const filtrarProductosElement = document.querySelector('.filtrar-productos');
const cart = document.querySelector('.cart');

document.addEventListener('DOMContentLoaded', function() {
    const buttonToggle = document.getElementById('toggle-button');


    if (localStorage.getItem('modoOscuro') === 'true') {
        activarModoOscuro();
    }

    buttonToggle.addEventListener('click', function() {
        const modoOscuroActivo = cuerpo.classList.toggle('modo-oscuro');
        container.classList.toggle('modo-oscuro');
        productosDark.classList.toggle('modo-oscuro');
        botones.forEach(boton => boton.classList.toggle('modo-oscuro'));
        filtrarProductosElement.classList.toggle('modo-oscuro');
        cart.classList.toggle('modo-oscuro');
        
        
        localStorage.setItem('modoOscuro', modoOscuroActivo);

        updateButtonText(modoOscuroActivo);
    });

    function activarModoOscuro() {
        cuerpo.classList.add('modo-oscuro');
        container.classList.add('modo-oscuro');
        productosDark.classList.add('modo-oscuro');
        botones.forEach(boton => boton.classList.add('modo-oscuro'));
        filtrarProductosElement.classList.add('modo-oscuro');
        cart.classList.add('modo-oscuro');
    }

    function updateButtonText(modoOscuroActivo) {
        if (modoOscuroActivo) {
            buttonToggle.textContent = 'Cambiar a modo claro';
        } else {
            buttonToggle.textContent = 'Cambiar a modo oscuro';
        }
    }

    updateButtonText(cuerpo.classList.contains('modo-oscuro'));
});

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