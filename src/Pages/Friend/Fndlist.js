import React from 'react'
import FndVox from "../../Components/Fndlist/FndVox"

const Fndbox = ({fndlist,setfndlist,fetchfnd}) => {
  return (
<div className='fndlist'>
        {fndlist.map((fnd)=>(
             <div className="d-inline-flex p-4">

            <FndVox 
            fndlist={fndlist}
            setfndlist={setfndlist}
            fnd ={fnd}
            fetchfnd={fetchfnd}
            />
            </div>
        ))}
    </div>   
  )
}

export default Fndbox;