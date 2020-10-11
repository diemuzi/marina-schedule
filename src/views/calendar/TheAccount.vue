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
                            <router-link :to="{ name: 'calendar:account:profile', params: { id: item.id } }">
                                {{ item.name }}
                            </router-link>
                        </td>
                    </template>

                    <template #sunday="{ item }">
                        <td v-if="item.sunday !== undefined"
                            class="py-2">
                            <div>
                                {{ item.sunday.time_start.slice(0, -3) }}
                                -
                                {{ item.sunday.time_end.slice(0, -3) }}
                            </div>

                            <div>
                                {{ item.sunday.name }}
                            </div>
                        </td>

                        <td v-else></td>
                    </template>

                    <template #monday="{ item }">
                        <td v-if="item.monday !== undefined"
                            class="py-2">
                            <div>
                                {{ item.monday.time_start.slice(0, -3) }}
                                -
                                {{ item.monday.time_end.slice(0, -3) }}
                            </div>

                            <div>
                                {{ item.monday.name }}
                            </div>
                        </td>

                        <td v-else></td>
                    </template>

                    <template #tuesday="{ item }">
                        <td v-if="item.tuesday !== undefined"
                            class="py-2">
                            <div>
                                {{ item.tuesday.time_start.slice(0, -3) }}
                                -
                                {{ item.tuesday.time_end.slice(0, -3) }}
                            </div>

                            <div>
                                {{ item.tuesday.name }}
                            </div>
                        </td>

                        <td v-else></td>
                    </template>

                    <template #wednesday="{ item }">
                        <td v-if="item.wednesday !== undefined"
                            class="py-2">
                            <div>
                                {{ item.wednesday.time_start.slice(0, -3) }}
                                -
                                {{ item.wednesday.time_end.slice(0, -3) }}
                            </div>

                            <div>
                                {{ item.wednesday.name }}
                            </div>
                        </td>

                        <td v-else></td>
                    </template>

                    <template #thursday="{ item }">
                        <td v-if="item.thursday !== undefined"
                            class="py-2">
                            <div>
                                {{ item.thursday.time_start.slice(0, -3) }}
                                -
                                {{ item.thursday.time_end.slice(0, -3) }}
                            </div>

                            <div>
                                {{ item.thursday.name }}
                            </div>
                        </td>

                        <td v-else></td>
                    </template>

                    <template #friday="{ item }">
                        <td v-if="item.friday !== undefined"
                            class="py-2">
                            <div>
                                {{ item.friday.time_start.slice(0, -3) }}
                                -
                                {{ item.friday.time_end.slice(0, -3) }}
                            </div>

                            <div>
                                {{ item.friday.name }}
                            </div>
                        </td>

                        <td v-else></td>
                    </template>

                    <template #saturday="{ item }">
                        <td v-if="item.saturday !== undefined"
                            class="py-2">
                            <div>
                                {{ item.saturday.time_start.slice(0, -3) }}
                                -
                                {{ item.saturday.time_end.slice(0, -3) }}
                            </div>

                            <div>
                                {{ item.saturday.name }}
                            </div>
                        </td>

                        <td v-else></td>
                    </template>

                    <template #total="{ item }">
                        <td>
                            {{ addTime(item) }}
                        </td>
                    </template>
                </CDataTable>
            </CCard>
        </CTab>

        <CTab title="Download"
              :to="{ name: 'download:employee:all' }" />
    </CTabs>
</template>

<script>
import Loading from "@/mixins/Loading";
import TotalTime from "@/mixins/TotalTime";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheAccount',
    mixins: [
        Loading,
        TotalTime
    ],
    data() {
        return {
            fields: [
                {key: 'name'},
                {key: 'sunday'},
                {key: 'monday'},
                {key: 'tuesday'},
                {key: 'wednesday'},
                {key: 'thursday'},
                {key: 'friday'},
                {key: 'saturday'},
                {key: 'total'}
            ]
        };
    },
    computed: {
        ...mapGetters('calendar', [
            'formArr'
        ])
    },
    async created() {
        await this.getAccount();
    },
    methods: {
        ...mapActions('calendar', [
            'getAccount'
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
        }
    }
};
</script>
