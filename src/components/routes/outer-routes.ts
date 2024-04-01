const outsideInsideRoutes = [
  {
    path: "/scan",
    component: () => import(/* webpackChunkName: "Scan" */ "../Scan.vue"),
    meta: { requiresAuth: false, title: "Scan" },
  },
];

export default outsideInsideRoutes;
