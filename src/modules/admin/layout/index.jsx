import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import Content from './Content';
import './css/style-home.css'; // Assure-toi du bon chemin

function AdminLayout() {
  return (

    <div className="layout" style={{ display: 'flex', flexDirection: 'column' }}>

      <div className="main" style={{ display: 'flex' }}>
        <Content />
      </div>
    </div>
  );
}

export default AdminLayout;
