<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Schedule profile has been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'schedule:search' }"
                  title="Search"/>

            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Schedule ID"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
                            <input-text v-model="formObj.name"
                                        label="Name"
                                        name="name"
                                        required="true"
                                        rules="required"/>

                            <input-text v-model="formObj.time_start"
                                        label="Start Time"
                                        name="time_start"
                                        required="true"
                                        rules="required"/>

                            <input-text v-model="formObj.time_end"
                                        label="End Time"
                                        name="time_end"
                                        required="true"
                                        rules="required"/>

                            <input-switch v-model="formObj.has_break"
                                          :checked="formObj.has_break"
                                          label="Has Break"
                                          name="has_break"/>

                            <input-switch v-model="formObj.is_active"
                                          :checked="formObj.is_active"
                                          label="Status"
                                          name="is_active"/>

                            <static-data :value="totalTime(formObj.time_start, formObj.time_end, formObj.has_break)"
                                         name="Total Time"/>

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
        </CTabs>
    </div>
</template>

<script>
import {InputSwitch, InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import StaticData from "@/components/StaticData";
import TotalTime from "@/mixins/TotalTime";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputSwitch,
        InputText,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        TotalTime
    ],
    data() {
        return {
            scheduleId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('schedule', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('schedule', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.scheduleId
        });
    },
    methods: {
        ...mapActions('schedule', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
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