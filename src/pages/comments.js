import React, {useEffect, useState} from "react";
import shortid from "shortid";
import {useParams} from "react-router-dom";
import Tokenheader from "../components/tokenheader";

function Comments() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const [dateList, setDateList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    let {id} = useParams();
    let {mod} = useParams();

    //funtion to get the comments from the database on page load
    useEffect(() => {
        submitSearch();
    }, []);

    //function to get the comments from the database
    async function submitSearch() {
        setDateList([])
        setErrorMessage("")

        const response = await fetch('http://localhost:8000/ratings/getComments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify({
                    prof: Number(id),
                    module: Number(mod),
                })
        })
        const responseCode = response.status;
        switch (responseCode) {
            case 200:
                console.log("Search successful")
                let data = await response.json()
                console.log(JSON.stringify(data))
                for (let x in data) {
                    data[x].datum = convertUnixTimeToDate(data[x].date)
                }
                console.log(data)
                let defaultPickedDate = new Date(data[0].datum)
                createDateList(data, defaultPickedDate)
                break;
            case 401:
                console.log("Not logged in")
                setErrorMessage("Du bist nicht eingeloggt.")
                break;
            case 403:
                console.log("Not authorized")
                setErrorMessage("Du hast nicht die nötigen Rechte.")
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    function convertUnixTimeToDate(unixTime) {
        return new Date(unixTime * 1000);
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
                            }, data[commentIndexArray[i]].title),
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