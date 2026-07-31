<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <form @submit.prevent="login">
            <div class="form-group">
                <label>Tên đăng nhập</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="user.username"
                />
            </div>
            <div class="form-group">
                <label>Mật khẩu</label>
                <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                />
            </div>

            <p v-if="message" class="text-danger">{{ message }}</p>

            <button class="btn btn-primary">Đăng nhập</button>
            <router-link :to="{ name: 'register' }" class="ml-2">
                Chưa có tài khoản? Đăng ký
            </router-link>
        </form>
    </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
            message: "",
        };
    },
    methods: {
        async login() {
            this.message = "";
            try {
                const data = await AuthService.login(this.user);
                // Lưu token và tên người dùng vào localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                // Chuyển về trang danh bạ
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                this.message =
                    error.response?.data?.message || "Đăng nhập thất bại.";
            }
        },
    },
};
</script>
