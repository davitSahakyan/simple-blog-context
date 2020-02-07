import React from 'react'
import './Registration.css'
import { withRouter } from 'react-router-dom'

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
            <span className='log-in-btn' onClick={()=>this.props.history.push('/verify')} >Log in</span> and tell us your story!!!
         </div>
       </div>
     )
   }
} 

export default withRouter(Registration)