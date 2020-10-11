<template>
    <div class="form-group"
         v-bind:class="{ 'required': $attrs.required }">
        <ValidationProvider v-slot="{ errors }"
                            :name="$attrs.label"
                            :rules="$attrs.rules"
                            :vid="$attrs.name">
            <label :for="$attrs.name"
                   class="font-weight-bold">
                {{ $attrs.label }}
            </label>

            <select :id="$attrs.name"
                    v-model="innerValue"
                    :name="$attrs.name"
                    class="form-control"
                    v-bind:class="{ 'is-invalid': errors[0] }">
                <option v-if="!innerValue"
                        :value="innerValue"
                        selected>
                    -- Select {{ $attrs.label }} --
                </option>

                <option v-if="!$attrs.required && innerValue"
                        :value="null">
                    -- Select {{ $attrs.label }} --
                </option>

                <option v-for="(value, key) in $attrs.options"
                        v-bind:key="key"
                        :selected="innerValue === key"
                        :value="key">
                    {{ value }}
                </option>
            </select>

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
import {ValidationProvider} from "vee-validate/dist/vee-validate.full.esm";

export default {
    name: 'InputSelect',
    components: {
        ValidationProvider
    },
    props: {
        selected: null
    },
    computed: {
        value() {
            return this.selected;
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
        if (this.$attrs.selected) {
            this.innerValue = this.$attrs.selected;
        } else {
            this.innerValue = this.value;
        }
    }
};
</script>
