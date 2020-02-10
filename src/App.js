import React from "react";
import "./App.css";
import { Route, Switch , Redirect } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Navigation from "./components/Navigation/Navigation";
import LogIn from "./components/LogIn/LogIn";
import Create from './components/Create/Create'
import Posts from './components/Posts/Posts'

class App extends React.Component {
    constructor(){
        super();
        this.state={
            isLoggedIn : false,
            posts : [],
        }
    }

    handleAddPost = (post) =>{
      this.setState({
        posts : [...this.state.posts , post ]
      })
    }

    changeRegistrationStatus = (status) =>{
       this.setState({ isLoggedIn : status })
    }

    render(){
      const { isLoggedIn , posts} = this.state
      console.log( 'posts' , posts)
      return (
        <div className="app">
            <Navigation isLoggedIn={this.state.isLoggedIn}/>
            <Switch>
                <Route path="/simple-blog/verify" >
                  <LogIn changeRegistrationStatus={this.changeRegistrationStatus}/>
                </Route>
                <Route path='/simple-blog/create'>
                  {isLoggedIn ? <Create handleAddPost={this.handleAddPost} /> : <Redirect to="/simple-blog/verify" />}
                </Route>
                <Route path="/simple-blog"  exact >
                  {posts !== [] ? <Posts posts={posts} /> : <Registration />} 
                </Route>
            </Switch>
        </div>
     );  
    }
    
}

export default App;
