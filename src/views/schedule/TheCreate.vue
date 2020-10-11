<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'schedule:search' }"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CRow>
                        <CCol sm="6">
                            <CCard bodyWrapper>
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

                                <static-data :value="totalTime(formObj.time_start, formObj.time_end)"
                                             name="Total Time"/>

                                <CRow>
                                    <CCol class="text-left"
                                          col="6">
                                        <CButton :disabled="invalid"
                                                 class="px-4"
                                                 color="primary"
                                                 @click="handleSubmit(submitCreate)">Create
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCard>
                        </CCol>
                    </CRow>
                </CForm>
            </ValidationObserver>
        </CTab>
    </CTabs>
</template>

<script>
import {InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import StaticData from "@/components/StaticData";
import TotalTime from "@/mixins/TotalTime";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheCreate',
    components: {
        InputText,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading,
        TotalTime
    ],
    computed: {
        ...mapGetters('schedule', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('schedule', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('schedule', [
            'createSchedule',
            'formClean'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createSchedule();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'schedule:search'
                })
            } else {
                this.$refs.observer.setErrors(this.formErrors);

                scroll(0, 0);

                this.loadingState = false;
            }
        }
    }
};
</script>
