const axios = require('axios');
const axiosRetry = require('axios-retry');


axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
        console.log(`Retrying after ${retryCount} seconds...`);
        return retryCount * 2000;
    },
    retryCondition:(error) => {
    return error.response && error.response.status === 500
    }
});

const fetchDataWithRetry = async () => {
    try {
        const response = await axios.get('https://api.external-service.com/data');
        console.log('API response:',response.data);
    } catch (error) {
      if(error.response && error.response.status === 500){
        console.error('Rate limit exceeded,retries exhausted');
      } else {
        console.error('Error fetching data:',error.message);
      }
    }
};

fetchDataWithRetry();