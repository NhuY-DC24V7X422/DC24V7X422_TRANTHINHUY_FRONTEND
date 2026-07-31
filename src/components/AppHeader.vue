<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Danh bạ
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'favorites' }" class="nav-link">
                    Yêu thích
                    <i class="fas fa-star"></i>
                </router-link>
            </li>
        </div>
        <div class="navbar-nav">
            <li v-if="username" class="nav-item">
                <span class="nav-link">
                    <i class="fas fa-user"></i> {{ username }}
                </span>
            </li>
            <li v-if="username" class="nav-item">
                <a href="#" class="nav-link" @click.prevent="logout">
                    Đăng xuất <i class="fas fa-sign-out-alt"></i>
                </a>
            </li>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            username: localStorage.getItem("username") || "",
        };
    },
    watch: {
        $route() {
            this.username = localStorage.getItem("username") || "";
        },
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            this.username = "";
            this.$router.push({ name: "login" });
        },
    },
};
</script>
