"use strict";

import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { homepageButtons } from "@/data/layout-buttons";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/homepage/HomePage";
import PlayGround from "@/pages/playground/PlayGround";

import Undrcity from "./pages/undrcity/Undrcity";
import UniverseXIII from "./pages/universe113/Universe113";
import Pokeverse from "./pages/pokeverse/Pokeverse";

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
        path: "playground",
        element: <PlayGround />,
        children: [
          {
            path: "undrcity",
            element: <Undrcity />,
          },
          {
            path: "universe113",
            element: <UniverseXIII />,
          },
          {
            path: "pokeverse",
            element: <Pokeverse />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
