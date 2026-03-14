import { useContext, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false); // ADDED: состояние для меню

  // ADDED: запрос текущего пользователя из WordPress API
  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !user, // ADDED: если пользователь не залогинен — запрос не выполняется
  });

  // ADDED: закрытие меню при клике на ссылку
  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logo}>Alena Diary</div>
      </Link>
      <div className={styles.authButtons}>
        {user ? (
          <>
            <Link to="/new-article">
              <button className={styles.createArticle}>Create</button>
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
            {/* Кнопка-цветок для меню */}
            <button
              className={`${styles.flowerButton} ${menuOpen ? styles.active : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
            >
              🌸
            </button>

            {/* Меню с почтой, админкой и logout */}
            {menuOpen && (
              <div
                className={styles.overlay}
                onClick={() => setMenuOpen(false)}
              >
                <div className={styles.dropdownMenu}>
                  <a
                    href="https://sprintmail.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.dropdownItem}
                    onClick={handleMenuClick}
                  >
                    📧 Почта
                  </a>
                  <a
                    href="https://cms.alena15world.ru/wp-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.dropdownItem}
                    onClick={handleMenuClick}
                  >
                    ⚙️ Админка
                  </a>
                  <button
                    onClick={() => {
                      onLogout();
                      handleMenuClick();
                    }}
                    className={`${styles.dropdownItem} ${styles["dropdownItem--button"]}`}
                  >
                    🚪 Log Out
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <button className={styles.signIn}>
                A<br />
                Login
              </button>
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
