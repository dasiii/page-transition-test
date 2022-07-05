import { createRouter, createWebHistory } from "vue-router";
import ListView from "../views/ListView.vue";

declare global {
  interface Document {
    createDocumentTransition: Function;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ListView,
    },
    {
      path: "/:id",
      name: "detail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DetailView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (!document.createDocumentTransition) {
    console.log("no transition");
  } else {
    const transition = document.createDocumentTransition();
    await transition.start();
  }
});

export default router;
