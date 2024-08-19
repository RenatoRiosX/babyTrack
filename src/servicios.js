const urlBase = "https://babytracker.develotion.com/";


export const registrarUsuario = async (usuario) => {
    try {
        const response = await fetch(urlBase + "usuarios.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud ' + response.statusText);
        }
        const data = await response.json();
        return data;

    } catch (error) {        
        throw error; 
    }
};

export const loginUsuario = (objetoLogin) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(objetoLogin);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,

    };

    return fetch(`${urlBase}login.php`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));

}

export const obtenerDepartamentos = async () => {
    try {
        const response = await fetch(urlBase + "departamentos.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud ' + response.statusText);
        }
        const data = await response.json(); 
        return data; 
    } catch (error) {
        throw error;
    }
};

export const obtenerCiudades = async (idDepartamento) => {
    try {
        const response = await fetch(urlBase + `ciudades.php?idDepartamento=${idDepartamento}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud ' + response.statusText);
        }
        const data = await response.json(); 
        return data;  
    } catch (error) {
        throw error;
    }
};

export const obtenerEventos = async () => {
    try {
        const respuesta = await fetch(`${urlBase}eventos.php?idUsuario=${localStorage.getItem("idUsuario")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': localStorage.getItem("apiKey"),
                'iduser': localStorage.getItem("idUsuario")
            }
        })


        if (!respuesta.ok) {
            throw new Error('Error en la solicitud ' + respuesta.statusText);
        }

        const data = await respuesta.json();
       
        return data;
        
    } catch (error) {
        throw error;
    }
};


export const fetchAgregarEvento = async (evento) => {
    let eventoConUsuario = {
        idCategoria: evento.categoria,
        idUsuario: localStorage.getItem("idUsuario"),
        fecha: evento.fecha,
        detalle: evento.detalles
    };

    try {
        const response = await fetch(urlBase + "eventos.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': localStorage.getItem("apiKey"),
                'iduser': localStorage.getItem("idUsuario")
            },
            body: JSON.stringify(eventoConUsuario)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud ' + response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error) {

        throw error;
    }
};

export const obtenerCategorias = () => {
    return fetch(`${urlBase}categorias.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apiKey': localStorage.getItem("apiKey"),
            'iduser': localStorage.getItem("idUsuario")
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud ' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            return json;
        })
        .catch(error => {
            throw error;
        });
};

export const fetchEliminarEvento = async (idEvento) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("apikey", localStorage.getItem("apiKey"));
  myHeaders.append("iduser", localStorage.getItem("idUsuario"));

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    const response = await fetch(`${urlBase}eventos.php?idEvento=${idEvento}`, requestOptions);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};