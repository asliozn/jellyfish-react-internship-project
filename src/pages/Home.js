import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbarjelly from "../components/Navbarjelly";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useNavigate } from "react-router-dom";
import { fetchTags } from "../store/actions/tags";
import {
  fetchPosts,
  getFollowFeed,
  fetchPostsByTag,
  likeArticle,
  unlikeArticle,
} from "../store/actions/post";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const articleList = useSelector((state) => state.post.posts.articles);
  const tagList = useSelector((state) => state.tag.tags.tags);

  const articleByTag = useSelector((state) => state.post.posts.articles);

  const followFeed = useSelector((state) => state.post.posts.articles);

  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  const [tagPage, setTagPage] = React.useState(false);
  const [tagName, setTagName] = React.useState("");
  const [followPage, setFollowPage] = React.useState(false);
  const [favFunc, setFavFunc] = React.useState(false);

  const favoriteHandler = (slug) => {
    if (user) {
      console.log("like");
      dispatch(likeArticle(slug));
      dispatch(fetchPosts());
      setFavFunc(true);
    } else {
      navigate("/login");
    }
  };

  const unfavoriteHandler = (slug) => {
    if (user) {
      console.log("unlike");
      dispatch(unlikeArticle(slug));
      dispatch(fetchPosts());
        setFavFunc(false);
    } else {
      navigate("/login");
    }
  };

  const tagHandler = (tag) => {
    dispatch(fetchPostsByTag(tag));
    setTagPage(true);
    setTagName(tag);
    console.log(tag);
  };
  const followHandler = () => {
    dispatch(getFollowFeed());
    setFollowPage(true);
  };
  const closeFollow = () => {
    dispatch(fetchPosts());
    console.log("close");
    setFollowPage(false);
  };

  return (
    <>
      <Navbarjelly />

      <div className="banner-style">
        <h1>JellyFish</h1>
        <h2>{t("banner")}</h2>
      </div>

      <Container style={{ marginLeft: "10%", marginRight: "5%" }}>
        <Row>
          <Col md={9} sm={12} xs={12}>
            <div>
              <ul className="profile-page-list">
                <li style={{ float: "left", display: "list-item" }}>
                  <button
                    className="profile-p-button"
                    onClick={() => {
                      closeFollow();
                    }}
                  >
                    {t("g-feed")}
                  </button>
                </li>

                <li style={{ float: "left", display: "list-item" }}>
                  <Link to="/" className="profile-page-anchor">
                    {tagName}
                  </Link>
                </li>

                {user ? (
                  <li style={{ float: "left", display: "list-item" }}>
                    <button
                      className="profile-p-button"
                      onClick={() => {
                        followHandler();
                      }}
                    >
                      {t("h-p-follow")}
                    </button>
                  </li>
                ) : null}
              </ul>

              {tagPage ? (
                <article style={{ clear: "both" }}>
                  {articleByTag?.map((article) => (
                    <div
                      key={article.slug}
                      style={{
                        borderTop: " 1px solid rgba(0,0,0,0.1)",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Link to={`/user/${article.author.username}`}>
                            <img
                              src={article.author.image}
                              className="home-page-image-style"
                              alt="profile"
                            />
                          </Link>

                          <div
                            style={{
                              display: "inline-block",
                              verticalAlign: "middle",
                            }}
                          >
                            <Link
                              to={`/user/${article.author.username}`}
                              className="home-page-link-style"
                            >
                              {article.author.username}
                            </Link>

                            <span
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {article.createdAt}
                            </span>
                          </div>
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          <Button
                            sx={{ color: "#AA86D5", borderColor: "#AA86D5" }}
                            size="small"
                            variant="outlined"
                            startIcon={
                              <FavoriteIcon className="icon" fontSize="small" />
                            }
                            onClick={() => {
                              favoriteHandler(article.slug);
                            }}
                          >
                            {article.favoritesCount}
                          </Button>

                          <Button
                            sx={{
                              color: "#AA86D5",
                              borderColor: "#AA86D5",
                              marginLeft: "2%",
                            }}
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              unfavoriteHandler(article.slug);
                            }}
                          >
                            <HeartBrokenIcon
                              className="icon"
                              fontSize="small"
                            />
                          </Button>
                        </div>
                      </div>

                      <h5>{article.title}</h5>
                      <p style={{ color: "grey" }}>{article.description}</p>

                      <Link
                        to={`/article/${article.slug}`}
                        style={{
                          color: "#6963AD",
                          float: "left",
                          textDecoration: "none",
                        }}
                      >
                        {" "}
                        {t("r-more")}
                      </Link>

                      <div style={{ display: "flex", justifyContent: "right" }}>
                        {article.tagList.map((tag) => (
                          <Link
                            to="/"
                            key={tag.id}
                            className="home-page-tag-style"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </article>
              ) : user ? (
                //global and follow
                followPage ? (
                  <article style={{ clear: "both" }}>
                    {followFeed?.map((article) => (
                      <div
                        key={article.slug}
                        style={{
                          borderTop: " 1px solid rgba(0,0,0,0.1)",
                          padding: "5px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <Link to={`/user/${article.author.username}`}>
                              <img
                                src={article.author.image}
                                className="home-page-image-style"
                                alt="profile"
                              />
                            </Link>

                            <div
                              style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                              }}
                            >
                              <Link
                                to={`/user/${article.author.username}`}
                                className="home-page-link-style"
                              >
                                {article.author.username}
                              </Link>

                              <span
                                style={{
                                  color: "#bbb",
                                  fontSize: "0.8rem",
                                  display: "block",
                                }}
                              >
                                {article.createdAt}
                              </span>
                            </div>
                          </div>

                          <div
                            style={{ display: "flex", justifyContent: "right" }}
                          >
                            <Button
                              sx={{ color: "#AA86D5", borderColor: "#AA86D5" }}
                              size="small"
                              variant="outlined"
                              startIcon={
                                <FavoriteIcon
                                  className="icon"
                                  fontSize="small"
                                />
                              }
                              onClick={() => {
                                favoriteHandler(article.slug);
                              }}
                            >
                              {article.favoritesCount}
                            </Button>

                            <Button
                              sx={{
                                color: "#AA86D5",
                                borderColor: "#AA86D5",
                                marginLeft: "2%",
                              }}
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                unfavoriteHandler(article.slug);
                              }}
                            >
                              <HeartBrokenIcon
                                className="icon"
                                fontSize="small"
                              />
                            </Button>
                          </div>
                        </div>
                        <h5>{article.title}</h5>
                        <p style={{ color: "grey" }}>{article.description}</p>

                        <Link
                          to={`/article/${article.slug}`}
                          style={{
                            color: "#6963AD",
                            float: "left",
                            textDecoration: "none",
                          }}
                        >
                          {" "}
                          {t("r-more")}
                        </Link>

                        <div
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          {article.tagList.map((tag) => (
                            <Link
                              to="/"
                              key={tag.id}
                              className="home-page-tag-style"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </article>
                ) : (
                  <article style={{ clear: "both" }}>
                    {articleList?.map((article) => (
                      <div
                        key={article.slug}
                        style={{
                          borderTop: " 1px solid rgba(0,0,0,0.1)",
                          padding: "5px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <Link to={`/user/${article.author.username}`}>
                              <img
                                src={article.author.image}
                                className="home-page-image-style"
                                alt="profile"
                              />
                            </Link>

                            <div
                              style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                              }}
                            >
                              <Link
                                to={`/user/${article.author.username}`}
                                className="home-page-link-style"
                              >
                                {article.author.username}
                              </Link>

                              <span
                                style={{
                                  color: "#bbb",
                                  fontSize: "0.8rem",
                                  display: "block",
                                }}
                              >
                                {article.createdAt}
                              </span>
                            </div>
                          </div>

                          <div
                            style={{ display: "flex", justifyContent: "right" }}
                          >
                            <Button
                              sx={{ color:"#AA86D5", borderColor: "#AA86D5"  }}
                              size="small"
                              variant="outlined"
                              startIcon={
                                <FavoriteIcon
                                  className="icon"
                                  fontSize="small"
                                />
                              }
                              onClick={() => {
                                favoriteHandler(article.slug);
                              }}
                            >
                              {article.favoritesCount}
                            </Button>
                            <Button
                              sx={{
                                color: "#AA86D5",
                                borderColor: "#AA86D5",
                                marginLeft: "2%",
                              }}
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                unfavoriteHandler(article.slug);
                              }}
                            >
                              <HeartBrokenIcon
                                className="icon"
                                fontSize="small"
                              />
                            </Button>
                          </div>
                        </div>

                        <h5>{article.title}</h5>
                        <p style={{ color: "grey" }}>{article.description}</p>

                        <Link
                          to={`/article/${article.slug}`}
                          style={{
                            color: "#6963AD",
                            float: "left",
                            textDecoration: "none",
                          }}
                        >
                          {" "}
                          {t("r-more")}
                        </Link>

                        <div
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          {article.tagList.map((tag) => (
                            <Link
                              to="/"
                              key={tag.id}
                              className="home-page-tag-style"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </article>
                )
              ) : (
                //global feed
                <article style={{ clear: "both" }}>
                  {articleList?.map((article) => (
                    <div
                      key={article.slug}
                      style={{
                        borderTop: " 1px solid rgba(0,0,0,0.1)",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Link to={`/user/${article.author.username}`}>
                            <img
                              src={article.author.image}
                              className="home-page-image-style"
                              alt="profile"
                            />
                          </Link>

                          <div
                            style={{
                              display: "inline-block",
                              verticalAlign: "middle",
                            }}
                          >
                            <Link
                              to={`/user/${article.author.username}`}
                              className="home-page-link-style"
                            >
                              {article.author.username}
                            </Link>

                            <span
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {article.createdAt}
                            </span>
                          </div>
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          <Button
                            sx={{ color: "#AA86D5", borderColor: "#AA86D5" }}
                            size="small"
                            variant="outlined"
                            startIcon={
                              <FavoriteIcon className="icon" fontSize="small" />
                            }
                            onClick={() => {
                              favoriteHandler(article.slug);
                            }}
                          >
                            {article.favoritesCount}
                          </Button>

                          <Button
                            sx={{
                              color: "#AA86D5",
                              borderColor: "#AA86D5",
                              marginLeft: "2%",
                            }}
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              unfavoriteHandler(article.slug);
                            }}
                          >
                            <HeartBrokenIcon
                              className="icon"
                              fontSize="small"
                            />
                          </Button>
                        </div>
                      </div>

                      <h5>{article.title}</h5>
                      <p style={{ color: "grey" }}>{article.description}</p>

                      <Link
                        to={`/article/${article.slug}`}
                        style={{
                          color: "#6963AD",
                          float: "left",
                          textDecoration: "none",
                        }}
                      >
                        {" "}
                        {t("r-more")}
                      </Link>

                      <div style={{ display: "flex", justifyContent: "right" }}>
                        {article.tagList.map((tag) => (
                          <Link
                            to="/"
                            key={tag.id}
                            className="home-page-tag-style"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </article>
              )}
            </div>
          </Col>

          <Col md={3} sm={12} xs={12}>
            <div className="h-tags">
              <h6>{t("p-tags")}</h6>

              {tagList?.map((tags) => (
                <button
                  key={tags.id}
                  className="forHoverTag"
                  onClick={() => {
                    tagHandler(tags);
                  }}
                >
                  {tags}
                </button>
              ))}
            </div>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
    </>
  );
};

export default Home;
