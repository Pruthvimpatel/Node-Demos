(async () => {
    const fetch = (await import('node-fetch')).default;

    const fetchDataWithNodeFetch = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            
            const data = await response.json();
            
            console.log('Data fetched with node-fetch:');
            console.log(data);
        } catch (error) {
            console.error('Error occurred while fetching data with node-fetch:', error.message);
        }
    };

    fetchDataWithNodeFetch();
})();
