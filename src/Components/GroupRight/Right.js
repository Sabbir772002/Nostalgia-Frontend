import React from 'react'
import "../RightSide/Right.css"
import {GrFormClose} from "react-icons/gr"
import ShowGroup from '../GMiddle/RightGroup/ShowGroup'
import Sugg from '../GMiddle/GroupSugg/Sugg';
const Right = ({following,setFollowing,showMenu,setShowMenu,fetchOverseerList}) => {

  return (
    <div className={showMenu ? "R-Side active" : "R-Side unActive"}>
      <ShowGroup fetchOverseerList={fetchOverseerList}/>
      <Sugg fetchOverseerList={fetchOverseerList}/>     
      {/* <Sugg
      following={following}
      setFollowing={setFollowing}
      /> */}
    </div>
  )
}

export default Right