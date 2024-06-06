

const productos = [
    { id: 1, nombre: 'pelota adidas afa22 pro', precio: 110000, cantidad: 30 },
    { id: 2, nombre: 'pelota orbita serie A', precio: 130000, cantidad: 20 },
    { id: 3, nombre: 'canillera kick topper', precio: 13000, cantidad: 43 },
    { id: 4, nombre: 'botines fútbol nike mercurial superfly 9 elite Fg', precio: 380000, cantidad: 15 },
    { id: 5, nombre: 'botines predator adidas', precio: 380000, cantidad: 15 },
    { id: 6, nombre: 'paleta De padel adidas metalbone Hrd 3.2', precio: 527000, cantidad: 20 }
];

const IVA = 0.21;
let carrito = [];
let total = 0;

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    document.getElementById('filtrar-precio').addEventListener('click', filtrarProductos);
    document.getElementById('buscar-producto').addEventListener('click', buscarProducto);
    document.getElementById('mostrar-resumen').addEventListener('click', mostrarResumen);
});

function mostrarProductos() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        li.addEventListener('click', () => agregarAlCarrito(producto));
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

function buscarProducto() {
    const nombreProducto = prompt('Ingrese el nombre del producto a buscar:').trim().toLowerCase();
    console.log('Nombre ingresado:', nombreProducto);

    const producto = productos.find(p => p.nombre.toLowerCase().includes(nombreProducto));

    if (producto) {
        alert(`Producto encontrado: ${producto.nombre}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`);
    } else {
        alert('Producto no encontrado.');
    }
}

function filtrarProductos() {
    const maxPrecio = parseFloat(prompt('Ingrese el precio máximo:'));
    const productosFiltrados = productos.filter(p => p.precio <= maxPrecio);

    if (productosFiltrados.length > 0) {
        let mensaje = 'Productos encontrados:';
        productosFiltrados.forEach(p => {
            mensaje += `\nNombre: ${p.nombre}, Precio: ${p.precio}, Cantidad: ${p.cantidad}`;
        });
        alert(mensaje);
    } else {
        alert('No se encontraron productos con ese precio máximo.');
    }
}

function calcularIVA(total) {
    return total * IVA;
}

function mostrarResumen() {
    let descuento = parseFloat(prompt('Ingrese el porcentaje de descuento:')) || 0;
    descuento = Math.max(0, Math.min(descuento, 100)); // Asegurarse de que el descuento esté entre 0 y 100
    const montoDescuento = total * (descuento / 100);
    const totalConDescuento = total - montoDescuento;

    let resumen = 'Resumen de la compra:\n';
    carrito.forEach(producto => {
        resumen += `Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio Total: $${producto.precio * producto.cantidad}\n`;
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

