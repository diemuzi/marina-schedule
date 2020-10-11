<template>
    <CTabs :active-tab="0"
           addNavClasses="border-bottom-0"
           variant="tabs">
        <CTab title="Search">
            <CCard bodyWrapper>
                <CDataTable :fields="fields"
                            :items="formArr"
                            hover
                            sorter
                            table-filter>
                    <template #name="{ item }">
                        <td class="py-2">
                            <div>
                                {{ item.name }}
                            </div>

                            <div>
                                {{ item.time_start.slice(0, -3) }}
                                -
                                {{ item.time_end.slice(0, -3) }}
                            </div>
                        </td>
                    </template>

                    <template #sunday="{ item }">
                        <td class="py-2">
                            <router-link
                                :to="{ name: 'calendar:schedule:profile', params: { id: item.id, day: 'sunday' } }">
                                {{ item.account_sunday.length }}
                            </router-link>
                        </td>
                    </template>

                    <template #monday="{ item }">
                        <td class="py-2">
                            <router-link
                                :to="{ name: 'calendar:schedule:profile', params: { id: item.id, day: 'monday' } }">
                                {{ item.account_monday.length }}
                            </router-link>
                        </td>
                    </template>

                    <template #tuesday="{ item }">
                        <td class="py-2">
                            <router-link
                                :to="{ name: 'calendar:schedule:profile', params: { id: item.id, day: 'tuesday' } }">
                                {{ item.account_tuesday.length }}
                            </router-link>
                        </td>
                    </template>

                    <template #wednesday="{ item }">
                        <td class="py-2">
                            <router-link
                                :to="{ name: 'calendar:schedule:profile', params: { id: item.id, day: 'wednesday' } }">
                                {{ item.account_wednesday.length }}
                            </router-link>
                        </td>
                    </template>

                    <template #thursday="{ item }">
                        <td class="py-2">
                            <router-link
                                :to="{ name: 'calendar:schedule:profile', params: { id: item.id, day: 'thursday' } }">
                                {{ item.account_thursday.length }}
                            </router-link>
                        </td>
                    </template>

                    <template #friday="{ item }">
                        <td class="py-2">
                            <router-link
                                :to="{ name: 'calendar:schedule:profile', params: { id: item.id, day: 'friday' } }">
                                {{ item.account_friday.length }}
                            </router-link>
                        </td>
                    </template>

                    <template #saturday="{ item }">
                        <td class="py-2">
                            <router-link
                                :to="{ name: 'calendar:schedule:profile', params: { id: item.id, day: 'saturday' } }">
                                {{ item.account_saturday.length }}
                            </router-link>
                        </td>
                    </template>
                </CDataTable>
            </CCard>
        </CTab>

        <CTab title="Download"
              :to="{ name: 'download:schedule:all' }" />
    </CTabs>
</template>

<script>
import Loading from "@/mixins/Loading";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheSchedule',
    mixins: [
        Loading
    ],
    data() {
        return {
            fields: [
                {key: 'name', _style: 'min-width:100px;'},
                {key: 'sunday', _style: 'min-width:100px;'},
                {key: 'monday', _style: 'min-width:100px'},
                {key: 'tuesday', _style: 'min-width:100px'},
                {key: 'wednesday', _style: 'min-width:100px'},
                {key: 'thursday', _style: 'min-width:100px'},
                {key: 'friday', _style: 'min-width:100px'},
                {key: 'saturday', _style: 'min-width:100px'}
            ]
        };
    },
    computed: {
        ...mapGetters('calendar', [
            'formArr'
        ])
    },
    async created() {
        await this.getSchedule();
    },
    methods: {
        ...mapActions('calendar', [
            'getSchedule'
        ])
    }
};
</script>
