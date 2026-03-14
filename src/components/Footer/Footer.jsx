import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Контакты</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>🏙️ Город:</span>
              <span className={styles.contactValue}>лучший на Земле ✨</span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>📞 Тел.:</span>
              <span className={styles.contactValue}>надейтесь :)</span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>✉️ Email:</span>
              <a
                href="mailto:alena@alena15world.ru"
                className={styles.contactLink}
              >
                alena@alena15world.ru
              </a>
            </li>
          </ul>
        </div>

        {/* <div
        // className={`${styles.footerSection} ${styles["footerSection--center-pos"]}`}
        // className={`${styles.footerSection} `}
        >
          <h3 className={styles.footerTitle}>Для админа</h3>
          <p>
            <a
              href="https://cms.alena15world.ru/wp-admin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.adminLink}
            >
              ⚙️ За сценой
            </a>
          </p>
        </div> */}

        <div
          className={`${styles.footerSection} ${styles["footerSection--center-pos"]}`}
        >
          <p className={styles.adminSection}>
            <a
              href="https://cms.alena15world.ru/wp-admin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.adminLink}
            >
              ⚙️ За сценой
            </a>
          </p>
          <div>
            <p className={styles.copyright}>
              © {currentYear} Сделано с ❤️ для Алены
            </p>
            <p className={styles.joke}>Лучший блог в Мире :) (субъективно)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
