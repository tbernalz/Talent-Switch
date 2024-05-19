import React from 'react';
import { Link } from 'react-router-dom'; 

import styles from './../../styles/Home.module.css'; // Importa los estilos CSS Module
 
function Home() {
  return (
    <div>
      <nav className={styles.navbar} title='Home'>
        <ul>
          <li>Magneto Switch Talent</li>
          <li><Link to="/home">Inicio</Link></li>
          <li><Link to="/my-profile">Mi perfil</Link></li>
          <li><Link to="/">Salir</Link></li>
        </ul>
      </nav>

      <div>

        {/* Contenedor de botones */}
        <div className={styles.buttonContainer}>
          <Link to="/create-opportunity" className={styles.card}>Crear oportunidades</Link>
          <Link to="/list-opportunities" className={styles.card}>Ver oportunidades</Link>
          <Link to="/create-team" className={styles.card}>Crear equipos de proyecto</Link>
          <Link to="/list-teams" className={styles.card}>Ver equipos</Link>
          <Link to="/create-postulation" className={styles.card}>Aplicacion individual</Link>
          <Link to="/list-postulations" className={styles.card}>Postulaciones</Link>
          <p className={styles.dark_bg}>Aun no se discierne la informacion de ambos perfiles, se hara proximamente.</p>
          
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