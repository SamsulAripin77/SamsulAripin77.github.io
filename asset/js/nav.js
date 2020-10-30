import {
    getTeam,
    getTeamById,
    getSavedTeams
} from './api.js'
// Activate sidebar nav
const elems = document.querySelectorAll('.sidenav');
M.Sidenav.init(elems);
loadNav();

function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
                elm.innerHTML = xhttp.responseText;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
                elm.addEventListener('click', (event) => {
                    // Tutup sidenav
                    const sidenav = document.querySelector('.sidenav');
                    M.Sidenav.getInstance(sidenav).close();

                    // Muat konten halaman yang dipanggil
                    page = event.target.getAttribute('href').substr(1);
                    loadPage(page);
                });
            });
        }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
}

// Load page content
let page = window.location.hash.substr(1);
if (page == '') page = 'home';
loadPage(page);


function loadPage(page) {
    const titleOffline = document.querySelector('#offline-team')
    const titleOnline = document.querySelector('#online-team')
    if (page === 'home') {
        getTeam();
        title.innerHTML = 'All Teams'
    } else if (page === 'saved') {
        getSavedTeams();
        title.innerHTML = 'Saved Teams'
    } else {
        content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
    }
}


function showDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFormSaved = urlParams.get('saved');
    if (isFormSaved) {
        getSavedTeamById()
    } else {
        getTeamById()
    }
}