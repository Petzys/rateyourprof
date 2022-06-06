import axios from "axios";

// Call the backend for ratings (in axios for jest)
class ModuleApi {
    async call(id, mod) {
        const response = await axios.post('http://localhost:8000/ratings/getStars', {
            prof: Number(id),
            module: Number(mod),
        })
        const responseCode = response.status;
        switch (responseCode) {
            case 200:
                console.log("Found Ratings of Module successful")
                const data = response.data
                return {ratings:[data.Tempo, data.Nachvollziehbarkeit, data.Anschaulichkeit, data.Interaktivität, data.Corona], moduleName: data.name};
            default:
                console.log("Unknown error")
                break;
        }
    }
}
export {ModuleApi};