<template>
    <div/>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'TheSchedule',
    data() {
        return {
            scheduleId: this.$route.params.id
        };
    },
    async created() {
        await this.getSchedule(this.scheduleId);

        window.history.back();
    },
    methods: {
        ...mapActions('download', [
            'getSchedule'
        ])
    }
};
</script>
