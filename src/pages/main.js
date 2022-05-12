import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";

function NotFound() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState({})
    let navigate = useNavigate();
    useEffect(() => {
        submitSearch();
    }, []);
    //setResults(React.createElement('a', {key: 1, href:"/welcome", className:"list-group-item list-group-item-action active"}, "Hallo"))
    async function submitSearch () {
        setResults([])
        setErrorMessage("")
        const response = await fetch('https://reqres.in/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchResults:[
                    "Bayreuther",
                    "Preiser",
                    "Preiser",
                    "Preiser",
                    "Preiser",
                    "Preiser",
                    "Preiser",
                    "Preiser",
                ]
            })
        })
        const responseCode = response.status;
        switch (responseCode){
            case 201:
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
        setResults([])
        if (search.length < 3) {
            return
        }
        for (let x in data.searchResults) {
            let singleResult = data.searchResults[x]
            if (singleResult.match(search)) {
                matchArray.push(singleResult)
            }
        }
        for (let i in matchArray) {
            setResults(results => [...results,
                React.createElement('a', {key: i, href:"/prof", color:"red", className:"list-group-item list-group-item-action list-group-item-primary"}, matchArray[i])]);
        }
    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="inputSearch" className="form-label">Suche deinen Dozenten</label>
                <input type="text" id="inputSearch" className="form-control" onChange={e => {setSearch(e.target.value); getMatches();}}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => submitSearch()}>Suchen</button>
            <p>{ErrorMessage}</p>
            <div className="list-group">
                {results}
            </div>
        </>
    );
}
export default NotFound;