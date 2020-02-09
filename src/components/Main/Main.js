import React from 'react';
import './Main.css';
import Comment from '../Comment/Comment'

class Main extends React.Component{
  constructor(){
    super();
    this.state={
      comments : [],
    }
  }

  addComment = () =>{

  }

  render(){
    const { comments } = this.state
    if(comments == false){
      console.log('uuuu')
      return (
      <div className='greeting-container'>
        <div className='greeting'>
            <h1> Hello you have succesfully loged in!!</h1>
            <h2> 
              <span onClick={this.addComment} >Write</span>{' '}
              a first comment!</h2>
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