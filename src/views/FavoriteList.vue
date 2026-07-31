<template>
    <div class="page">
        <h4>
            Liên hệ yêu thích
            <i class="fas fa-star text-warning"></i>
        </h4>
        <ul v-if="favorites.length > 0" class="list-group">
            <li
                class="list-group-item"
                v-for="contact in favorites"
                :key="contact._id"
            >
                <router-link
                    :to="{ name: 'contact.edit', params: { id: contact._id } }"
                >
                    {{ contact.name }}
                </router-link>
            </li>
        </ul>
        <p v-else>Chưa có liên hệ yêu thích nào.</p>
    </div>
</template>

<script>
import ContactService from "@/services/contact.service";

export default {
    data() {
        return {
            favorites: [],
        };
    },
    methods: {
        async retrieveFavorites() {
            try {
                this.favorites = await ContactService.getFavorite();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveFavorites();
    },
};
</script>
