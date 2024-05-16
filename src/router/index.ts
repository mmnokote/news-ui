import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import VueRouteMiddleware from "vue-route-middleware";

import { dashboardRoutes } from "@/components/dashboard";
import { userRoutes } from "@/components/user";
import { roleRoutes } from "@/components/role";
import { financialYearRoutes } from "@/components/setup/financial-year";
import { queryPriorityRoutes } from "@/components/setup/query-priority";

import { queryCategoryRoutes } from "@/components/setup/query-category";
import { queryCategoryRoutes as myAb } from "@/components/setup/query-category copy";
import { queryStatusRoutes } from "@/components/setup/query-status";
import { queryDocumentTypeRoutes } from "@/components/setup/query-document_type";
import { menuRoutes } from "@/components/menu";
import { notFoundRoute } from "@/components/404";
//import route middlewares
import { auth, setHeaders, setTitle, validateToken } from "@/middleware";

import About from "@/components/About.vue";
import ConferenceRegistration from "@/components/ConferenceRegistration.vue";

import Abstract from "@/components/Abstract.vue";
import Authentication from "@/components/Authentication.vue";
import Scan from "@/components/Scan.vue";
import Doccuments from "@/components/Doccuments.vue";
import outsideInsideRoutes from "@/components/routes/outer-routes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    component: () => import("@/layouts/default/Default.vue"),
    meta: {
      title: "Default",
      middleware: [setTitle],
    },
    props: (route: Route) => ({ query: route.query }),

    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import('@/views/Home.vue'),
      },

      {
        path: "/document-page",
        name: "Doccuments",
        component: Doccuments,
      },
      {
        path: "/registration-page",
        name: "Conference Registration",
        component: ConferenceRegistration,
      },
      {
        path: "/about-page",
        name: "Conference About",
        component: About,
      },
      {
        path: "/abstract-page",
        name: "Abstract",
        component: Abstract,
      },
      {
        path: "/authentication",
        name: "Login",
        component: Authentication,
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/Home.vue"),
    meta: {
      requiresAuth: true,
      title: "Dashboard",
      middleware: [setTitle, validateToken, setHeaders, auth],
    },

    children: [
      ...outsideInsideRoutes,
      ...dashboardRoutes,
      ...userRoutes,
      ...financialYearRoutes,
      ...queryCategoryRoutes,
      ...myAb,
      ...queryStatusRoutes,
      ...queryDocumentTypeRoutes,
      ...roleRoutes,
      ...menuRoutes,
      ...queryPriorityRoutes,
      ...notFoundRoute,
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.VITE_APP_PUBLIC_PATH,
  routes,
});

// middlewares
router.beforeEach(
  VueRouteMiddleware({ setTitle, validateToken, setHeaders, auth })
);

export default router;
