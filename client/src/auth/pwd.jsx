import React, { useState } from "react";
import generator from 'generate-password'

const App=()=> {
  
  const [pass,setPass]= useState();
  var passw = generator.generate({ length: 8,numbers: true});
  console.log(passw)

  return (

    <div className ="App">
        <div>pass:{pass}</div>
        <div>
            <button onClick={()=>setPass(passw)}>generate</button>
        </div>
        

    </div>
    
    
  );
}

export default App;