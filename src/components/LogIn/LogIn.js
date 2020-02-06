import React from 'react'

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
        <div className='login'>
          <input type='text' placeholder='Name *' id='name' onChange={this.handleChange}/>
          <input type='text' placeholder='Password *' id='pass' onChange={this.handleChange} />
          <button className='login-btn' >log in</button>
        </div>
      </div>
    )
  }
}

export default LogIn