import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true,
    },
    {
        path: "/contacts",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
    },
    {
        path: "/favorites",
        name: "favorites",
        component: () => import("@/views/FavoriteList.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Điều hướng bảo vệ: chưa đăng nhập thì chuyển về trang /login
const publicPages = ["login", "register"];
router.beforeEach((to, from, next) => {
    const isPublic = publicPages.includes(to.name);
    const loggedIn = !!localStorage.getItem("token");
    if (!isPublic && !loggedIn) {
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;
