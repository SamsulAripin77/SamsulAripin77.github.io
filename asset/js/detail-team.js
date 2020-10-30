import {
    getTeamById,
    getSavedTeamById
} from './api.js'

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isFormSaved = urlParams.get('saved');
    if (isFormSaved) {
        const item = getSavedTeamById();
    } else {
        getTeamById();
    }

});