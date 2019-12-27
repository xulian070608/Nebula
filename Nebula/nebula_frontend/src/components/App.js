import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import PropertyOverview from "./PropertyOverview";
import NotFount from "./NotFound";
import PropertyPlan from "./PropertyPlan";


function App() {

    return <div>
        <Header header="Nebula"/>
        <Router>
            <Link to="/">Home</Link>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:propertyID/summary" render={(props) => {
                    let pageID = props.location.pathname
                                .replace('/summary','')
                                .replace('/', '')
                    return(<PropertyOverview propertyUUID={pageID} />)
                }}/>
                <Route exact path="/:propertyID/planview" render={(props) => {
                    let pageID = props.location.pathname
                                .replace('/planview','')
                                .replace('/', '')
                    return(<PropertyPlan propertyUUID={pageID} />)
                }}/>
                <Route component={NotFount} />
            </Switch>
        </Router>
        <Footer />
    </div>
}

export default App;