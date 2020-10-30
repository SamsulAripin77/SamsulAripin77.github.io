function cardItem(team, saved) {
    const cardColor = [{
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
    const getRandom = Math.floor(Math.random() * cardColor.length);
    const href = saved ?
        `./detail.html?id=${team.id}&saved=true` :
        `./detail.html?id=${team.id}`;
    return ` 
      <div class="col l4 m4 s12">
          <div class="card">
              <a href="${href}" class="card-bg card-content white-text" style="background-image: url('./asset/img/${cardColor[getRandom].bg}.jpg');">
                  <div class=" center relative">
                          <img width="60" height="60" class="absolute circle white img-circle" src="${team.crestUrl}" alt="gambar team">
                  </div>
              </a>
              <div class="card-action center-align white-text ${cardColor[getRandom].color}">
                  <h6><strong>${team.shortName}</strong></h6>
              </div>
          </div>
      </div>
    `;
}

function cardSavedtem(team) {
    return `
     <div class="col l3 m4 s12">
     <div class="card">
     <a href="./detail.html?id=${team.id}&saved=true">
        <div class="card-image waves-effect waves-block waves-light">
        <img src="../team.svg" alt="team.svg"/>
        </div>
      </a>
      <div class="card-content">
        <span class="card-title truncate">${team.name}</span>
      </div>
    </div>
    </div>
    `;
}

function cardDetailsTeam(team) {
    return `
          <div class="card indigo darkern-3">
              <div class="card-content white-text">
                  <div class="row">
                      <div class="col s12 m6 l4 center">
                          <img src="./team.svg">
                      </div>
                      <div class="col s12 m6 l8">
                           <h4>${team.name}</h4>
                           <div class="row">
                               <div class="col s2">Founded</div>
                               <div class="col s10">${team.founded}</div>
                               <div class="col s2">Email</div>
                               <div class="col s10">${team.email}</div>
                               <div class="col s2">Venue</div>
                               <div class="col s10">${team.venue}</div>
                               <div class="col s2">Address</div>
                               <div class="col s10">${team.address}</div>
                               <div class="col s2">Phone</div>
                               <div class="col s10">${team.phone}</div>
                               <div class="col s2">Website</div>
                               <div class="col s10">${team.website}</div>
                           </div>
                      </div>
                  </div>
              </div>
              <div class="card-action>
                <div class="card-action right-align btn-delete">
                  <a id="delete" href="#">Delete</a>
                </div>          
              </div>
          </div>
    `;
}

function cardDetailSavedTeam(team) {
    return `
          <li class=""><a href="./detail.html">apa aja</a></li>
    `;
}