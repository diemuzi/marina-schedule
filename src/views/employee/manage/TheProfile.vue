<template>
    <div>
        <CAlert v-if="formSuccess"
                :show="5"
                closeButton
                color="success">
            Account profile has been updated.
        </CAlert>

        <CTabs :active-tab="1"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab :to="{ name: 'employee:manage:search' }"
                  title="Search"/>

            <CTab title="Profile">
                <CCard bodyWrapper>
                    <static-data :value="formObj.id"
                                 name="Account ID"/>

                    <ValidationObserver ref="observer"
                                        v-slot="{ handleSubmit, invalid }">
                        <CForm>
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

                            <input-switch v-model="formObj.is_active"
                                          :checked="formObj.is_active"
                                          label="Status"
                                          name="is_active"/>

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
        Loading
    ],
    data() {
        return {
            accountId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('employeeManage', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeManage', [
            'formObj'
        ])
    },
    async created() {
        await this.getProfile({
            id: this.accountId
        });
    },
    methods: {
        ...mapActions('employeeManage', [
            'getProfile',
            'updateProfile'
        ]),
        async submitUpdate() {
            this.loadingState = true;

            await this.updateProfile({
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