import React, {useEffect, useState} from "react";
import shortid from "shortid";

function Main() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState({})
    useEffect(() => {
        submitSearch();
    }, []);
    async function submitSearch () {
        setResults([])
        setErrorMessage("")
        const response = await fetch('http://localhost:8000/users/profs', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const responseCode = response.status;
        switch (responseCode){
            case 200:
                console.log("Search successful")
                //dynamisches Laden der Elemente
                const newData = await response.json()
                setData(newData)
                console.log(JSON.stringify(data))
                getMatches()
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    function getMatches () {
        let matchArray = []
        let idArray = []
        setResults([])
        for (let x in data) {
            let forename = data[x].forename
            let surname = data[x].surname
            let searchRegex = new RegExp(search, "i")
            if (surname.match(searchRegex) || forename.match(searchRegex)|| (forename + " " + surname).match(searchRegex)) {
                matchArray.push(forename + " " + surname)
                idArray.push(data[x].id)
            }
        }
        for (let i in matchArray) {
            setResults(results => [...results,
                React.createElement('a', {key: shortid.generate(), href:`/prof/${idArray[i]}`, className:"list-group-item list-group-item-action list-group-item-primary"}, matchArray[i])]);
        }
    }

    return (
        <div className="general">
            <div className="mb-3">
                <label htmlFor="inputSearch" className="form-label">Suche deinen Dozenten</label>
                <input type="text" id="inputSearch" className="form-control" onChange={e => {setSearch(e.target.value); getMatches();}}/>
            </div>
            <p>{ErrorMessage}</p>
            <div className="list-group">
                {results}
            </div>
        </div>
    );
}
export default Main;