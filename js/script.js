const productos = [
    { id: 1, nombre: 'Pelota adidas afa22 pro', precio: 110000, cantidad: 30, imagen: '../fotos/botines.jpeg' },
    { id: 2, nombre: 'Pelota orbita serie A', precio: 130000, cantidad: 20, imagen: '../fotos/botines.jpeg' },
    { id: 3, nombre: 'Canillera kick topper', precio: 13000, cantidad: 43, imagen: '../fotos/botines.jpeg' },
    { id: 4, nombre: 'Botines fútbol nike mercurial superfly 9 elite Fg', precio: 380000, cantidad: 15, imagen: '../fotos/botines.jpeg' },
    { id: 5, nombre: 'Botines predator adidas', precio: 380000, cantidad: 15, imagen: '../fotos/botines.jpeg' },
    { id: 6, nombre: 'Paleta De padel adidas metalbone Hrd 3.2', precio: 527000, cantidad: 20, imagen: '../fotos/botines.jpeg' }
];

const IVA = 0.21;
let carrito = [];
let total = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito desde localStorage
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
    document.getElementById('reiniciar-compra').addEventListener('click', reiniciarCompra);
});

function mostrarProductos() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.classList.add('product-item', `product-item-${producto.id}`);
        
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.classList.add('product-image');

        const span = document.createElement('span');
        span.textContent = `${producto.nombre} - $${producto.precio}`;
        
        const button = document.createElement('button');
        button.textContent = 'Agregar al carrito';
        button.classList.add(`botonAgregarCarrito`);
        button.addEventListener('click', () => agregarAlCarrito(producto));
        
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(button);
        productList.appendChild(li);
    });
}

function agregarAlCarrito(productoSeleccionado) {
    let indiceEnCarrito = carrito.findIndex(item => item.id === productoSeleccionado.id);

    if (indiceEnCarrito !== -1) {
        carrito[indiceEnCarrito].cantidad += 1;
        total += productoSeleccionado.precio;
    } else {
        carrito.push({ id: productoSeleccionado.id, nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, cantidad: 1 });
        total += productoSeleccionado.precio;
    }

    actualizarCarrito();
    guardarCarritoEnLocalStorage(); // Actualizar localStorage después de modificar el carrito
}

function actualizarCarrito() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} x${producto.cantidad}: $${producto.precio * producto.cantidad}`;
        cartList.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total}`;
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toString());
}


function buscarProducto() {
    const nombreProducto = document.getElementById('nombre-producto').value.trim().toLowerCase();
    console.log('Nombre ingresado:', nombreProducto);

    const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(nombreProducto));

    const filteredProductList = document.getElementById('filtrar-productos-list');
    filteredProductList.innerHTML = '';

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `Producto encontrado: ${p.nombre}, Precio: $${p.precio}, Cantidad: ${p.cantidad}`;
            filteredProductList.appendChild(li);
        });
    } else {
        filteredProductList.textContent = 'Producto no encontrado.';
    }
}

function filtrarProductos() {
    const maxPrecio = parseFloat(document.getElementById('max-precio').value) || 0;
    const productosFiltrados = productos.filter(p => p.precio <= maxPrecio);

    const filteredProductList = document.getElementById('filtrar-productos-list');
    filteredProductList.innerHTML = '';

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(p => {
            const li = document.createElement('li');
            li.textContent = ` ${p.nombre}, Precio: $${p.precio}, Cantidad: ${p.cantidad}`;
            filteredProductList.appendChild(li);
        });
    } else {
        filteredProductList.textContent = 'No se encontraron productos con ese precio máximo.';
    }
}

function calcularIVA(total) {
    return total * IVA;
}

function mostrarResumen() {
    let descuento = parseFloat(document.getElementById('descuento').value) || 0;
    descuento = Math.max(0, Math.min(descuento, 100)); // Asegurarse de que el descuento esté entre 0 y 100
    const montoDescuento = total * (descuento / 100);
    const totalConDescuento = total - montoDescuento;

    let resumen = 'Resumen de la compra:\n';
    carrito.forEach(producto => {
        resumen += `${producto.nombre}, Cantidad: ${producto.cantidad}, Precio Total: $${producto.precio * producto.cantidad}\n`;
    });

    const iva = calcularIVA(totalConDescuento);
    const totalConIVA = totalConDescuento + iva;

    resumen += `Subtotal: $${total}\n`;
    resumen += `Descuento (${descuento}%): -$${montoDescuento.toFixed(2)}\n`;
    resumen += `Subtotal con Descuento: $${totalConDescuento.toFixed(2)}\n`;
    resumen += `IVA (21%): $${iva.toFixed(2)}\n`;
    resumen += `Total a pagar: $${totalConIVA.toFixed(2)}`;

    document.getElementById('resumen-compra').textContent = resumen;
}
function reiniciarCompra() {
    carrito = [];
    total = 0;
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
    document.getElementById('resumen-compra').textContent = '';
    document.getElementById('descuento').value = 0;
}