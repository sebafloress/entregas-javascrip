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
        button.addEventListener('click', () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Su producto se agrego al carrito",
                showConfirmButton: false,
                timer: 1500
            });
        })
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
    Swal.fire({
        title: "Ingrese el nombre del producto",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Buscar",
        showLoaderOnConfirm: true,
        preConfirm: (nombreProducto) => {
            const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(nombreProducto.toLowerCase()));
            return productosFiltrados;
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const productosFiltrados = result.value;

            if (productosFiltrados.length > 0) {
                let resultadoHTML = '<ul>';
                productosFiltrados.forEach(p => {
                    resultadoHTML += `<li>${p.nombre}, Precio: $${p.precio}, Cantidad: ${p.cantidad}</li>`;
                });
                resultadoHTML += '</ul>';

                Swal.fire({
                    title: 'Productos encontrados',
                    html: resultadoHTML,
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Producto no encontrado',
                    icon: 'error'
                });
            }
        }
    });
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
    Swal.fire({
        title: 'Resumen de la compra',
        text: resumen,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });

    document.getElementById('resumen-compra').textContent = resumen;

}

function confirmarReinicioCompra() {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar la compra'
    }).then((result) => {
        if (result.isConfirmed) {
            reiniciarCompra();
            Swal.fire(
                '¡COMPRADO!',
                'Tu compra se ha realizado.',
                'success'
            )
        }
    })
}
function reiniciarCompra() {
    carrito = [];
    total = 0;
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
    document.getElementById('resumen-compra').textContent = '';
    document.getElementById('descuento').value = 0;

}
