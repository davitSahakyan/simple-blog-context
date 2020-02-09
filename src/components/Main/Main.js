import React from 'react';
import './Main.css';
import Comment from '../Comment/Comment'
import InputPart from './InputPart/InputPart'

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
      return (
      <div className='greeting-container'>
        <div className='greeting'>
            <h1> Hello you have succesfully loged in!!</h1>
            <h2> 
              <span onClick={this.addComment} type='button' >Write</span>{' '}
              a first comment!</h2>
        </div>
      </div>
      )
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