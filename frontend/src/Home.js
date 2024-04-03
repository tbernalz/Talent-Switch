import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Home.module.css'; // Importa los estilos CSS Module

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Panel central */}
      <div className={styles.panelContainer}>
        <div className={styles.panel}>
          <div className={styles.panelItem}><Link to="/create-opportunity">Create Opportunity</Link></div>
          <div className={styles.panelItem}><Link to="/function2">Function 2</Link></div>
          <div className={styles.panelItem}><Link to="/function3">Function 3</Link></div>
          <div className={styles.panelItem}><Link to="/function4">Function 4</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Home