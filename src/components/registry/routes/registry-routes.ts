import { setTitle, validateToken, setHeaders, auth } from "@/middleware";

const registryRoutes = [
  {
    path: "/manage-registry",
    component: () =>
      import(/* webpackChunkName: "Registry" */ "../Registry.vue"),
    meta: {
      requiresAuth: true,
      title: "Manage Registry",
      middleware: [setTitle, validateToken, setHeaders, auth],
    },
  },
];

export default registryRoutes;
