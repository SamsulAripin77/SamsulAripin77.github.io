class CardItem extends HTMLElement {
    constructor() {
        super()
        this.cardColor = [{
            color: "red darken-1",
            bg: "bg1"
        }, {
            color: "brown darken-1",
            bg: "bg2"
        }, {
            color: "deep-purple darken-1",
            bg: "bg3"
        }, {
            color: "purple accent-3",
            bg: "bg4"
        }, {
            color: "blue darken-2",
            bg: "bg5"
        }, {
            color: "cyan lighten-1",
            bg: "bg6"
        }, {
            color: "light-blue darken-1",
            bg: "bg7"
        }, {
            color: "yellow darken-3",
            bg: "bg8"
        }, {
            color: "amber darken-1",
            bg: "bg9"
        }, {
            color: "orange darken-1",
            bg: "bg10"
        }, {
            color: "light-green accent-3",
            bg: "bg11"
        }, ];

    }

    connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get('id');
        this.saved = window.location.hash.substr(1)
        this.render()
    }

    set team(team) {
        this._team = team;
        this.render()
    }

    render() {
        this.getRandom = Math.floor(Math.random() * this.cardColor.length);
        this.href = this.saved === 'saved' ?
            `./detail.html?id=${this._team.id}&saved=true` :
            `./detail.html?id=${this._team.id}`;
        this.innerHTML = ` 
      <div class="col l4 m4 s12">
          <div class="card">
              <a href="${this.href}" class="card-bg card-content white-text" style="background-image: url('./asset/img/${this.cardColor[this.getRandom].bg}.webp');">
                  <div class=" center relative">
                          <img width="60" height="60" class="absolute circle white img-circle" src="${this._team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="gambar team">
                  </div>
              </a>
              <div class="card-action center-align white-text ${this.cardColor[this.getRandom].color}">
                  <h6><strong>${this._team.shortName}</strong></h6>
              </div>
          </div>
      </div>
    `
    }
}

customElements.define('card-item', CardItem)