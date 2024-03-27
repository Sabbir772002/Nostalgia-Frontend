import React from 'react';

const GroupCard = ({ group }) => {
  return (
    <div className="card group-card">
      <img src={group.picUrl} alt="Group Picture" className="group-pic" />
      <div className="group-details">
        <div className="group-name">{group.name}</div>
        <div className="group-motto">{group.motto}</div>
        <div className="clearfix">
          <div className="genre-name">{group.genre}</div>
          <button className="btn btn-primary join-btn">Join</button>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
