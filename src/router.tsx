"use strict";

import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { homepageButtons } from "@/data/layout-buttons";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/homepage/HomePage";
import GamePage from "@/pages/gamepage/GamePage";

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
        path: "/playground",
        element: <GamePage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
