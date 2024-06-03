import { setTitle, validateToken, setHeaders, auth } from "@/middleware";

const queryCategoryRoutes = [
  {
    path: "/abstracts",
    component: () =>
      import(/* webpackChunkName: "QueryCategory" */ "../QueryCategory.vue"),
    meta: {
      requiresAuth: true,
      title: "Manage News",
      middleware: [setTitle, validateToken, setHeaders, auth],
    },
  },
];

export default queryCategoryRoutes;
