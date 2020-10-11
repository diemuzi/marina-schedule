<template>
    <div/>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'TheScheduleAll',
    async created() {
        await this.getScheduleAll();

        window.history.back();
    },
    methods: {
        ...mapActions('download', [
            'getScheduleAll'
        ])
    }
};
</script>
