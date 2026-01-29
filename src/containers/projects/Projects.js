import React, {useState, useEffect, useContext, Suspense, lazy} from "react";
import "./Project.scss";
import Button from "../../components/button/Button";
import {openSource, socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import Loading from "../../containers/loading/Loading";
import EmptyState from "../../components/emptyState/EmptyState";
export default function Projects() {
  const GithubRepoCard = lazy(() =>
    import("../../components/githubRepoCard/GithubRepoCard")
  );
  const renderLoader = () => <Loading />;
  const [repo, setRepo] = useState(null);
  const [repoError, setRepoError] = useState(null);
  // todo: remove useContex because is not supported
  const {isDark} = useContext(StyleContext);

  useEffect(() => {
    if (!openSource.display) {
      return;
    }
    const getRepoData = () => {
      fetch("/profile.json")
        .then(result => {
          if (result.ok) {
            return result.json();
          }
          throw result;
        })
        .then(response => {
          setRepo(response.data.user.pinnedItems.edges || []);
          setRepoError(null);
        })
        .catch(function (error) {
          console.error(
            `${error} (because of this error, nothing is shown in place of Projects section. Also check if Projects section has been configured)`
          );
          setRepo([]);
          setRepoError(error || true);
        });
    };
    getRepoData();
  }, []);

  if (!openSource.display) {
    return null;
  }

  return (
    <Suspense fallback={renderLoader()}>
      <div className="main" id="opensource">
        <h1 className="project-title">Open Source Projects</h1>

        {repo === null ? (
          <Loading />
        ) : repoError ? (
          <EmptyState
            title="Projects are taking a nap."
            description="I couldn’t load GitHub projects right now. If you want the latest, GitHub is the source of truth."
            action={{
              text: "Open my GitHub",
              href: socialMediaLinks.github,
              newTab: true
            }}
          />
        ) : repo.length > 0 ? (
          <>
            <div className="repo-cards-div-main">
              {repo.map((v, i) => {
                if (!v) {
                  console.error(
                    `Github Object for repository number : ${i} is undefined`
                  );
                }
                return (
                  <GithubRepoCard repo={v} key={v.node.id} isDark={isDark} />
                );
              })}
            </div>
            <Button
              text={"More Projects"}
              className="project-button"
              href={socialMediaLinks.github}
              newTab={true}
            />
          </>
        ) : (
          <EmptyState
            title="No pinned repos (yet)."
            description="I’ll add some favorites here once I’ve picked the ones I want to highlight."
            action={{
              text: "Browse GitHub",
              href: socialMediaLinks.github,
              newTab: true
            }}
          />
        )}
      </div>
    </Suspense>
  );
}
