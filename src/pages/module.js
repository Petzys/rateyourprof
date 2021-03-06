import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import shortid from 'shortid';
import {ModuleApi} from "../components/moduleApi";

function Module() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [ModuleName, setModuleName] = useState('');
    const [ProgressBars, setProgressBars] = useState([])
    let {id} = useParams();
    let {mod} = useParams();
    let navigate = useNavigate();

    //function to get the modules ratings from the database on page load
    useEffect(() => {
        const moduleApi = new ModuleApi();
        moduleApi.call(id, mod).then(response => {
            const ratings = response.ratings
            const moduleName = response.moduleName
            setProgressBars([createProgressBar(0, ratings), createProgressBar(1, ratings), createProgressBar(2, ratings), createProgressBar(3, ratings), createProgressBar(4, ratings)])
            setModuleName(moduleName)
        } ).catch(error => {
            setErrorMessage("Es ist ein Fehler aufgetreten: " + error)
        });

    }, []);

    //function to create the progress bars
    function createProgressBar(num, ratings) {
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
                `${ratings[num]}%`
            ))
    }

    return (
        <div className="general">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {React.createElement("h1", {style: {marginBottom: 20}}, ModuleName)}
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
                            <th scope="row">Interaktivit??t</th>
                            <td>
                                {ProgressBars[3]}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Umsetzung der Corona Ma??nahmen</th>
                            <td>
                                {ProgressBars[4]}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-success" onClick={() => {navigate(`/prof/${id}/module/${mod}/rating`)}}>Rate your Prof!</button>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/prof/${id}/module/${mod}/comments`)}}>Kommentare</button>
                    </div>
                </div>
            </div>
            {ErrorMessage}
        </div>
    );
}

export default Module;