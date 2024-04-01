import React from 'react'
import FindF from "../../Components/FindF/FindF"

const FindFlist = ({fndlist,setfndlist,fetchData}) => {
  return (
<div className='fndlist'>
        {fndlist.map((fnd)=>(
             <div className="d-inline-flex p-4">

            <FindF 
            fndlist={fndlist}
            setfndlist={setfndlist}
            fnd ={fnd}
            fetchData={fetchData}
            />
            </div>
        ))}
    </div>   
  )
}

export default FindFlist;