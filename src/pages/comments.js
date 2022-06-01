import React, {useEffect, useState} from "react";
import shortid from "shortid";

function Comments() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [dateList, setDateList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [pickedDate, setPickedDate] = useState({});
    useEffect(() => {
        submitSearch();
    }, []);

    async function submitSearch() {
        setDateList([])
        setErrorMessage("")
        const response = await fetch('https://reqres.in/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                {
                    titel: "Titel1", //Leerer string falls nur sterne
                    comment: "Passt",//Leer falls nur sterne
                    name: "Klaus", //ggf. leerer String
                    datum: "2012-04-23T18:25:43.511Z",
                },
                {
                    titel: "Titel2",
                    comment: "Net so geil",
                    name: "Dieter",
                    datum: "2013-04-23T18:25:43.511Z",
                },
                {
                    titel: "Titel3",
                    comment: "LOL",
                    name: "Ulrich",
                    datum: "2012-04-23T18:25:43.511Z",
                },
            ])
        })
        const responseCode = response.status;
        switch (responseCode) {
            case 201:
                console.log("Search successful")
                const data = await response.json()
                console.log(data)
                let defaultPickedDate = new Date(data[0].datum)
                createDateList(data, defaultPickedDate)
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    function createDates (data) {
        let dateArray = []
        for (let i in data) {
            if (!dateArray.includes(data[i].datum)) {
                let dateFormatted = new Date(data[i].datum)
                dateArray.push(dateFormatted)
            }
        }
        return dateArray
    }

    function createComments (data) {
        let commentArray = []
        for (let i in data) {
            commentArray.push(data[i].comment)
        }
        return commentArray
    }


    function createDateList (data, pickedDate) {
        let dateArray = createDates(data)
        setDateList([])
        setPickedDate(pickedDate)
        for (let i in dateArray) {
            setDateList(dates => [...dates,
                React.createElement('li',
                    {key: shortid.generate(), onClick: () => (setPickedDate(dateArray[i]), console.log(pickedDate)),className:"list-group-item list-group-item-action list-group-item-primary"},
                    dateArray[i].getDate() + "." + (new Date(data[i].datum).getMonth() + 1) + "." + new Date(data[i].datum).getFullYear())]);

        }
        createCommentList(data)
        return dateList
    }

    function createCommentList (data) {
        let commentArray = createComments(data)
        for (let i in commentArray) {
            let testDate = new Date(data[i].datum)
            console.log("Testdate " + testDate)
            console.log(pickedDate)
            if (testDate === pickedDate) {
                console.log(commentArray[i])
                setCommentList(comments => [...comments,
                    React.createElement("div", {key: shortid.generate(), className: "row"},
                        React.createElement("div", {
                                key: shortid.generate(),
                                className: "card p-3 mb-2 bg-dark text-white"
                            },
                            React.createElement("div", {key: shortid.generate(), className: "card-body"},
                                React.createElement("h5", {
                                    key: shortid.generate(),
                                    className: "card-title"
                                }, data[i].titel),)),
                        React.createElement("p", {key: shortid.generate(), className: "card-text"}, data[i].comment),
                    )]);
            }
        }
    }

    return (
        <div className="comments">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <h3>Vorlesungen</h3>
                    </div>
                    <div className="col">
                        <h3>Kommentare</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <ul className="list-group">
                            {dateList}
                        </ul>
                    </div>
                    <div className="col">
                        <div className="card p-3 mb-2 bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up
                                    the bulk of the card's content.</p>
                                {commentList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;