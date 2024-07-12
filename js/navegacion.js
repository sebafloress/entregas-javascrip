document.addEventListener('DOMContentLoaded', () => {
    const cabecera = document.getElementById('header');
    const navegacion = document.createElement('div'); 
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    const links = ["Inicio", "Partidos", "Login"];
    const liImagen = document.createElement('li');
    const img = document.createElement('img');
    const ORIGEN = document.createElement('a');

    navegacion.className = 'navbar';

    const isIndex = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
    const enlaces = isIndex ? "./" : "../";

    ORIGEN.href = `${enlaces}index.html`;
    ORIGEN.appendChild(img);
    img.src = `${enlaces}fotos/pelota.png`;
    img.alt = 'inicio';
    liImagen.appendChild(ORIGEN);
    ul.appendChild(liImagen);

    const linkMap = {
        "Inicio": `${enlaces}index.html`,
        "Partidos": `${enlaces}pages/contactos.html`,
        "Login": `${enlaces}pages/login.html`
    };

    for (const link of links) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${linkMap[link]}">${link}</a>`;
        ul.appendChild(li);
    }

    navegacion.appendChild(nav);
    nav.appendChild(ul);
    cabecera.appendChild(navegacion);
});



document.addEventListener('DOMContentLoaded', function() {
    createFooter();
});

function createFooter() {
    const footer = document.createElement('footer');
    footer.style.backgroundColor = '#333';
    footer.style.color = 'white';
    footer.style.padding = '10px 20px';
    footer.style.textAlign = 'center';

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    
    footer.innerHTML = `
        <p>&copy; ${year} Mi Sitio Web. Todos los derechos reservados.</p>
        <p>
            <a href="https://www.twitter.com" target="_blank" style="color: white; margin: 0 10px;">Twitter</a>
            <a href="https://www.facebook.com" target="_blank" style="color: white; margin: 0 10px;">Facebook</a>
            <a href="https://www.instagram.com" target="_blank" style="color: white; margin: 0 10px;">Instagram</a>
        </p>
    `;
    document.body.appendChild(footer);
}

