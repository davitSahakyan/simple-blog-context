import React from 'react';
import './Main.css';
// import Comment from '../Comment/Comment'
import { withRouter } from 'react-router-dom'
// Material ui
import TextField from '@material-ui/core/TextField';

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
  time = () =>{
    let date = new Date();
    return date.toLocaleTimeString();
  }

  callback = () =>{
     this.props.history.push("/simple-blog/") 
     this.props.handleAddPost({ 'postId' : this.state.inputId , 
                                'text' : this.state.inputValue , 
                                'username' : this.props.username,
                                'time' : this.time(),
                               })
  }



  render(){

    return(
      <div className='input-global-container'>
        <form  noValidate autoComplete="off">
          <TextField 
             id="standard-basic" 
             label="Write a post" 
             onChange={this.handleInputChange} 
             onKeyDown={this.handleOnKeyDown}/>
        </form>
      </div>
    )
  }
}

export default withRouter(Create)