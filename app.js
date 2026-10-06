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