import React from 'react';
import './Main.css';
// import Comment from '../Comment/Comment'
import Greetings from './Greetings/Greetings'
import { withRouter } from 'react-router-dom'

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

  handleInputChange = (e) =>{
     this.setState({
       inputValue : e.target.value,
     })
  }

  handleOnKeyDown = (e) =>{
     if(e.key === 'Enter'){
       this.setState({inputId : this.state.inputId + 1},
       () => this.callback()
        )
     }
  }

  callback = () =>{
     this.props.history.push("/simple-blog/") 
     this.props.handleAddPost({ 'postId' : this.state.inputId , 'text' : this.state.inputValue })
     
  }



  render(){
    const { isShowingGreeting } = this.state

    if(isShowingGreeting === true ){
      return <Greetings handleGreetingStatusChange={this.handleGreetingStatusChange}  />
    }

    return(
      <div className='input-global-container'>
        <div className='input-container'>
          <input 
            type='text' 
            placeholder='Write a post' 
            className='input' 
            onChange={this.handleInputChange}
            onKeyDown={this.handleOnKeyDown}
            />
        </div>
      </div>
    )
  }
}

export default withRouter(Create)