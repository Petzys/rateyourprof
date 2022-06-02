import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {BsFillStarFill} from 'react-icons/bs';
import shortid from "shortid";
import {Covid} from "../components/covid";
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {de} from 'date-fns/locale';

function Rating() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [tempoStars, setTempoStars] = useState([star()])
    const [nachStars, setNachStars] = useState([star()])
    const [anschauStars, setAnschauStars] = useState([star()])
    const [interStars, setInterStars] = useState([star()])
    const [covidStars, setCovidStars] = useState([star()])
    const [covidNumbers, setCovidNumbers] = useState([0,0,0,0])
    const [startDate, setStartDate] = useState(new Date());
    registerLocale('de', de)
    setDefaultLocale("de")
    let navigate = useNavigate();
    let {id} = useParams();
    let {mod} = useParams()

    useEffect(() => {
        const covid = new Covid();
        covid.getCovidNumbers().then(ans => {
            setCovidNumbers(ans)
        }, err => {
            console.log(err)
            setErrorMessage("Es ist ein Fehler bei Abrufen der Coronazahlen aufgetreten.")
        });
    }, []);

    function setStars(id, value) {
        switch (id) {
            case "tempo":
                setTempoStars([])
                for (let i = 0; i < value; i++) {
                    setTempoStars(stars => [...stars,
                        star()
                    ])
                }
                break;
            case "nachvollziehbarkeit":
                setNachStars([])
                for (let i = 0; i < value; i++) {
                    setNachStars(stars => [...stars,
                        star()
                    ])
                }
                break;
            case "anschaulichkeit":
                setAnschauStars([])
                for (let i = 0; i < value; i++) {
                    setAnschauStars(stars => [...stars,
                        star()
                    ])
                }
                break;
            case "interaktivitaet":
                setInterStars([])
                for (let i = 0; i < value; i++) {
                    setInterStars(stars => [...stars,
                        star()
                    ])
                }
                break;
            case "covid":
                setCovidStars([])
                for (let i = 0; i < value; i++) {
                    setCovidStars(stars => [...stars,
                        star()
                    ])
                }
                break;
            default:
                break;
        }
    }

    function star() {
        return React.createElement(BsFillStarFill, {size: 50, key: shortid.generate()})
    }

    async function submitUserdata (event) {
        event.preventDefault();
        console.log("Submitting rating...")
        setErrorMessage("")
        const response = await fetch('https://reqres.in/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prof: Number(id),
                module: Number(mod),
                stars: {
                    Tempo: tempoStars.length,
                    Nachvollziehbarkeit: nachStars.length,
                    Anschaulichkeit: anschauStars.length,
                    Interaktivität: interStars.length
                },
                //The following are optional. However, either all of them or none of them must be sent.
                title: document.getElementById("titel").value,
                comment: document.getElementById("comment").value,
                anonymous: document.getElementById("checkboxAnonym").checked,
                date: startDate,
            })
        })
        const responseCode = response.status;
        console.log(responseCode)
        switch (responseCode) {
            case 201:
                console.log("Rating successfully submitted")
                navigate(`/prof/${id}/module/${mod}`)
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    return (
        <div className="general">
            <form onSubmit={submitUserdata}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col m-3">
                            <h2>Bewerte deine Vorlesung</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card p-3 mb-2 bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Tempo</h5>
                                    <p className="card-text">
                                        {tempoStars}
                                    </p>
                                    <input type="range" className="form-range" defaultValue="0" min="1" max="5"
                                           id="tempo" onChange={e => setStars(e.target.id, e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card p-3 mb-2 bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Nachvollziehbarkeit</h5>
                                    <p className="card-text">
                                        {nachStars}
                                    </p>
                                    <input type="range" className="form-range" defaultValue="0" min="1" max="5"
                                           id="nachvollziehbarkeit"
                                           onChange={e => setStars(e.target.id, e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card p-3 mb-2 bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Anschaulichkeit</h5>
                                    <p className="card-text">
                                        {anschauStars}
                                    </p>
                                    <input type="range" className="form-range" defaultValue="0" min="1" max="5"
                                           id="anschaulichkeit" onChange={e => setStars(e.target.id, e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card p-3 mb-2 bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Interaktivität</h5>
                                    <p className="card-text">
                                        {interStars}
                                    </p>
                                    <input type="range" className="form-range" defaultValue="0" min="1" max="5"
                                           id="interaktivitaet" onChange={e => setStars(e.target.id, e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card p-3 text-dark mb-2 bg-info text-white h-100">
                                <div className="card-body">
                                    <h5 className="card-title">COVID-19 Zahlen: Mannheim</h5>
                                    <p className="card-text" style={{textAlign: "left", lineHeight: 2}}>
                                        🦠 Fälle in dieser Woche: {covidNumbers[0]}<br/>
                                        📌 7-Tage-Inzidenz: {covidNumbers[1]}<br/>
                                        ☠️ Tode pro Woche: {covidNumbers[2]}<br/>
                                        🏛️ Einwohnerzahl: {covidNumbers[3]}<br/>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card p-3 mb-2 text-dark bg-light text-white h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Umsetzung der COVID-19 Maßnahmen</h5>
                                    <p className="card-text">
                                        {covidStars}
                                    </p>
                                    <input type="range" className="form-range" defaultValue="0" min="1" max="5"
                                           id="covid" onChange={e => setStars(e.target.id, e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <div className="mb-3 m-3">
                            <label htmlFor="titelInput" className="form-label">Titel</label>
                            <input type="text" className="form-control" id="titel"
                                   placeholder="Beste Vorlesung aller Zeiten!"/>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <div className="mb-3 m-3">
                            <label htmlFor="commentInput" className="form-label">Gib hier deinen Kommentar ein!</label>
                            <textarea className="form-control" id="comment" rows="3" placeholder="Die Zeit verging wie im Flug und ..."></textarea>
                        </div>
                        </div>
                    </div>
                    <div className="row" style={{marginBottom: 20}} >
                        <div className="col">
                            <label>
                                Wähle das Datum deiner Vorlesung aus:
                            </label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} locale="de"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-check form-switch">
                                <input type="checkbox" className="form-check-input" id="checkboxAnonym"/>
                                <label className="form-check-label" htmlFor="checkboxAnonym">
                                    Willst du deine Bewertung anonym
                                    abgeben? </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <button type="submit" style={{margin: 20}} className="btn btn-primary">Senden</button>
                        </div>
                    </div>
                </div>
            </form>
            {ErrorMessage}
        </div>
    );
}

export default Rating;