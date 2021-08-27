import { createRouter, createWebHistory } from "vue-router";

// components
import Auth from "../containers/Auth";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Todo from "../containers/Todo";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
    children: [
      {
        name: "SignUp",
        path: "",
        component: SignUp,
      },
      {
        name: "SignIn",
        path: "sign-in",
        component: SignIn,
      },
    ],
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
