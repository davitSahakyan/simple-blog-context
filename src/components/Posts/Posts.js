import React from 'react'

const Posts = (props) =>{
   return(
     <div>
       {props.posts.map( (post , index) => {
          return (
            <div key={index}>
              <h2>{post.username}</h2>
              post info -- {post.text}
            </div>
          )
       })}
     </div>
   )
}

export default Posts