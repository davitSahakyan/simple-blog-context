import React from 'react';
import './Main.css';
// import Comment from '../Comment/Comment'
import InputPart from './InputPart/InputPart'
import Greetings from './Greetings/Greetings'

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      comments : [],
      isShowingInput : false,
    }
  }

  addComment = () =>{
    console.log('clicked')
    this.setState((prevState) => 
      ({ isShowingInput: !prevState.isShowingInput })
    )
  }

  addToComments = (comment) =>{
    this.setState({
      comments : [...this.state.comments , comment],
      isShowingInput : !this.state.isShowingInput,
    })

  }

  render(){
    const { comments , isShowingInput } = this.state
    console.log('isSHOWInput' , isShowingInput)
    if(comments == false && isShowingInput === false ){
      console.log('uuuu')
      return <Greetings addComment={this.addComment}  />
    }

    if(isShowingInput === true){
       return(
         <InputPart addToComments={this.addToComments} />  
       )
    }


    return(
      <div>
        {comments.map( coment =>{
          return  <div> {coment}</div>
        })} 
      </div>
    )
  }
}

export default Main