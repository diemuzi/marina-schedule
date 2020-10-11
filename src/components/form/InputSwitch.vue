<template>
    <div class="form-group custom-control custom-switch"
         v-bind:class="{ 'required': $attrs.required }">
        <ValidationProvider v-slot="{ errors }"
                            :vid="$attrs.name">
            <input :id="$attrs.name"
                   v-model="innerValue"
                   :name="$attrs.name"
                   class="custom-control-input"
                   type="checkbox"
                   v-bind:class="{ 'is-invalid': errors[0] }">

            <label :for="$attrs.name"
                   class="custom-control-label font-weight-bold">
                {{ $attrs.label }}
            </label>

            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>

            <small class="form-text text-muted">
                {{ $attrs.description }}
            </small>
        </ValidationProvider>
    </div>
</template>

<script>
import {ValidationProvider} from "vee-validate";

export default {
    name: 'InputSwitch',
    components: {
        ValidationProvider
    },
    props: {
        checked: null
    },
    computed: {
        value() {
            return this.checked;
        }
    },
    data: () => ({
        innerValue: ""
    }),
    watch: {
        innerValue(newVal) {
            this.$emit("input", newVal);
        },
        value(newVal) {
            this.innerValue = newVal;
        }
    },
    created() {
        if (this.$attrs.checked) {
            this.innerValue = this.$attrs.checked;
        } else {
            this.innerValue = this.value;
        }
    }
};
</script>