import { createRouter, createWebHistory } from "vue-router"
import ChatScreen from "../components/ChatScreen.vue"
import Login from "../components/Login.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/chat/:userName",
      name: "chat-screen",
      component: ChatScreen,
      beforeEnter: (to, from, next) => {
        if (from.name === "login") {
          next()
        } else {
          next({ name: "login" })
        }
      },
    },
  ],
})

export default router
