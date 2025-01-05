import React from 'react';
import SideMenu from '../Components/SideMenu';
import FriendList from '../Components/FriendList';
import MutualFriendList from '../Components/MutualFriendList';

const Home = () => {
  return (
    <div className="flex flex-col gap-6 px-4 lg:px-10">
      <div className="flex flex-col md:flex-row gap-11">
        <div className="w-full md:w-1/3 lg:w-1/5">
          <SideMenu />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <FriendList />
        </div>
      </div>
      <div className="w-full">
        <MutualFriendList />
      </div>
    </div>
  );
};

export default Home;
