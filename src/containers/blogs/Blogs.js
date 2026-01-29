import React, {useState, useEffect, useContext} from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import {blogSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import EmptyState from "../../components/emptyState/EmptyState";
export default function Blogs() {
  const {isDark} = useContext(StyleContext);
  const [mediumBlogs, setMediumBlogs] = useState([]);
  const [isLoadingMediumBlogs, setIsLoadingMediumBlogs] = useState(false);
  function setMediumBlogsFunction(array) {
    setMediumBlogs(array);
  }
  //Medium API returns blogs' content in HTML format. Below function extracts blogs' text content within paragraph tags
  function extractTextContent(html) {
    return typeof html === "string"
      ? html
          .split(/<\/p>/i)
          .map(part => part.split(/<p[^>]*>/i).pop())
          .filter(el => el.trim().length > 0)
          .map(el => el.replace(/<\/?[^>]+(>|$)/g, "").trim())
          .join(" ")
      : NaN;
  }
  useEffect(() => {
    if (blogSection.displayMediumBlogs === "true") {
      setIsLoadingMediumBlogs(true);
      const getProfileData = () => {
        fetch("/blogs.json")
          .then(result => {
            if (result.ok) {
              return result.json();
            }
          })
          .then(response => {
            setMediumBlogsFunction(response.items);
            setIsLoadingMediumBlogs(false);
          })
          .catch(function (error) {
            console.error(
              `${error} (because of this error Blogs section could not be displayed. Blogs section has reverted to default)`
            );
            setMediumBlogsFunction("Error");
            blogSection.displayMediumBlogs = "false";
            setIsLoadingMediumBlogs(false);
          });
      };
      getProfileData();
    }
  }, []);
  if (!blogSection.display) {
    return null;
  }

  const usingMediumBlogs =
    blogSection.displayMediumBlogs === "true" &&
    !(typeof mediumBlogs === "string" || mediumBlogs instanceof String);

  const localBlogs = blogSection.blogs || [];
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="blogs">
        <div className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p
            className={
              isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"
            }
          >
            {blogSection.subtitle}
          </p>
        </div>
        <div className="blog-main-div">
          <div className="blog-text-div">
            {usingMediumBlogs ? (
              isLoadingMediumBlogs ? (
                <EmptyState
                  title="Loading posts…"
                  description="Give me a second—I'm pulling these in."
                />
              ) : mediumBlogs.length > 0 ? (
                mediumBlogs.map((blog, i) => {
                  return (
                    <BlogCard
                      key={i}
                      isDark={isDark}
                      blog={{
                        url: blog.link,
                        title: blog.title,
                        description: extractTextContent(blog.content)
                      }}
                    />
                  );
                })
              ) : (
                <EmptyState
                  title="No posts here (yet)."
                  description="Either I haven't published any recently, or I'm still deciding what’s worth writing about."
                />
              )
            ) : localBlogs.length > 0 ? (
              localBlogs.map((blog, i) => {
                  return (
                    <BlogCard
                      key={i}
                      isDark={isDark}
                      blog={{
                        url: blog.url,
                        image: blog.image,
                        title: blog.title,
                        description: blog.description
                      }}
                    />
                  );
                })
            ) : (
              <EmptyState
                title="No posts here (yet)."
                description="I’ll add writing here when I have something I’m genuinely excited to share."
              />
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
