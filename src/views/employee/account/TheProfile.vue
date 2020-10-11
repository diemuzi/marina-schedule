<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Account profile has been updated.
        </CAlert>

        <ValidationObserver
            ref="observer"
            v-slot="{ handleSubmit, invalid }">
            <CForm>
                <CRow>
                    <CCol sm="6">
                        <CCard bodyWrapper>
                            <static-data :value="formObj.id"
                                         name="Account ID"/>

                            <input-text v-model="formObj.first_name"
                                        label="First Name"
                                        name="first_name"
                                        required="true"
                                        rules="required"/>

                            <input-text v-model="formObj.last_name"
                                        label="Last Name"
                                        name="last_name"
                                        required="true"
                                        rules="required"/>

                            <input-text v-model="formObj.email"
                                        label="Email Address"
                                        name="email"
                                        required="true"
                                        rules="required"/>

                            <CRow>
                                <CCol class="text-left"
                                      col="6">
                                    <CButton :disabled="invalid"
                                             class="px-4"
                                             color="primary"
                                             @click="handleSubmit(submitUpdate)">
                                        Update
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCard>
                    </CCol>
                </CRow>
            </CForm>
        </ValidationObserver>
    </div>
</template>

<script>
import {InputText} from "@/components/form";
import Loading from "@/mixins/Loading";
import StaticData from "@/components/StaticData";
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        InputText,
        StaticData,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('employeeAccount', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeAccount', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile();
    },
    methods: {
        ...mapActions('employeeAccount', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile();

            if (!this.formSuccess) {
                this.$refs.observer.setErrors(this.formErrors);
            }

            scroll(0, 0);

            this.loadingState = false;
        }
    }
};
</script>
