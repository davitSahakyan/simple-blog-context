import React from 'react';
import './Main.css';
import Comment from '../Comment/Comment'

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
         <div className='input-part'>
           <div className='input-container'>
             <input 
             type='text' 
             placeholder='write comment'
              />
           </div>
         </div>
       )
    }


    return(
      <div>
        {comments.map( coment =>{
          return  <Comment  />
        })} 
      </div>
    )
  }
}

export default Main