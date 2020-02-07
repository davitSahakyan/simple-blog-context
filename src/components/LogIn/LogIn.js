import React from 'react';
import './LogIn.css';

class LogIn extends React.Component{
  constructor(){
    super();
    this.state={
       name : '',
       password : '',
    }
  }

  handleChange = (e) =>{
     if(e.target.id  === 'name'){
       this.setState({ name : e.target.value})
     }else if(e.target.id  === 'pass'){
      this.setState({ password : e.target.value})
     }
  }

  render(){
    return(
      <div className='login-container'>
        <div className='login-title-container'>
          <h2 className='login-title'>Log in</h2>
        </div>
        <div className='login'>
          <input 
            type='text' 
            placeholder='Name *' 
            id='name' 
            className='login-input' 
            onChange={this.handleChange}/>
          <input 
            type='password' 
            placeholder='Password *' 
            id='pass' 
            className='login-input' 
            onChange={this.handleChange} />
          <button 
            className='login-btn' >log in</button>
        </div>
      </div>
    )
  }
}

export default LogIn