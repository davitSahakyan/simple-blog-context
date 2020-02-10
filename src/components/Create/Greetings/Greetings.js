import React from 'react'

const Greetings = (props) =>{
  return(
      <div className='greeting-container'>
        <div className='greeting'>
            <h1> Hello you have succesfully loged in!!</h1>
            <h2> 
              <span onClick={props.handleGreetingStatusChange} type='button' >Write</span>{' '}
              a first comment!</h2>
        </div>
      </div>
  )
}


export default Greetings