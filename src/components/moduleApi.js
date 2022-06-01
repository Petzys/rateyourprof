import axios from "axios";

class ModuleApi {
    async call() {
        const response = await axios.post('https://reqres.in/api/posts', {
            /*
            email: "Testmail232344",
            password: "1234",
            prof: Number(id),
            module: Number(mod),
            */
            name: "Mathematik",
            tempo: 30,
            nachvollziehbarkeit: 87,
            anschaulichkeit: 34,
            interaktivitaet: 35,
        })
        const responseCode = response.status;
        switch (responseCode) {
            case 201:
                console.log("Found Ratings of Module successful")
                const data = response.data
                return {ratings:[data.tempo, data.nachvollziehbarkeit, data.anschaulichkeit, data.interaktivitaet, data.name], moduleName: data.name};
            default:
                console.log("Unknown error")
                break;
        }
    }
}
export {ModuleApi};