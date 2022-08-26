/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import Navbarjelly from "../components/Navbarjelly";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../store/actions/post";
import { fetchArticle, editArticle } from "../store/actions/article";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useTranslation } from "react-i18next";

const Editor = () => {
  let { articleSlug } = useParams();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  articleSlug = articleSlug ? articleSlug : "";
  useEffect(() => {
    dispatch(fetchArticle(articleSlug));
  }, []);
  const article = useSelector((state) => state.article.article.article);
  const [success, setSuccess] = React.useState(false);

  const registerHandler = async (values, { setSubmitting }) => {
    articleSlug
      ? dispatch(editArticle(values, articleSlug))
      : dispatch(createArticle(values));
    setSuccess(true);
    setSubmitting(false);
    dispatch(fetchArticle(articleSlug));

    // const article1 = localStorage.getItem("article");
    //console.log(article1? article1 : "no article");
  };

  return (
    <Formik
      initialValues={{ title: "", body: "", description: "", tags: [] }}
      onSubmit={registerHandler}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .required("Required")
          .min(8, "Title is too short - should be 8 chars minimum."),
        description: Yup.string()
          .required("Required")
          .min(16, "Description is too short - should be 16 chars minimum."),
        body: Yup.string()
          .required("Required")
          .min(50, "Body is too short. - should be 50 chars minimum."),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <>
            <Navbarjelly />

            <div style={{ margin: "auto", width: "50%", marginTop: "2rem" }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    size="lg"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      'form-control mt-1 ${errors.username && touched.username && "error"}'
                    }
                    placeholder={
                      articleSlug ? `${article?.title}` : t("a-title")
                    }
                  />

                  {errors.title && touched.title && (
                    <div className="input-feedback" style={{ color: "red" }}>
                      {errors.title}
                    </div>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder={
                      articleSlug ? `${article?.description}` : t("a-desc")
                    }
                    name="description"
                    value={values.description}
                    className={
                      'form-control mt-1 ${errors.username && touched.username && "error"}'
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.description && touched.description && (
                    <div className="input-feedback" style={{ color: "red" }}>
                      {errors.description}
                    </div>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder={
                      articleSlug ? `${article?.body}` : t("a-content")
                    }
                    name="body"
                    className={
                      'form-control mt-1 ${errors.username && touched.username && "error"}'
                    }
                    value={values.body}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.body && touched.body && (
                    <div className="input-feedback" style={{ color: "red" }}>
                      {errors.body}
                    </div>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder={
                      articleSlug ? `${article?.tagList}` : t("a-tags")
                    }
                    name="tags"
                    value={values.tags}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: "#6963AD",
                    borderColor: "#6963AD",
                    float: "right",
                  }}
                >
                  {t("n-article")}{" "}
                </Button>
              </Form>
            </div>

            {success ? (
              <Alert variant="success" fade="false">
                {t("n-article-alert")}{" "}
              </Alert>
            ) : null}

            <div className="fixer">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default Editor;
