<template>
    <div/>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'TheEmployee',
    data() {
        return {
            accountId: this.$route.params.id
        };
    },
    async created() {
        await this.getEmployee(this.accountId);

        window.history.back();
    },
    methods: {
        ...mapActions('download', [
            'getEmployee'
        ])
    }
};
</script>
