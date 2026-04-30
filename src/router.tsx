"use strict";

import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { homepageButtons } from "@/data/layout-buttons";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/homepage/HomePage";
import PlayGround from "@/pages/playground/PlayGround";
import AuthPage from "@/pages/authpage/AuthPage";
import Leaderboard from "@/pages/leaderboard/Leaderboard";
import NotFound from "@/pages/not-found/NotFound";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout buttons={homepageButtons} />,
    errorElement: <NotFound />,

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
      { path: "leaderboard", element: <Leaderboard /> },
    ],
  },
  {
    errorElement: <div></div>,
  },
  { path: "*", element: <NotFound /> },
];

export const router = createBrowserRouter(routes);
