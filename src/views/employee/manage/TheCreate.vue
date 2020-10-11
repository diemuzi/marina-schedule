<template>
    <CTabs :active-tab="1"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab :to="{ name: 'employee:manage:search' }"
              title="Search"/>

        <CTab title="Create">
            <ValidationObserver ref="observer"
                                v-slot="{ handleSubmit, invalid }">
                <CForm>
                    <CRow>
                        <CCol sm="6">
                            <CCard bodyWrapper>
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
import {ValidationObserver} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TheCreate',
    components: {
        InputText,
        ValidationObserver
    },
    mixins: [
        Loading
    ],
    computed: {
        ...mapGetters('employeeManage', [
            'formErrors',
            'formSuccess'
        ]),
        ...mapState('employeeManage', [
            'formObj'
        ])
    },
    beforeMount() {
        this.formClean();
    },
    methods: {
        ...mapActions('employeeManage', [
            'createAccount',
            'formClean'
        ]),
        async submitCreate() {
            this.loadingState = true;

            await this.createAccount();

            if (this.formSuccess) {
                await this.$router.push({
                    name: 'employee:manage:search'
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
