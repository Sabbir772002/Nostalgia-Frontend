import React from 'react';
import GroupCard from './GroupCard';

const App = () => {
  // Example group data (replace with actual data or use state/props)
  const groupData = {
    name: 'SunShine',
    motto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    genre: 'Thriller',
    picUrl: 'C:\Users\Irin Sultana\OneDrive\Pictures\download (1).jpg', // Replace with actual URL or path to group picture
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Render GroupCard component */}
          <GroupCard group={groupData} />
        </div>
      </div>
    </div>
  );
};

export default App;
