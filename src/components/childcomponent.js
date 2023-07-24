import React, { useState } from 'react'
import ParentComponent from './parentcomponent'
function childcomponent(props) {
    // const name = useState('Shivani')
    const user = {
        name: 'Lisa Parker',
        email: 'lisa@gmail.com',
      }
    
    //   const onClick = () => {
    //     props.sendData(user)
    //   }
  return (
    <div>
       <div>{props.message}</div>
       <button onClick={() => props.setMessage('Child here')}>
     Child here
    </button>

    <button onClick={ props.sendData(user)}>Click Here</button>
    </div>
  )
}

export default childcomponent