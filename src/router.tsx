"use strict";

import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { homepageButtons } from "@/data/layout-buttons";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/homepage/HomePage";
import PlayGround from "@/pages/playground/PlayGround";
import AuthPage from "@/pages/authpage/AuthPage";
import GameOver from "./pages/gameover/GameOver";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout buttons={homepageButtons} />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "playground/:mode",
        element: <PlayGround />,
      },
      { path: "auth", element: <AuthPage /> },
      { path: "gameover", element: <GameOver /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
