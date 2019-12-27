import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Card from "./Card";
// import Table from "./Table01/Table01";
import axios from "axios";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectPlan from "./ProjectPlan";

function App() {

    const pmrParam = {
        'include': "branches",
        'search': "Enrique Munoz 879 - P1"
    }
    const pmrHeader = {
        'Accept': "application/json",
        'Authorization' : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE3ZmJlZGJkNDA3OTBhNGEzY2Y2YTcyYjA3YjFjNTllZjNjYjlkOGZlZGQxMDk1YTU0Y2Y2NmFiZGY1ODBhMTU2ZGQ0N2JlYjZiMTY3YzUzIn0.eyJhdWQiOiJjaGluYS10ZWMtc3BhY2UtcG9jIiwianRpIjoiMTdmYmVkYmQ0MDc5MGE0YTNjZjZhNzJiMDdiMWM1OWVmM2NiOWQ4ZmVkZDEwOTVhNTRjZjY2YWJkZjU4MGExNTZkZDQ3YmViNmIxNjdjNTMiLCJpYXQiOjE1NzYxMTg4MTQsIm5iZiI6MTU3NjExODgxNCwiZXhwIjoxNTc2NzIzNjE0LCJzdWIiOiIiLCJ2ZXIiOiIwLjkuMCIsInNjb3BlcyI6WyJnYWxheHkiLCJwbXIiLCJyY2FsIiwicmdzIl0sInVzZXIiOnsiaWQiOjE0Nzc2LCJ1dWlkIjoiNDJjZjhiZGItZDE2OC00ZGY4LTgxNDctNGNmNGVjY2Q0OWMwIiwidXNlcm5hbWUiOiJjaGluYS10ZWMtc3BhY2UtcG9jIiwiZW1haWwiOiJzcGFjZUB3ZXdvcmsuY29tIiwiZmlyc3ROYW1lIjoiQ2hpbmEgVGVjIiwibGFzdE5hbWUiOiJDbGllbnQiLCJyb2xlIjoidXNlciIsInN0YWZmSWQiOm51bGwsInJlZ2lvbiI6Imdsb2JhbCJ9fQ.ma1Cw0yLLIQe_yl6OjIfwjS0Zhum7QHqj0DayC9kypJRYVYxjlQI3q9aO7AsBhlcNxmr-k_zHWkNRCvhbRsuCFGw0Q_xdReTyltR2zI62YYtjlfO2rlFr1JZs1b5R7IC1XmYltsbmD4wRFCtS6PtpvtXDiYAvCwbWsDo9zwG2A7zAgosZqXXHjVDZ6EIUWj0m-tAjG34FnTpMJlNrU6xSn4RqJVUzP-2KO6Sk5Rk_T17ld1W2YuA0IQjkiYfs0CVmb_o1C-fMFclKhrQ_A-vznCa61Uyih0H_2IDAOt6eRNjnc5lMbXkAQLeAbE61uI3LOmIUfB1u9kQviwPqyuaHw"
    }

    var config = {params : pmrParam , headers : pmrHeader}

    const [project, setProject] = useState("WeWork Location")
    const [data, setData] = useState("Data is not loaded yet.")

    function loadData(){
        console.log("Sending GET request to server...")
        axios
            // .get("http://127.0.0.1:8000/api/todos")
            .get("https://pmr.weworkers.io/api/v1/repositories/", config )
            // .get("https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=USD,EUR", {
            //     headers : {'X-testing': "testing"},
            //     params: {
            //         'crypto':"BTC",
            //         'fiat': "USD,EUR"
            //     } 
            // })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    return <div>
        <Header header={project}/>
            <Router>
                <Link to='/project'>Go to Project</Link>
                <div className="row">
                    <div className="column-project">
                        <ProjectInfoPanel selectedProject = {[project, setProject]}/>
                    </div>
                    <div className="column-data">
                        <button onClick={loadData}>Load Data</button>
                        <button onClick={() => {
                            console.log("Clicked!")
                        }}>Test</button>
                        <div>{JSON.stringify(data)}</div>
                        <div className="row">
                            <div className="column-50">
                                <Card />
                            </div>
                            <div className="column-50">
                                <Card />
                            </div>
                        </div>
                        {/* <Table /> */}
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
                <Switch>
                    <Route exact path="/project" component={ProjectPlan} />
                </Switch>
            </Router>
        <Footer />
    </div>
}

export default App;