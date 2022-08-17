import { createRouter, createWebHashHistory } from "vue-router";
// import store from "@/store";
// import { Mutations, Actions } from "@/store/enums/StoreEnums";
// import JwtService from "@/core/services/JwtService";

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/",
        name: "weather",
        component: () =>
          import("@/Pages/Weather.vue"),
      },
      {
        path: "signup",
        name: "sign-up",
        component: () =>
          import("@/Pages/Signup.vue"),
      },
      {
        path: "signin",
        name: "sign-in",
        component: () =>
          import("@/Pages/Signin.vue"),
      },
      {
        path: "weather",
        name: "weather",
        component: () =>
          import("@/Pages/Weather.vue"),
      },
      {
        path: "weather/id/:useremail/sign/:signed",
        props: true,
        name: "weatherlist",
        component: () =>
          import("@/Pages/WeatherList.vue"),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach(() => {
//   // reset config to initial state
//   // store.commit(Mutations.RESET_LAYOUT_CONFIG);

//   // store.dispatch(Actions.VERIFY_AUTH, { api_token: JwtService.getToken() });

//   // Scroll page to top on every route change
//   setTimeout(() => {
//     window.scrollTo(0, 0);
//   }, 100);
// });

export default router;
