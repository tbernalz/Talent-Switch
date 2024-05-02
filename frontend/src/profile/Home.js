import React from 'react';
import { Link } from 'react-router-dom';
import styles from './../css/Home.module.css'; // Importa los estilos CSS Module

function Home() {
  return (
    <div>
      <nav className={styles.navbar} title='Home'>
        <ul>
          <li>Magneto Switch Talent</li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/home">Dashboard</Link></li>
          <li><Link to="/my-profile">Profile</Link></li>
          <li><Link to="/home">Settings</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>

      <div>

        {/* Contenedor de botones */}
        <div className={styles.buttonContainer}>
          <Link to="/create-opportunity" className={styles.button}>Create Opportunity</Link>
          <Link to="/list-opportunities" className={styles.button}>See Opportunities</Link>
          <Link to="/create-team" className={styles.button}>Create Project Team</Link>
          <Link to="/list-teams" className={styles.button}>See Teams</Link>
          <Link to="/create-postulation" className={styles.button}>Apply Individually</Link>
          <Link to="/list-postulations" className={styles.button}>See Postulations</Link>
          <Link to="/evaluation-form" className={styles.button}>Evaluation</Link>
          <p className={styles.dark_bg}>This page generalizes the functions of both types of users, later they will be separated.</p>  
          
        </div>
      </div>
      {/*       
      <div className={styles.panelContainer}>
        <div className={styles.panel}>
          <div className={styles.panelItem}><Link to="/create-opportunity">Create Opportunity</Link></div>
          <div className={styles.panelItem}><Link to="/function2">Function 2</Link></div>
          <div className={styles.panelItem}><Link to="/function3">Function 3</Link></div>
          <div className={styles.panelItem}><Link to="/function4">Function 4</Link></div>
        </div>
      </div> */}
    </div>
  )
}

export default Home