
let reservas = JSON.parse(localStorage.getItem('chifa_db')) || [];

document.addEventListener('click', () => {
    const music = document.getElementById('music');
    if (music.paused) {
        music.volume = 0.3;
        music.play();
    }
}, { once: true });

function abrirLogin() {
    document.getElementById('modalLogin').style.display = 'block';
}

function cerrarLogin() {
    document.getElementById('modalLogin').style.display = 'none';
}

function validarAcceso() {
    const u = user.value;
    const p = pass.value;

    if (u === "admin" && p === "admin123") renderAdmin("Admin");
    else alert("Acceso denegado");
}

function renderAdmin(rol) {
    cerrarLogin();
    adminPanel.style.display = 'block';
    adminTitle.innerText = `Panel ${rol}`;

    bodyReservas.innerHTML = "";
    reservas.forEach((r, i) => {
        bodyReservas.innerHTML += `
        <tr>
            <td>#${r.id}</td>
            <td>
                <b>${r.nombre}</b><br>
                <small>${r.correo}</small>
            </td>
            <td>${r.tipo}</td>
            <td>${r.zona}</td>
            <td title="${r.comentario}">${r.estado}</td>
            <td>
                <button onclick="borrar(${i})">Eliminar</button>
            </td>
        </tr>`;
    });
}

document.getElementById('formReserva').addEventListener('submit', e => {
    e.preventDefault();

    const reserva = {
        id: Math.floor(Math.random() * 900) + 100,
        nombre: nombre.value,
        correo: email.value,
        tipo: tipo_reserva.value,
        zona: document.querySelector('input[name="zona"]:checked').value,
        comentario: mensaje.value,
        estado: "Nuevo"
    };

    reservas.push(reserva);
    localStorage.setItem('chifa_db', JSON.stringify(reservas));
    alert("Reserva registrada");
    e.target.reset();
});

function borrar(i) {
    reservas.splice(i, 1);
    localStorage.setItem('chifa_db', JSON.stringify(reservas));
    renderAdmin("Admin");
}

function cerrarSesion() {
    adminPanel.style.display = 'none';
}
