import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import shortid from 'shortid';

function Prof() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);
    let {id} = useParams();

    useEffect(() => {
        call();
    }, []);

    async function call() {
        setErrorMessage("")
        const response = await fetch('http://localhost:8000/users/profs/modules', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: "Testmail232344",
                password: "1234",
                prof: Number(id)
            })
        })
        const responseCode = response.status;
        switch (responseCode) {
            case 200:
                console.log("Found Modules of Prof successful")
                const data = await response.json()
                console.log(JSON.stringify(data))
                createCards(data)
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    function createCards(data) {
        setResults([])
        for (let x in data) {
            setResults(results => [...results,
                React.createElement("div", {key: shortid.generate(), className: "col"},
                    React.createElement("div", {key: shortid.generate(), className: "card p-3 mb-2 bg-dark text-white"},
                        React.createElement("div", {key: shortid.generate(), className: "card-body"},
                            React.createElement("h5", {key: shortid.generate(), className: "card-title"}, data[x].name),
                            React.createElement("p", {key: shortid.generate(), className: "card-text"}),
                            React.createElement("a", {
                                key: shortid.generate(),
                                href: `/prof/${id}/module/${data[x].id}`,
                                className: "btn btn-primary"
                            }, "Forum"),
                        )))]);
            if (!((x+1)%3)) {
                setResults(results => [...results,
                    React.createElement("div", {key: shortid.generate(), className: "w-100"})])
            }
        }
    }

    return (
        <div className="general">
            <div className="container-fluid">
                <div className="row">
                    <div className="w-100"></div>
                    {results}
                </div>
            </div>
            {ErrorMessage}
        </div>
    );
}

export default Prof;