import React from 'react'
export default function Alert(props) {
  
    const capital=(word)=>{
      if(word==="danger"){
        word="Error"
      }
        const low=word.toLowerCase();
        return low.charAt(0).toUpperCase()+low.slice(1);
    }

    return (
      <div style={{height: '57px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}  role="alert">
         <strong>{capital(props.alert.type)}</strong>: {props.alert.msg} 
      </div>}
      </div>
    )
    }