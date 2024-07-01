import { Outlet } from "react-router-dom";
import { APP_PAGES } from "../../constants/routingConstants";
import React from "react";
import { CustomLink } from "../CustomLink/CustomLink";

const Layout = () => {
  return (
      <>
        <header className="header">
          <CustomLink to={APP_PAGES.MainMenu} className="link">Home</CustomLink>
          <CustomLink to={APP_PAGES.ReactSnake} className="link">React snake</CustomLink>
          <CustomLink to={APP_PAGES.ReduxSnake} className="link">Redux snake</CustomLink>
          <CustomLink to={APP_PAGES.ReactReduxSnake} className="link">ReactRedux snake</CustomLink>
        </header>

        <main className="container">
          <Outlet />
        </main>
      </>
  );
};

export { Layout };
