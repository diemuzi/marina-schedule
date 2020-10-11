<template>
    <div>
        <modal-success msg="Schedule has been removed."/>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Search">
                <CCard bodyWrapper>
                    <CDataTable :fields="fields"
                                :items="formArr"
                                :items-per-page="10"
                                column-filter
                                hover
                                items-per-page-select
                                pagination
                                sorter
                                table-filter>
                        <template #time_start="{ item }">
                            <td class="py-2">
                                {{ item.time_start.slice(0, -3) }}
                            </td>
                        </template>

                        <template #time_end="{ item }">
                            <td class="py-2">
                                {{ item.time_end.slice(0, -3) }}
                            </td>
                        </template>

                        <template #total="{ item }">
                            <td class="py-2">
                                {{ totalTime(item.time_start, item.time_end, item.has_break) }}
                            </td>
                        </template>

                        <template #is_active="{ item }">
                            <td>
                                <CBadge :color="getBadge(item.is_active)">
                                    {{ item.is_active ? 'Enabled' : 'Disabled' }}
                                </CBadge>
                            </td>
                        </template>

                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'schedule:profile', params: { id: item.id } }">
                                    <CButton color="info"
                                             size="sm"
                                             square
                                             variant="outline">
                                        View
                                    </CButton>
                                </CLink>
                            </td>
                        </template>

                        <template #delete="{ item }">
                            <td class="py-2">
                                <modal-open-delete :delete="deleteSchedule"
                                                   :formArr="formArr"
                                                   :params="{ id: item.id }"
                                                   msg="Continuing will remove this schedule."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{ name: 'schedule:create' }"
                  title="Create"/>
        </CTabs>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import TotalTime from "@/mixins/TotalTime";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'TheSearch',
    components: {
        ModalOpenDelete,
        ModalSuccess
    },
    mixins: [
        Loading,
        TotalTime
    ],
    data() {
        return {
            fields: [
                {key: 'id', label: 'ID', _style: 'min-width:100px;'},
                {key: 'name', _style: 'min-width:100px'},
                {key: 'time_start', _style: 'min-width:100px'},
                {key: 'time_end', _style: 'min-width:100px'},
                {key: 'total', label: 'Total Time', _style: 'min-width:100px'},
                {key: 'is_active', label: 'Status', _style: 'min-width:100px'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false},
                {key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('schedule', [
            'formArr'
        ])
    },
    async created() {
        await this.getSchedules();
    },
    methods: {
        ...mapActions('schedule', [
            'deleteSchedule',
            'getSchedules'
        ]),
        getBadge(value) {
            switch (value) {
                case true:
                    return 'success';
                case false:
                    return 'danger';
            }
        }
    }
};
</script>
