import axios from "axios";

// COVID-19 API caller (in axios for jest)
class Covid {
    async getCovidNumbers() {
        const districtNum = "08222";
        const response = await axios.get('https://api.corona-zahlen.org/districts/08222')
        const responseCode = response.status;
        switch (responseCode) {
            case 200:
                try {
                    console.log("API call successful")
                    const ans = response.data.data[districtNum];
                    console.log(JSON.stringify(ans))
                    return([
                        ans.casesPerWeek,
                        ans.weekIncidence,
                        ans.deathsPerWeek,
                        ans.population])
                } catch (e) {
                    console.log("Error while parsing Covid numbers")
                    console.log(e)
                    return e;
                }
            default:
                console.log("Unknown error while getting Covid numbers")
                break;
        }
    }
}

export {Covid};