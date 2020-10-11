<template>
    <div class="mb-2">
        <h6 class="font-weight-bold">
            {{ name }}
        </h6>

        <div v-if="value && !ahref">
            {{ text_left }} {{ value }} {{ text_right }}
        </div>

        <div v-if="ahref">
            <router-link :to="ahref">
                {{ value }}
            </router-link>
        </div>
    </div>
</template>

<script>
import AccountProfile from "@/mixins/AccountProfile";

export default {
    name: 'StaticData',
    mixins: [
        AccountProfile
    ],
    props: {
        ahref: {
            type: Object
        },
        name: {
            type: String
        },
        text_left: {
            type: null
        },
        text_right: {
            type: null
        },
        value: {
            type: null
        }
    }
};
</script>