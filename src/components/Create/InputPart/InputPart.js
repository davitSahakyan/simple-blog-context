// import React from 'react'

// class InputPart extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//        value : '',
//     }
//   }

//   handleInput = (e) =>{
//     this.setState({
//       value : e.target.value
//     })
//   } 

//   handleKeyDown = (e) =>{
//     if(e.key === 'Enter'){
//       this.props.addToComments(this.state.value)
//     }
//   }

//   render(){
//     return(
//       <div className='input-part'>
//           <div className='input-container'>
//               <input 
//               type='text' 
//               placeholder='write comment'
//               onChange={this.handleInput}
//               onKeyDown={this.handleKeyDown}
//               />
//           </div>
//       </div>
//     )
//   }
// }

// export default InputPart