import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../App";
// import mockAva from "../../assets/mockAva.png";
import AlenaAva from "../../assets/alena-square-ava.png";

import styles from "./Header.module.scss";

// ADDED: импорт hook из RTK Query
// import { useGetCurrentUserQuery } from "../../services/api";
import { useGetCurrentUserQuery } from "../../store/api";

function Header({ onLogout }) {
  const { user } = useContext(AuthContext);

  // ADDED: запрос текущего пользователя из WordPress API
  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !user, // ADDED: если пользователь не залогинен — запрос не выполняется
  });

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logo}>Alena Diary</div>
      </Link>
      <div className={styles.authButtons}>
        {user ? (
          <>
            <Link to="/new-article">
              <button className={styles.createArticle}>Create article</button>
            </Link>
            <Link to="/profile" className={styles.profileLink}>
              {/* <span className={styles.userName}>{user.username}</span> */}
              <span className={styles.userName}>
                {user.username === "admin" ? "Alena" : user.username}
              </span>
              <img
                // src={user.image || mockAva}
                src={currentUser?.avatar || AlenaAva}
                // src={AlenaAva}
                alt={user.username}
                className={styles.userAvatar}
              />
            </Link>
            <button className={styles.logout} onClick={onLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <button className={styles.signIn}>A</button>
            </Link>
            {/* <Link to="/sign-up">
              <button className={styles.signUp}>Sign Up</button>
            </Link> */}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
