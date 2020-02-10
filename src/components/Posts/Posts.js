import React from 'react'

const Posts = (props) =>{
   return(
     <div>
       {props.posts.map( post => {
          return (
            <div key={post.postId}>
              post info -- {post.text}
            </div>
          )
       })}
     </div>
   )
}

export default Posts