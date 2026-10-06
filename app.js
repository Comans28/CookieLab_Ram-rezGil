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
// --- FASE 4: Contador de visitas ---
let visitas = leerCookie('visitas');

if (!visitas) {
    visitas = 1;
} else {
    visitas = Number(visitas) + 1;
}

// Guardamos el nuevo valor
document.cookie = `visitas=${visitas}; max-age=${30*24*60*60}; path=/`;

// Mostramos el texto debajo del saludo
let saludoElem = document.getElementById('saludo');
if(saludoElem) {
    saludoElem.innerHTML += `<br><br><small>Has visitado esta página ${visitas} veces.</small>`;
}
// --- FASE 5: Panel de control ---
document.getElementById('btn-cambiar').addEventListener('click', () => {
    let nuevoNombre = prompt("Introduce tu nuevo nombre:");
    if (nuevoNombre) {
        document.cookie = `usuario=${encodeURIComponent(nuevoNombre)}; max-age=${30*24*60*60}; path=/`;
        location.reload(); // Recarga para actualizar el saludo
    }
});

document.getElementById('btn-olvidar').addEventListener('click', () => {
    if (confirm("¿Estás seguro de que quieres borrar todos tus datos?")) {
        // Borramos todas las cookies poniéndoles max-age=0
        document.cookie = "usuario=; max-age=0; path=/";
        document.cookie = "tema=; max-age=0; path=/";
        document.cookie = "idioma=; max-age=0; path=/";
        document.cookie = "visitas=; max-age=0; path=/";
        location.reload(); // Recarga para reiniciar la web
    }
});
// --- FINAL NOTA: Fecha y Caducidad Corta ---

// 1. Mostrar y guardar la fecha de la última visita
let ultimaVisita = leerCookie('ultimaVisita');
if (ultimaVisita) {
    let saludoElem = document.getElementById('saludo');
    if (saludoElem) {
        saludoElem.innerHTML += `<br><br><small>Tu última visita fue el ${ultimaVisita}</small>`;
    }
}
// Guardamos la fecha y hora de hoy para la próxima vez
let fechaHoy = new Date().toLocaleString();
document.cookie = `ultimaVisita=${encodeURIComponent(fechaHoy)}; max-age=${30*24*60*60}; path=/`;

// 2. Cookie de caducidad corta (1 minuto = 60 segundos)
document.cookie = "cookieEfimera=DesaparecerePronto; max-age=60; path=/";