import { setTitle, validateToken, setHeaders, auth } from "@/middleware";

const queryCategoryRoutes = [
  {
    path: "/my-abstracts",
    component: () =>
      import(/* webpackChunkName: "QueryCategory" */ "../QueryCategory.vue"),
    meta: {
      requiresAuth: true,
      title: "Manage Abstracts",
      middleware: [setTitle, validateToken, setHeaders, auth],
    },
  },
];

export default queryCategoryRoutes;
