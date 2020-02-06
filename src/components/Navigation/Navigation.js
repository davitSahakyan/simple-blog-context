import React from 'react'
import './Navigation.css'

class Navigation extends React.Component{
  

  render(){
    return(
      <div className='navigation-container'>
        <div className='navigation'>
          <div className='left-nav'>
            <div>
                <span className='icon'>
                  <i class="fas fa-blog" />
                  Blog
                </span>
             </div>
            <div className='create-post-btn'>
              <a href='/'>create post</a>
             </div>
          </div>
          <div className='right-nav'>
            <div type='button'>
              Log in
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation