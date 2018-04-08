const axios = require('axios');

class SWApiService {
    static async getApperancesByName(name){
        const url = `https://swapi.co/api/planets/?search=${name}`;
        let apperances = await axios.get(url)
            .then(function(response) {
                if(response.data.count === 0){
                    // Planet not found
                    return;
                }else{
                    return response.data.results[0].films.length;
                }
            })
            .catch(function (error) {
                console.error(error);
                return;
            });
        return apperances;
    }
}

module.exports = SWApiService;
