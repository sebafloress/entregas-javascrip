document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageElement = document.getElementById('loginMessage');

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // buscar el usuario en la lista de usuarios
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // guardar información de inicio de sesión en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // Mostrar mensaje de éxito
        messageElement.className = 'message success';
        messageElement.textContent = 'Inicio de sesión exitoso';
        displayLogoutContainer(username);
    } else {
        // mostrar mensaje de error
        messageElement.className = 'message error';
        messageElement.textContent = 'Nombre de usuario o contraseña incorrectos';
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const messageElement = document.getElementById('registerMessage');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.username === username);

    if (userExists) {
        // mostrar mensaje de error
        messageElement.className = 'message error';
        messageElement.textContent = 'El nombre de usuario ya existe';
    } else {
        // agregar el nuevo usuario a la lista de usuarios
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Mostrar mensaje de éxito
        messageElement.className = 'message success';
        messageElement.textContent = 'Usuario registrado exitosamente';
    }
});

// Manejo del botón de cierre de sesión
document.getElementById('logoutButton').addEventListener('click', function() {
    // Limpiar información de inicio de sesión en localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Recargar la página para actualizar el estado de inicio de sesión
    window.location.reload();
});

// Verificar si el usuario ya está logueado al cargar la página
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const username = localStorage.getItem('username');
        displayLogoutContainer(username);
    }
};

function displayLogoutContainer(username) {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('registerFormContainer').style.display = 'none';
    document.getElementById('logoutContainer').style.display = 'flex';
    document.getElementById('usernameDisplay').textContent = username;
}
