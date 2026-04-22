import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { getPathMapping, stringToSlug } from "../../utils";
import { useEffect, useLayoutEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { NotFound } from "../../components/NotFound";
import { Footer } from "../../components/Footer";
import "../../assets/css/education.css";
import "../../assets/css/footer.css";
import "../../assets/css/header.css";
import "../../assets/css/human-practices.css";
import "../../assets/css/navbar.css";
import "../../assets/css/members.css";
import "../../assets/css/home.css";
import "../../assets/css/model.css";
import "../../assets/css/parts.css";
import "../../assets/css/engineering.css";
import "../../assets/css/hardwaretimeline.css";
import "../../assets/css/hardwaremain.css";


const App = () => {
  const { pathname } = useLocation();
  const pathMapping = getPathMapping();
  const currentPath =
    pathname
      .split(`${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`)
      .pop() || "/";

  // Set Page Title
  const title =
    currentPath in pathMapping ? pathMapping[currentPath].title : "Not Found";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";

      return () => {
        window.history.scrollRestoration = previous;
      };
    }

    return undefined;
  }, []);

  useLayoutEffect(() => {
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;

    htmlElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0 });
    htmlElement.style.scrollBehavior = originalScrollBehavior;
  }, [pathname]);

  useEffect(() => {
    document.title = `${title || ""} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);


  return (
    <div className="app-layout">
      <Navbar />

      <main className="app-main">
        <Routes>
          {Object.entries(pathMapping).map(
            ([path, { title, lead, component: Component }]) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <Header title={title || ""} lead={lead || ""} />
                    <div className="container">
                      <Component />
                    </div>
                  </>
                }
              />
            ),
          )}
          <Route
            path="*"
            element={
              <>
                <Header
                  title="Not Found"
                  lead="The requested URL was not found on this server."
                />
                <NotFound />
              </>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
