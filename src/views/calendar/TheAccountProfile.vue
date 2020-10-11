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
            <CTab :to="{ name: 'calendar:account' }"
                  title="Search"/>

            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :ahref="{ name: 'employee:manage:profile', params: { id: accountId } }"
                                 :value="formObj.name"
                                 name="Name"/>

                    <static-data :value="addTime(formObj)"
                                 name="Total Time"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-select v-model="formObj.schedule_sunday"
                                          :options="choices"
                                          :selected="formObj.schedule_sunday"
                                          label="Sunday"
                                          name="schedule_sunday"/>

                            <input-select v-model="formObj.schedule_monday"
                                          :options="choices"
                                          :selected="formObj.schedule_monday"
                                          label="Monday"
                                          name="schedule_monday"/>

                            <input-select v-model="formObj.schedule_tuesday"
                                          :options="choices"
                                          :selected="formObj.schedule_tuesday"
                                          label="Tuesday"
                                          name="schedule_tuesday"/>

                            <input-select v-model="formObj.schedule_wednesday"
                                          :options="choices"
                                          :selected="formObj.schedule_wednesday"
                                          label="Wednesday"
                                          name="schedule_wednesday"/>

                            <input-select v-model="formObj.schedule_thursday"
                                          :options="choices"
                                          :selected="formObj.schedule_thursday"
                                          label="Thursday"
                                          name="schedule_thursday"/>

                            <input-select v-model="formObj.schedule_friday"
                                          :options="choices"
                                          :selected="formObj.schedule_friday"
                                          label="Friday"
                                          name="schedule_friday"/>

                            <input-select v-model="formObj.schedule_saturday"
                                          :options="choices"
                                          :selected="formObj.schedule_saturday"
                                          label="Saturday"
                                          name="schedule_saturday"/>

                            <CRow>
                                <CCol class="text-left"
                                      col="6">
                                    <CButton :disabled="invalid"
                                             class="px-4"
                                             color="primary"
                                             @click="handleSubmit(submitUpdate)">Update
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CForm>
                    </ValidationObserver>
                </CCard>
            </CTab>

            <CTab title="Download"
                  :to="{ name: 'download:employee', params: { id: accountId } }" />
        </CTabs>
    </div>
</template>

<script>
import {InputSelect} from "@/components/form";
import Loading from "@/mixins/Loading";
import StaticData from "@/components/StaticData";
import TotalTime from "@/mixins/TotalTime";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheAccountProfile',
    components: {
        InputSelect,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        TotalTime
    ],
    data() {
        return {
            accountId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('calendar', [
            'choices',
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('calendar', [
            'formObj'
        ])
    },
    async created() {
        await this.getChoices();

        await this.getAccountProfile({
            id: this.accountId
        });
    },
    methods: {
        ...mapActions('calendar', [
            'getAccountProfile',
            'getChoices',
            'updateAccountProfile'
        ]),
        addTime(item) {
            let time = 0;

            if (item.sunday !== undefined) {
                time += this.decimalTime(
                    item.sunday.time_start,
                    item.sunday.time_end,
                    item.sunday.has_break
                );
            }

            if (item.monday !== undefined) {
                time += this.decimalTime(
                    item.monday.time_start,
                    item.monday.time_end,
                    item.monday.has_break
                );
            }

            if (item.tuesday !== undefined) {
                time += this.decimalTime(
                    item.tuesday.time_start,
                    item.tuesday.time_end,
                    item.tuesday.has_break
                );
            }

            if (item.wednesday !== undefined) {
                time += this.decimalTime(
                    item.wednesday.time_start,
                    item.wednesday.time_end,
                    item.wednesday.has_break
                );
            }

            if (item.thursday !== undefined) {
                time += this.decimalTime(
                    item.thursday.time_start,
                    item.thursday.time_end,
                    item.thursday.has_break
                );
            }

            if (item.friday !== undefined) {
                time += this.decimalTime(
                    item.friday.time_start,
                    item.friday.time_end,
                    item.friday.has_break
                );
            }

            if (item.saturday !== undefined) {
                time += this.decimalTime(
                    item.saturday.time_start,
                    item.saturday.time_end,
                    item.saturday.has_break
                );
            }

            return this.minTommss(time);
        },
        async submitUpdate() {
            this.loadingState = true;

            await this.updateAccountProfile({
                id: this.accountId
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
