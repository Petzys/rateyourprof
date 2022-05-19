import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import shortid from 'shortid';

function Module() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [ModuleName, setModuleName] = useState('');
    const [ProgressBars, setProgressBars] = useState([])
    let {id} = useParams();
    let {mod} = useParams()

    useEffect(() => {
        call();
    }, []);

    async function call() {
        setErrorMessage("")
        const response = await fetch('https://reqres.in/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            /*body: JSON.stringify({
                email: "Testmail232344",
                password: "1234",
                prof: Number(id),
                module: Number(mod),
            })*/
            body: JSON.stringify({
                name: "Mathematik",
                tempo: 30,
                nachvollziehbarkeit: 87,
                anschaulichkeit: 34,
                interaktivitaet: 35,
            })
        })
        const responseCode = response.status;
        switch (responseCode) {
            case 201:
                console.log("Found Ratings of Module successful")
                const data = await response.json()
                console.log(JSON.stringify(data))
                setModuleName(data.name)
                const ratings = [data.tempo, data.nachvollziehbarkeit, data.anschaulichkeit, data.interaktivitaet];
                setProgressBars([createProgressBar(0, ratings), createProgressBar(1, ratings), createProgressBar(2, ratings), createProgressBar(3, ratings)])
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    function createProgressBar(num, ratings) {
        console.log(ratings[num])
        return React.createElement("div", {key: shortid.generate(), className: "progress"},
            React.createElement("div", {
                    key: shortid.generate(),
                    className: "progress-bar",
                    role: "progressbar",
                    style: {width: `${ratings[num]}%`},
                    "aria-valuenow": ratings[num],
                    "aria-valuemin": "0",
                    "aria-valuemax": "100"
                },
                ratings[num]
            ))
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {React.createElement("h1", null, ModuleName)}
                    </div>
                    <div className="w-100"/>
                    <table className="table table-dark table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Kriterium</th>
                            <th scope="col">Bewertung</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">Tempo</th>
                            <td>
                                {ProgressBars[0]}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Nachvollziehbarkeit</th>
                            <td>
                                {ProgressBars[1]}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Anschaulichkeit</th>
                            <td>
                                {ProgressBars[2]}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Interaktivität</th>
                            <td>
                                {ProgressBars[3]}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {ErrorMessage}
        </>
    );
}

export default Module;