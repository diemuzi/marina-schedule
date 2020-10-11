<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Employee account schedule has been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'calendar:schedule' }"
                  title="Search"/>

            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.name"
                                 :ahref="{ name: 'schedule:profile', params: { id: scheduleId } }"
                                 name="Name"/>

                    <static-data :value="day.charAt(0).toUpperCase() + day.slice(1)"
                                 name="Day of week"/>

                    <static-data :value="formObj.time_start"
                                 name="Start Time"/>

                    <static-data :value="formObj.time_end"
                                 name="End Time"/>

                    <static-data :value="totalTime(formObj.time_start, formObj.time_end, has_break)"
                                 name="Total Time"/>

                    <CForm>
                        <vue-select-sides
                            id="selected"
                            v-model="selectedAccounts"
                            :list="scheduleBase"
                            name="selected"
                            type="mirror"/>

                        <CRow class="mt-3">
                            <CCol class="text-left"
                                  col="6">
                                <CButton class="px-4"
                                         color="primary"
                                         @click="submitUpdate">
                                    Update
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCard>
            </CTab>

            <CTab title="Download"
                  :to="{ name: 'download:schedule', params: { id: scheduleId } }" />
        </CTabs>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import StaticData from "@/components/StaticData";
import TotalTime from "@/mixins/TotalTime";
import Vue from "vue";
import vueSelectSides from "vue-select-sides";
import {mapActions, mapGetters, mapState} from "vuex";

Vue.use(vueSelectSides, {
    locale: "en_US"
});

export default {
    name: 'TheAccountProfile',
    components: {
        StaticData,
        vueSelectSides
    },
    mixins: [
        Loading,
        TotalTime
    ],
    data() {
        return {
            day: this.$route.params.day,
            selected: [],
            scheduleId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('calendar', [
            'formSuccess',
            'scheduleBase'
        ]),
        ...mapState('calendar', [
            'formObj'
        ]),
        has_break: {
            get: function () {
                return this.formObj[`account_${this.day}_break`];
            }
        },
        selectedAccounts: {
            get: function () {
                return this.formObj[`account_${this.day}`];
            },
            set: function (newValue) {
                this.selected = newValue;
            }
        }
    },
    async created() {
        await this.getScheduleProfile({
            day: this.day,
            id: this.scheduleId
        });
    },
    methods: {
        ...mapActions('calendar', [
            'getScheduleProfile',
            'updateScheduleProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateScheduleProfile({
                accounts: this.selected,
                day: this.day,
                id: this.scheduleId
            });

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>

<style lang="scss">
@import "~vue-select-sides/styles/themes/soft.scss";
</style>