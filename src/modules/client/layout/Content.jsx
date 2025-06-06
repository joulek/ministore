import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../../index.css' ;
function Content() {
  return (
      <div className="content">
        <Outlet/>
      </div>
  );
}

export default Content;
