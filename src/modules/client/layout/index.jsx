import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import Content from './Content';

function ClientLayout() {
  return (
    <div className="layout" style={{ display: 'flex', flexDirection: 'column' }}>
      
      <div className="main" style={{ display: 'flex' }}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default ClientLayout;
