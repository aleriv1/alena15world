import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useGetArticlesQuery } from "../../store/api"; // ИЗМЕНЕНО: правильный хук
import mockAva from "../../assets/mockAva.png";
import AlenaAva from "../../assets/alena-square-ava.png";
import styles from "./ArticleList.module.scss";

function ArticleList() {
  const limit = 5; // ИЗМЕНЕНО: уменьшил до 5 для удобства, можно вернуть 4
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const { data, isLoading: loading } = useGetArticlesQuery({ page, limit });

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= Math.ceil((data?.articlesCount || 0) / limit)
    ) {
      navigate(`/articles?page=${newPage}`);
    }
  };

  return (
    <div className={styles.articleList}>
      {loading && <div className={styles.loading}>Загрузка...</div>}

      {data?.articles?.map((article) => (
        <div key={article.id} className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.articleTitleGroup}>
              <Link
                className={styles.articleTitleLink}
                to={`/articles/${article.id}`}
              >
                <h2
                  dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                />{" "}
                {/* ИЗМЕНЕНО: .rendered */}
              </Link>
            </div>

            <div className={styles.articleAuthorAndDate}>
              <div className={styles.userNameAndCreationDate}>
                <span className={styles.userName}>
                  {/* {article._embedded?.author?.[0]?.name || "Аноним"}{" "} */}
                  {article._embedded?.author?.[0]?.name === "admin"
                    ? "Alena"
                    : article._embedded?.author?.[0]?.name || "Аноним"}{" "}
                  {/* ИЗМЕНЕНО: путь к имени */}
                </span>
                <span className={styles.creationDate}>
                  {format(new Date(article.date), "MMMM d, yyyy")}{" "}
                  {/* ИЗМЕНЕНО: date вместо createdAt */}
                </span>
              </div>
              <img
                className={styles.userImage}
                src={
                  article._embedded?.author?.[0]?.avatar_urls?.[96] || mockAva
                  // article._embedded?.author?.[0]?.avatar_urls?.[96] || AlenaAva
                  // AlenaAva
                }
                alt=""
              />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: article.excerpt.rendered || "" }}
          />{" "}
          {/* ИЗМЕНЕНО: excerpt вместо description */}
        </div>
      ))}

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(page - 1)}
          className={styles.arrowButton}
          disabled={page === 1 || loading}
        >
          {"<"}
        </button>
        <span>стр. {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className={styles.arrowButton}
          disabled={page * limit >= (data?.articlesCount || 0) || loading}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default ArticleList;
