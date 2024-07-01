import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import MainMenuPage from "./pages/MainMenuPage/MainMenuPage";
import ReactSnakePage from "./pages/ReactSnakePage/ReactSnakePage";
import ReduxSnakePage from "./pages/ReduxSnakePage/ReduxSnakePage";
import {APP_PAGES} from "./constants/routingConstants";
import {Layout} from "./components/Layout/Layout";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import ReactReduxSnakePage from "./pages/ReactReduxPage/ReactReduxSnakePage";

function App() {
  return (
      <>
        <Routes>
          <Route path={APP_PAGES.MainMenu} element={<Layout />}>
            <Route index element={<MainMenuPage />} />
            <Route path={APP_PAGES.ReactSnake} element={<ReactSnakePage />} />
            <Route path={APP_PAGES.ReduxSnake} element={<ReduxSnakePage />} />
            <Route path={APP_PAGES.ReactReduxSnake} element={<ReactReduxSnakePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;
