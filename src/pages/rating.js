import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {BsFillStarFill} from 'react-icons/bs';
import shortid from "shortid";

function Rating() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [tempoStars, setTempoStars] = useState([star()])
    const [nachStars, setNachStars] = useState([star()])
    const [anschauStars, setAnschauStars] = useState([star()])
    const [interStars, setInterStars] = useState([star()])
    let navigate = useNavigate();
    let {id} = useParams();
    let {mod} = useParams()

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
        const response = await fetch('http://localhost:8000/ratings/create', {
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
                anonymous: document.getElementById("checkboxAnonym").checked
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
        <>
            <form onSubmit={submitUserdata}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h2>Bewerte deine Vorlesung!</h2>
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
                </div>
                <div className="mb-3">
                    <label htmlFor="titelInput" className="form-label">Titel</label>
                    <input type="text" className="form-control" id="titel"
                           placeholder="Beste Vorlesung aller Zeiten!"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="commentInput" className="form-label">Gib hier deinen Kommentar ein!</label>
                    <textarea className="form-control" id="comment" rows="3" placeholder="Die Zeit verging wie im Flug und ..."></textarea>
                </div>
                <div className="form-check form-switch">
                    <input type="checkbox" className="form-check-input" id="checkboxAnonym"/>
                    <label className="form-check-label" htmlFor="checkboxAnonym">Willst du deine Bewertung anonym
                        abgeben?</label>
                </div>
                <button type="submit" style={{margin: 20}} className="btn btn-primary">Senden</button>
            </form>
            {ErrorMessage}
        </>
    );
}

export default Rating;