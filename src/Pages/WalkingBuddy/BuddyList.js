import React from 'react'
import FindF from "../../Components/FindF/FindF"

const BuddyList = ({fndlist,setfndlist}) => {
  return (
<div className='fndlist'>
        {fndlist.map((fnd)=>(
             <div className="d-inline-flex p-4">

            <FindF 
            fndlist={fndlist}
            setfndlist={setfndlist}
            fnd ={fnd}
            />
            </div>
        ))}
    </div>   
  )
}

export default BuddyList;