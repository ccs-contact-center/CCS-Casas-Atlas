import AuthService from "./AuthService";

class API_CCS {
  constructor() {
    this.Auth = new AuthService();
    this.fetch = this.fetch.bind(this); // React binding stuff
  }

  async fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (await this.Auth.loggedIn()) {
      headers["Authorization"] = "Bearer " + (await this.Auth.getToken());
    } else {
      window.location.href = "/login";
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  getCampaignAvatar(id) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/Campaigns/Avatar?id=" + id,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getClientes() {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/clientes",
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getCliente(id) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/clientes/" +
        id,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  updateCliente(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/clientes/" +
        data.client,
      {
        body: JSON.stringify(data),
        method: "PUT"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  insertCliente(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/clientes/",
      {
        body: JSON.stringify(data),
        method: "POST"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getTip2(tip1) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/tip2?tip1=" + tip1,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }


  getTip3(tip1,tip2) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/tip3?tip1=" + tip1 +"&tip2=" + tip2,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getColonias(Estado, Municipio) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/catalogs/colonias?estado=" +
        Estado +
        "&municipio=" +
        Municipio,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getMunicipios(Estado) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/catalogs/municipios?estado=" +
        Estado,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getCP(CP) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/catalogs/codigo_postal/" + CP,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getRACSClient(client) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/racs/" +
        client,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getRACS() {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/racs/",
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  getRAC(id) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/rac/" + id,
      {
        method: "GET"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  updateRAC(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/rac/" +
        data.clave_reporte,
      {
        body: JSON.stringify(data),
        method: "PUT"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  updateRACDesarrollo(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/racDesarrollo/" +
        data.clave_reporte,
      {
        body: JSON.stringify(data),
        method: "PUT"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  insertRAC(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/rac/" ,
      {
        body: JSON.stringify(data),
        method: "POST"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }

  insertGeneral(data) {
    return this.fetch(
      "https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/llamadas/" ,
      {
        body: JSON.stringify(data),
        method: "POST"
      }
    ).then(res => {
      return Promise.resolve(res);
    });
  }


  sendMail(data) {

    return this.fetch('https://api.ccscontactcenter.com/v1/interface/send-email', {    
         method: 'POST',
         body: JSON.stringify(data)
     }).then(res => {
         
         return Promise.resolve(res);
     })

 }     

 getTicketCorreo(ticket) {

  return this.fetch('https://api.ccscontactcenter.com/v1/campaigns/casas_atlas/ticket?ticket=' + ticket, {    
       method: 'GET'
   }).then(res => {
       
       return Promise.resolve(res);
   })

}    

}



export default API_CCS;
