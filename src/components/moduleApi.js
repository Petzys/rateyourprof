import axios from "axios";

// Call the backend for ratings (in axios for jest)
class ModuleApi {
    async call(id, mod) {
        const response = await axios.post('http://localhost:8000/ratings/getStars', {
            prof: Number(id),
            module: Number(mod),
        },
            {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const responseCode = response.status;
        switch (responseCode) {
            case 200:
                console.log("Found Ratings of Module successful")
                const data = response.data
                return {ratings:[data.Tempo, data.Nachvollziehbarkeit, data.Anschaulichkeit, data.Interaktivität, data.Corona], moduleName: data.name};
            case 401:
                console.log("Not logged in")
                break;
            case 403:
                console.log("Not authorized")
                break;
            default:
                console.log("Unknown error")
                break;
        }
    }
}
export {ModuleApi};