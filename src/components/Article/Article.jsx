import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

import { AuthContext } from "../../App";
// ИМПОРТЫ: оставляем только get, остальное закомментировано (лайки и удаление пока не нужны)
import { useGetArticleQuery } from "../../store/api";
// import { useToggleFavoriteMutation, useDeleteArticleMutation } from '../../store/api'

import styles from "./Article.module.scss";

function ArticleDetail() {
  const { slug } = useParams(); // ВНИМАНИЕ: slug = id поста (число)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // WordPress возвращает пост без обертки { article: ... }
  const { data: article, isLoading: loading, error } = useGetArticleQuery(slug);

  // ЗАКОММЕНТИРОВАНО: лайки пока не реализуем (нет в WordPress)
  // const [toggleFavorite, { isLoading: isLiking }] = useToggleFavoriteMutation();
  // const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

  // ЗАКОММЕНТИРОВАНО: лайки пока не нужны
  // const handleFavorite = async () => {
  //   try {
  //     await toggleFavorite({
  //       slug,
  //       favorited: article.article.favorited,
  //     }).unwrap();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // ЗАКОММЕНТИРОВАНО: удаление пока под вопросом
  // const handleDelete = async () => {
  //   try {
  //     await deleteArticle(slug).unwrap();
  //     navigate("/articles");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка загрузки</div>;
  if (!article) return null;

  // ИСПРАВЛЕНО: WordPress возвращает данные напрямую, без обертки article.article
  // Данные берутся:
  // - заголовок: article.title.rendered
  // - дата: article.date
  // - автор: article._embedded?.author[0]
  // - контент: article.content.rendered
  // - описание: article.excerpt.rendered (не используется в этой вьюхе)
  // - теги: article.tags (но это ID, для отображения нужны доп запросы — пока коммент)

  const author = article._embedded?.author?.[0] || {};
  const authorName = author.name || "Аноним";
  const authorAvatar = author.avatar_urls?.[96] || "";

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <div className={styles.articleTitleGroup}>
          <div className={styles.articleTitleAndLikes}>
            <h2
              className={styles.articleTitle}
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
            {/* ЗАКОММЕНТИРОВАНО: кнопка лайка пока не работает */}
            {/* <button
              onClick={handleFavorite}
              className={`${styles.likes} ${article.article.favorited ? styles.favorited : styles.unfavorited}`}
              disabled={!localStorage.getItem("token") || isLiking}
            >
              {article.article.favoritesCount}
            </button> */}
          </div>
          <div className={styles.tagsAndActions}>
            <span className={styles.tags}>
              {/* ЗАКОММЕНТИРОВАНО: теги требуют отдельного запроса по ID — пока не реализуем */}
              {/* {article.article.tagList.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))} */}
            </span>
          </div>
        </div>
        <div className={styles.articleAuthorAndDate}>
          <div className={styles.userNameAndCreationDate}>
            <span className={styles.userName}>{authorName}</span>
            <span className={styles.creationDate}>
              {format(new Date(article.date), "MMMM d, yyyy")}
            </span>
          </div>
          <img
            className={styles.userImage}
            src={authorAvatar}
            alt={authorName}
          />
        </div>
      </div>
      <div className={styles.descriptionAndControl}>
        <span className={styles.articleDescription}>
          {/* ИСПРАВЛЕНО: description теперь берется из эксцерпта (краткого описания) */}
          <div
            dangerouslySetInnerHTML={{
              __html: article.excerpt?.rendered || "",
            }}
          />
        </span>
        {/* ИСПРАВЛЕНО: проверка автора — сравниваем по автору поста и текущему юзеру */}
        {user && user.username === authorName && (
          <div className={styles.articleActions}>
            {/* Кнопка удаления пока закомментирована */}
            {/* <button
              onClick={() => setShowDeleteModal(true)}
              className={styles.deleteButton}
              disabled={isDeleting}
            >
              Delete
            </button> */}
            <button
              onClick={() => navigate(`/articles/${slug}/edit`)}
              className={styles.editButton}
              // disabled={isDeleting}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      {/* ИСПРАВЛЕНО: основной контент из content.rendered */}
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: article.content?.rendered || "" }}
      />

      {/* ЗАКОММЕНТИРОВАНО: модалка удаления пока не нужна */}
      {/* {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure to delete this article?</p>
            <div className={styles.modalButtons}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.noButton}
                disabled={isDeleting}
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className={styles.yesButton}
                disabled={isDeleting}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ArticleDetail;
