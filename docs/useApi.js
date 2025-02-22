if (typeof axios === 'undefined') {
    throw new Error('Axios doit être chargé pour utiliser ce module.');
}

const useApi=() => {

    const headers = {
        'Access-Control-Allow-Origin': 'https://api.edamam.com',
    };

    // Création d'une instance Axios
    const api = axios.create({
        baseURL: "https://api.edamam.com/api/recipes/v2",
        headers: headers,
    });

    // Juste avant l'envoi de la requète
    api.interceptors.request.use((config) => {
        // on pourrait ajouter des éléments dans le header
        // ajouter dans le header le token (Authorization)
        //
        return config;
    });

    // tout de suite la reponse de la requète
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);

            if (error.response && error.response.status === 401) {
                // Probleme d'authentification
            }

            if (error.response && error.response.status === 404) {
                // Probleme de resources indisponible
                console.log("ressource indispo");
            }
            return Promise.reject(error);
        }
    );
    return api;
}

export {useApi};