console.log("CookieLab iniciado");

let nombre = prompt("¿Cómo te llamas?");
if (nombre) {
    let segundos = 30 * 24 * 60 * 60; // 30 días
    document.cookie = `usuario=${encodeURIComponent(nombre)}; max-age=${segundos}; path=/`;
    alert(`¡Bienvenido/a, ${nombre}!`);
}