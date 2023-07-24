import React, { useState } from 'react'
import ChildComponent from './childcomponent'
function Parentcomponent() {
    const [message, setMessage]= useState('Coming fro parnt component')
    const [data, setData] = useState({
        name: '?',
        email: '?',
      })
    
      const sendData = (data) => {
        setData(data)
      }
  return (
    <div>ParentComponent
        <ChildComponent message={message}  sendData={sendData(data)} setMessage={setMessage}/>
        
        <div>
        The user data sent from Child compoent:
        <strong>{data.name + ' : ' + data.email}</strong>
      </div>
    </div>
        
  )
}

export default Parentcomponent;