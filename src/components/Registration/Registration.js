import React from 'react'
import './Registration.css'

class Registration extends React.Component{
   constructor(){
     super()
     this.state={

     }
   }

   render(){
     return(
       <div className='registartion'>
         <div className='registartion-box'>
           <span className='log-in-btn' type='button'>Log in</span> and tell us your story!!!
         </div>
       </div>
     )
   }
} 

export default Registration