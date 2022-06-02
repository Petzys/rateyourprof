import React, {useEffect, useState} from "react";
import shortid from "shortid";

function Comments() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [dateList, setDateList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    //funtion to get the comments from the database on page load
    useEffect(() => {
        submitSearch();
    }, []);

    //function to get the comments from the database
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

    //function to create the dates for the date list
    function createDates(data) {
        let dateArray = []
        for (let i in data) {
            const testdate = dateArray.find(
                date => date.toString() === new Date(data[i].datum).toString(),
            );
            if (testdate === undefined) {
                dateArray.push(new Date(data[i].datum))
            }
        }
        return dateArray
    }

    //function to call when a date is picked
    function newPickedDate(data, date) {
        console.log(date)
        createCommentList(data, date)
    }

    //function to create the date list
    function createDateList(data, defaultpickedDate) {
        let dateArray = createDates(data)
        console.log(dateArray)
        setDateList([])
        for (let i in dateArray) {
            setDateList(dates => [...dates,
                React.createElement('li',
                    {
                        key: shortid.generate(),
                        onClick: () => newPickedDate(data, dateArray[i]),
                        className: "list-group-item list-group-item-action list-group-item-primary"
                    },
                    dateArray[i].getDate() + "." + (new Date(data[i].datum).getMonth() + 1) + "." + new Date(data[i].datum).getFullYear())]);
        }
        createCommentList(data, defaultpickedDate)
    }

    //function to create the comment list for the picked date as DOM elements
    function createCommentList(data, pickedDate) {
        let commentIndexArray = []
        for (let i in data) {
            if (new Date(data[i].datum).toString() === pickedDate.toString()) {
                commentIndexArray.push(i)
            }
        }
        console.log(commentIndexArray)
        setCommentList([])
        for (let i in commentIndexArray) {
            console.log(commentIndexArray[i])
            setCommentList(comments => [...comments,
                React.createElement("div", {key: shortid.generate(), className: "row"},
                    React.createElement("div", {
                            key: shortid.generate(),
                            className: "card p-3 mb-2 bg-dark text-white w-100"
                        },
                        React.createElement("div", {key: shortid.generate(), className: "card-body"},
                            React.createElement("h5", {
                                key: shortid.generate(),
                                className: "card-title",
                                style: {color: "#FF7500"}
                            }, data[commentIndexArray[i]].titel),
                            React.createElement("h6", {
                                key: shortid.generate(),
                                className: "card-subtitle mb-2 text-muted"
                            }, data[commentIndexArray[i]].name),
                            React.createElement("p", {
                                key: shortid.generate(),
                                className: "card-text"
                            }, data[commentIndexArray[i]].comment),
                        )))]);
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
                    <div className="col" style={{marginRight: 30, marginLeft: 12}}>
                        {commentList}
                    </div>
                </div>
            </div>
            {ErrorMessage}
        </div>
    );
}

export default Comments;