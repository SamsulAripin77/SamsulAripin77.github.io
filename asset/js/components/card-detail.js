import {
    getTeamById
} from '../api.js'

class CardDetail extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
        this.manageButton()
        this.hideSaveButton()
    }

    set team(team) {
        this._team = team;
        this.render()
    }

    hideSaveButton() {
        const id = this._team.id
        const arryId = [];
        const btnSaved = document.querySelector('#save');
        getAll().then((teams) => {
            teams.forEach((team) => {
                arryId.push(team.id);
            });
            if (arryId.includes(id)) {
                btnSaved.style.display = 'none';
                console.log('none element')

            }
        });
    }

    manageButton() {
        const urlParams = new URLSearchParams(window.location.search);
        const isFormSaved = urlParams.get('saved');
        const saved = document.querySelector('#save');
        const btnDelete = document.querySelector('#delete')

        if (isFormSaved) {
            saved.style.display = 'none';
            btnDelete.onclick = () => {
                const id = this._team.id;
                deleteById(id)
                var toastHTML = '<span>Team Deleted</span>';
                M.toast({
                    html: toastHTML,
                    classes: 'red',
                    displayLength: 1000,
                    completeCallback: function() {
                        window.location.href = 'index.html#saved'
                    }
                });
            }
        } else {
            btnDelete.style.display = 'none'
            saved.onclick = function() {
                console.log('tombol fad di clik');
                const item = getTeamById()
                console.log(item)
                item
                    .then((team) => {
                        saveForLater(team)
                    })
                    .then(() => {
                        var toastHTML = '<span>Team Saved</span>';
                        M.toast({
                            html: toastHTML,
                            displayLength: 1000,
                            classes: 'teal',
                            completeCallback: function() {
                                window.location.href = 'index.html#saved'
                            }
                        });
                    })

            };
        }
    }

    render() {
        this.innerHTML = `
          <div class="card indigo darkern-3">
              <div class="card-content white-text">
                  <div class="row">
                      <div class="col s12 m6 l4 center">
                          <img height="300" width="300" class="responsive-img" src="${this._team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="gambar team">
                      </div>
                      <div class="col s12 m6 l8">
                           <h4>${this._team.name}</h4>
                           <div class="row">
                               <div class="col s3">Founded</div>
                               <div class="col s9">${this._team.founded}</div>
                               <div class="col s3">Email</div>
                               <div class="col s9">${this._team.email}</div>
                               <div class="col s3">Venue</div>
                               <div class="col s9">${this._team.venue}</div>
                               <div class="col s3">Address</div>
                               <div class="col s9">${this._team.address}</div>
                               <div class="col s3">Phone</div>
                               <div class="col s9">${this._team.phone}</div>
                               <div class="col s3">Website</div>
                               <div class="col s9">${this._team.website}</div>
                           </div>
                      </div>
                  </div>
              </div>
                <div class="card-action right-align">
                    <a class="btn amber darken-3" id="save">Save</a>  
                    <a href="#" class="btn red" id="delete">Delete</a>
                </div>
              
          </div>
    `
    }

}

customElements.define('card-detail', CardDetail)