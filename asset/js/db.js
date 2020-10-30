const dbPromised = idb.open('football-team', 1, (upgradeDb) => {
    const teamObjectStore = upgradeDb.createObjectStore('teams', {
        keyPath: 'id',
    });
    teamObjectStore.createIndex('name', 'name', {
        unique: false,
    });
});

function saveForLater(team) {
    dbPromised
        .then((db) => {
            const tx = db.transaction('teams', 'readwrite');
            const store = tx.objectStore('teams');
            store.add(team);
            return tx.complete;
        })
        .then(() => {
            console.log('artikel berhasil disimpan di index db');
        })
        .catch((error) => {
            console.log(`error => ${error}`);
        });
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
                const tx = db.transaction('teams', 'readonly');
                const store = tx.objectStore('teams');
                return store.getAll();
            })
            .then((teams) => {
                resolve(teams);
            });
    });
}

function getTeamByName(name) {
    dbPromised.then((db) => {
        const tx = db.transaction('teams', 'readonly');
        const store = tx.objectStore('teams');
        const nameIndex = store.index('name');
        const range = IDBKeyRange.bound(`${name + name}\uffff`);
        return nameIndex.getAll(range);
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
                const tx = db.transaction('teams', 'readonly');
                const store = tx.objectStore('teams');
                console.log(store.get(id));
                return store.get(id);
            })
            .then((team) => {
                console.log(team);
                resolve(team);
            });
    });
}

function deleteById(id) {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            const tx = db.transaction('teams', 'readwrite');
            const store = tx.objectStore('teams');
            store.delete(id);
            return tx.complete;
        }).then(() => {
            console.log('Item deleted');
            const detail = document.querySelector('#detail-content').innerHTML = '';
        });
    });
}