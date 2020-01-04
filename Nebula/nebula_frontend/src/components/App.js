import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./HomePage/Home";
import PropertyOverview from "./PropertyInfo/PropertyOverview";
import NotFount from "./NotFound";
import PropertyLayout from "./PropertyLayout/PropertyLayout";
import Room from "./PropertyLayout/Room"

function App() {

    return <div>
        <Router>
            <Header header="Nebula"/>
            <div className="content-offset"/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:propertyID/summary" render={(props) => {
                    let pageID = props.location.pathname
                                .replace('/summary','')
                                .replace('/', '')
                    return(<PropertyOverview propertyUUID={pageID} />)
                }}/>
                <Route exact path="/:floorID/planview" render={(props) => {
                    let pageID = props.location.pathname
                                .replace('/planview','')
                                .replace('/', '')
                    return(<PropertyLayout floorUUID={pageID} />)
                }}/>
                <Route exact path="/:roomID/spaceInfo" render={(props) => {
                    let pageID = props.location.pathname
                                .replace('/spaceInfo','')
                                .replace('/', '')
                    return(<Room buildingNameRoomNumber={pageID} />)
                }}/>
                <Route component={NotFount} />
            </Switch>
        </Router>
        <Footer />
    </div>
}

export default App;