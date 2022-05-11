import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    let navigate = useNavigate();
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
                ]
            })
        })
        const responseCode = response.status;
        switch (responseCode){
            case 201:
                console.log("Search successful")
                //dynamisches Laden der Elemente
                const data = await response.json()
                console.log(JSON.stringify(data))
                for (let x in data.searchResults) {
                    setResults(results => [...results,
                        React.createElement('a', {key: x, href:"/prof", className:"list-group-item list-group-item-action"}, data.searchResults[x])]);
                }
                //setResults(createList(data))
                break;
            case 200:
                console.log("No search results")
                setErrorMessage("Deine Suche ergab keine Treffer")
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

// {data.map((index) => React.createElement('a', {href: "/main", key: index, className: "list-group-item list-group-item-action active"}, "hello"))}

    return (
        <>
            <div className="mb-3">
                <label htmlFor="inputSearch" className="form-label">Suche deinen Dozenten</label>
                <input type="text" id="inputSearch" className="form-control" aria-describedby="passwordHelpBlock" onChange={e => setSearch(e.target.value)}/>
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