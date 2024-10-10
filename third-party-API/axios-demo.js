//axios is a promise based http client that provide an easy way to send http requests to APIs

const axios = require('axios');
const fetchDataWithAxios = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log('Data fetched with axios');
        console.log(response.data);
    } catch(error) {
        console.error('Error occurred while fetching data with Axios',error.message);
    }

};

fetchDataWithAxios();