const axios = require('axios');
exports.streamsCall = async(token, url) => {
    return await axios.get(url, {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'User_Agent': `Nathan UF`
        }
    })
    .catch(error => {
        console.log(error);
    })
    .then(res => {
        return res.data;

    })
}

exports.langLinks = async(token, stream) => {
  return await axios.get(`https://v2.api.uberflip.com/streams/${stream.id}/language-links?limit=100`, {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'User_Agent': `Nathan UF`
        }
    })
    .catch(error => {
        console.log(error);
    })
    .then(res => {
        return res.data;

    })
}
