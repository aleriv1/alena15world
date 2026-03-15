import { Link } from "react-router-dom";
import styles from "./Landing.module.scss";

function Landing() {
  // ADDED: текущая дата для поздравления
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.landing}>
      <div className={styles.content}>
        {/* ADDED: крупное поздравление */}
        <h1 className={styles.title}>
          С днём рождения,
          <span className={styles.name}> Алена!</span>
        </h1>

        <p className={styles.date}>{formattedDate}</p>

        {/* ADDED: тёплые слова */}
        <div className={styles.message}>
          <p className={styles.greeting}>
            Пусть этот день будет таким же прекрасным, как ты. А этот дневник
            станет местом, где будут жить твои мысли, мечты и самые тёплые
            воспоминания.
          </p>

          <p className={styles.wishes}>
            ✨ Счастья, вдохновения и много поводов для улыбки! ✨
          </p>
        </div>

        {/* ADDED: кнопка перехода в дневник */}
        <Link to="/articles" className={styles.button}>
          Открыть дневник 🌸
        </Link>

        {/* ADDED: декоративный элемент */}
        <div className={styles.flowerDecoration}>
          <span className={styles.flower}>🌸</span>
          <span className={styles.flower}>🌼</span>
          <span className={styles.flower}>🌺</span>
        </div>
      </div>
    </div>
  );
}

export default Landing;
