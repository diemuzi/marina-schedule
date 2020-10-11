<template>
    <div/>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'TheEmployeeAll',
    async created() {
        await this.getEmployeeAll();

        window.history.back();
    },
    methods: {
        ...mapActions('download', [
            'getEmployeeAll'
        ])
    }
};
</script>
