import React from "react";
import "./App.css";
import { Route, Switch , Redirect } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import LogIn from "./components/LogIn/LogIn";
import Main from './components/Main/Main'

class App extends React.Component {
    constructor(){
        super();
        this.state={
            isLoggedIn : false,
        }
    }

    changeRegistrationStatus = (status) =>{
       this.setState({ isLoggedIn : status })
    }

    render(){
      return (
        <div className="app">
            <Navigation isLoggedIn={this.state.isLoggedIn}/>
            <Switch>
                <Route path="/simple-blog/verify" >
                  <LogIn changeRegistrationStatus={this.changeRegistrationStatus}/>
                </Route>
                <Route path='/simple-blog/main'>
                  {this.state.isLoggedIn ? <Main /> : <Redirect to="/simple-blog/verify" />}
                </Route>
                <Route path="/simple-blog"  exact >
                  <Registration />
                </Route>
            </Switch>
        </div>
     );  
    }
    
}

export default App;
