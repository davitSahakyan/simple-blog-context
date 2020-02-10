import React from 'react';
import './Main.css';
// import Comment from '../Comment/Comment'
import Greetings from './Greetings/Greetings'

class Create extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isShowingGreeting : true,
      inputValue : '',
      inputId : 0,
    }
  }

  handleGreetingStatusChange = () =>{
    this.setState({ isShowingGreeting : false })
  }


  render(){
    const { comments , isShowingGreeting } = this.state

    if(isShowingGreeting === true ){
      return <Greetings handleGreetingStatusChange={this.handleGreetingStatusChange}  />
    }

    return(
      <div>
        <div>
          <input type='text' placeholder='Write a post' onChange={}  />
        </div>
      </div>
    )
  }
}

export default Create