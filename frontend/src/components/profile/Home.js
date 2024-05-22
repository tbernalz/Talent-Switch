import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import styles from './../../styles/Home.module.css';

function Home() {
  const [user, setUser] = useState({ userName: '', userType: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/checkSession', { withCredentials: true })
      .then(response => {
        setUser({
          userName: response.data.name,
          userType: response.data.user_type,
        });
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
        navigate('/');
      });
  }, [navigate]);

  return (
    <div>
      <nav className={styles.navbar} title='Home'>
        <ul>
          <li>{user.userName && <div>Hi {user.userType === 'employee' ? 'employee' : 'leader'} {user.userName}</div>}</li>
          <li>Magneto Switch Talent</li>
          <li><Link to="/home">Inicio</Link></li>
          <li><Link to="/my-profile">Mi perfil</Link></li>
          <li><Link to="/">Salir</Link></li> {/* /logout */}
        </ul>
      </nav>

      <div>
        <div className={styles.buttonContainer}>
          {user.userType === 'leader' && (
            <>
              <Link to="/create-opportunity" className={styles.card}>Crear oportunidades</Link>
              <Link to="/list-opportunities" className={styles.card}>Ver oportunidades</Link>
              <Link to="/create-team" className={styles.card}>Crear equipos de proyecto</Link>
              <Link to="/list-teams" className={styles.card}>Ver equipos</Link>
              <Link to="/list-postulations" className={styles.card}>Ver Postulaciones</Link>
            </>
          )}
          {user.userType === 'employee' && (
            <>
              <Link to="/list-opportunities" className={styles.card}>Ver oportunidades</Link>
              <Link to="/list-teams" className={styles.card}>Ver equipos</Link>
              <Link to="/create-postulation" className={styles.card}>Aplicacion individual</Link>
              <Link to="/list-postulations" className={styles.card}>Ver Postulaciones</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

//   return (
//     <div>
//       <nav className={styles.navbar} title='Home'>
//         <ul>
//           <li>{user.userName && <div>Hi {user.userType === 'employee' ? 'employee' : 'leader'} {user.userName}</div>}</li>
//           <li>Magneto Switch Talent</li>
//           <li><Link to="/home">Inicio</Link></li>
//           <li><Link to="/my-profile">Mi perfil</Link></li>
//           <li><Link to="/">Salir</Link></li>
//         </ul>
//       </nav>

//       <div>
//         <div className={styles.buttonContainer}>
//           <Link to="/create-opportunity" className={styles.card}>Crear oportunidades</Link>
//           <Link to="/list-opportunities" className={styles.card}>Ver oportunidades</Link>
//           <Link to="/create-team" className={styles.card}>Crear equipos de proyecto</Link>
//           <Link to="/list-teams" className={styles.card}>Ver equipos</Link>
//           <Link to="/create-postulation" className={styles.card}>Aplicacion individual</Link>
//           <Link to="/list-postulations" className={styles.card}>Postulaciones</Link>
//           <p className={styles.dark_bg}>Aun no se discierne la información de ambos perfiles, se hará próximamente.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;