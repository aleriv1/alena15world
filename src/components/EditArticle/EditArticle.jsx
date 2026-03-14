import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../App";
// ИМПОРТЫ: раскомментируем update, так как редактирование нужно
import { useGetArticleQuery, useUpdateArticleMutation } from "../../store/api";
import ArticleForm from "../ArticleForm/ArticleForm";

// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: удаляет HTML-теги из строки
const stripHtml = (html) => {
  if (!html) return "";
  // Создаём временный div, чтобы браузер сам убрал теги
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

function EditArticle() {
  const { slug } = useParams(); // slug = id поста
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState(null);

  // Получаем статью для редактирования
  const { data: article, isLoading } = useGetArticleQuery(slug);
  // ИСПРАВЛЕНО: раскомментировали мутацию обновления
  const [updateArticle, { isLoading: isSubmitting }] =
    useUpdateArticleMutation();

  // Проверка авторизации и прав на редактирование
  useEffect(() => {
    if (!user) {
      navigate("/sign-in", { replace: true });
      return;
    }

    // ИСПРАВЛЕНО: WordPress возвращает автора в _embedded
    if (article && user.username !== article._embedded?.author?.[0]?.name) {
      console.log("Нет прав на редактирование этой статьи");
      navigate(`/articles/${slug}`, { replace: true });
    }
  }, [user, article, navigate, slug]);

  // // Подготовка данных для формы
  // useEffect(() => {
  //   if (article) {
  //     // ИСПРАВЛЕНО: маппинг WordPress полей в формат формы
  //     setDefaultValues({
  //       title: article.title?.rendered || "",
  //       shortDescription:
  //         article.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "") || "", // убираем HTML теги
  //       text: article.content?.rendered || "",
  //       tags: [], // теги пока не поддерживаются
  //     });
  //   }
  // }, [article]);

  // Подготовка данных для формы
  useEffect(() => {
    if (article) {
      // ИСПРАВЛЕНО: очищаем HTML от тегов перед передачей в форму
      setDefaultValues({
        title: stripHtml(article.title?.rendered || ""), // ОЧИЩАЕМ заголовок
        shortDescription: stripHtml(article.excerpt?.rendered || ""), // ОЧИЩАЕМ описание
        text: stripHtml(article.content?.rendered || ""), // ОЧИЩАЕМ основной текст
        tags: [], // Теги пока не поддерживаются
      });
    }
  }, [article]);

  const onSubmit = async (data) => {
    try {
      // ИСПРАВЛЕНО: адаптация данных под WordPress API
      const result = await updateArticle({
        id: slug, // для WP нужен id, не slug
        article: {
          title: data.title,
          excerpt: data.shortDescription,
          content: data.text,
          status: "publish",
          // categories: [2], // если нужна категория
        },
      }).unwrap();

      // После успешного обновления переходим на страницу статьи
      navigate(`/articles/${slug}`);
    } catch (error) {
      console.error("Ошибка при обновлении статьи:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  // Если данные не загрузились или нет прав
  if (!defaultValues) return null;

  return (
    <ArticleForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
    />
  );
}

export default EditArticle;
