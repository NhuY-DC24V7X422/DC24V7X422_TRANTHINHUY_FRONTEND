<template>
    <div class="page">
        <h4>Đăng ký tài khoản</h4>
        <form @submit.prevent="register">
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
            <div class="form-group">
                <label>Xác nhận mật khẩu</label>
                <input
                    type="password"
                    class="form-control"
                    v-model="confirmPassword"
                />
            </div>

            <p v-if="message" class="text-danger">{{ message }}</p>

            <button class="btn btn-primary">Đăng ký</button>
            <router-link :to="{ name: 'login' }" class="ml-2">
                Đã có tài khoản? Đăng nhập
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
            confirmPassword: "",
            message: "",
        };
    },
    methods: {
        async register() {
            this.message = "";
            if (!this.user.username || !this.user.password) {
                this.message = "Vui lòng nhập đầy đủ thông tin.";
                return;
            }
            if (this.user.password !== this.confirmPassword) {
                this.message = "Mật khẩu xác nhận không khớp.";
                return;
            }
            try {
                await AuthService.register(this.user);
                alert("Đăng ký thành công. Vui lòng đăng nhập.");
                this.$router.push({ name: "login" });
            } catch (error) {
                this.message =
                    error.response?.data?.message || "Đăng ký thất bại.";
            }
        },
    },
};
</script>
