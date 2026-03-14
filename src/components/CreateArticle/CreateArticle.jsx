import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { useCreateArticleMutation } from "../../store/api";
import ArticleForm from "../ArticleForm/ArticleForm";

function CreateArticle() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [createArticle, { isLoading: isSubmitting }] =
    useCreateArticleMutation();

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      const result = await createArticle({
        title: data.title,
        text: data.text, // ИЗМЕНЕНО: только title + text (description и tags пока игнорируем)
      }).unwrap();
      navigate(`/articles/${result.id}`); // ИЗМЕНЕНО: id вместо slug
    } catch (error) {
      console.error(error);
      alert("Не удалось создать запись");
    }
  };

  return <ArticleForm onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}

export default CreateArticle;
