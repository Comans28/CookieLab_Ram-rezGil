console.log("CookieLab iniciado");

// Función para buscar una cookie específica
function leerCookie(nombre) {
    let cookies = document.cookie.split(';');
    for (let c of cookies) {
        let [clave, valor] = c.trim().split('=');
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }
    return null;
}

// --- FASE 2: El Guard ---
let usuario = leerCookie('usuario');

if (!usuario) {
    // Si NO hay cookie (primera visita), preguntamos
    let nombre = prompt("¿Cómo te llamas?");
    if (nombre) {
        let segundos = 30 * 24 * 60 * 60; // 30 días
        document.cookie = `usuario=${encodeURIComponent(nombre)}; max-age=${segundos}; path=/`;
        document.getElementById('saludo').innerText = `¡Bienvenido/a, ${nombre}!`;
    }
} else {
    // Si YA hay cookie, saludamos directamente sin prompt
    document.getElementById('saludo').innerText = `Hola de nuevo, ${usuario}`;
}
// --- FASE 3: Preferencias ---
function aplicarPreferencias() {
    let tema = leerCookie('tema') || 'claro';
    let idioma = leerCookie('idioma') || 'es';
    let nombreUsuario = leerCookie('usuario'); // Leemos el nombre para poder saludar

    // Aplicar el modo oscuro según la cookie
    if (tema === 'oscuro') {
        document.body.classList.add('oscuro');
        document.getElementById('select-tema').value = 'oscuro';
    } else {
        document.body.classList.remove('oscuro');
        document.getElementById('select-tema').value = 'claro';
    }

    // Aplicar el idioma seleccionado
    document.getElementById('select-idioma').value = idioma;
    
    // Cambiar el saludo según el idioma
    if (nombreUsuario) {
        if (idioma === 'en') {
            document.getElementById('saludo').innerText = `Welcome back, ${nombreUsuario}`;
        } else {
            document.getElementById('saludo').innerText = `Hola de nuevo, ${nombreUsuario}`;
        }
    }
}

// Evento para guardar el tema al cambiar el desplegable
document.getElementById('select-tema').addEventListener('change', (e) => {
    let valor = e.target.value;
    document.cookie = `tema=${valor}; max-age=${30*24*60*60}; path=/`;
    aplicarPreferencias();
});

// Evento para guardar el idioma al cambiar el desplegable
document.getElementById('select-idioma').addEventListener('change', (e) => {
    let valor = e.target.value;
    document.cookie = `idioma=${valor}; max-age=${30*24*60*60}; path=/`;
    aplicarPreferencias(); // Ahora sí actualiza el texto al momento
});

// Ejecutar al cargar la página
aplicarPreferencias();