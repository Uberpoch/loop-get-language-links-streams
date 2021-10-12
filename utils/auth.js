const axios = require('axios');

const auth = async (key, secret) => {
    return axios.post('https://v2.api.uberflip.com/authorize', {
        grant_type:	'client_credentials',
        client_id: key,
        client_secret: secret
    })
    .catch(function (error) {
        console.log(error);
        })
    .then(function (response) {
        // tokenType = response.data.token_type;
        const token = response.data.access_token;
        // console.log(token);
        return token;
    });

};

module.exports = auth;