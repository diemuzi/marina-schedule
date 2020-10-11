<template>
    <CSidebar :minimize="minimize"
              :show="show"
              dropdownMode="noAction"
              fixed
              @update:show="(value) => $store.commit('set', ['sidebarShow', value])">

        <CSidebarBrand :to="{ name: 'dashboard' }"
                       class="d-md-down-none">

            <CIcon :height="35"
                   class="c-sidebar-brand-full"
                   name="logo"
                   size="custom-size"
                   viewBox="0 0 556 134"/>

            <CIcon :height="35"
                   class="c-sidebar-brand-minimized"
                   name="logo"
                   size="custom-size"
                   viewBox="0 0 110 134"/>
        </CSidebarBrand>

        <CRenderFunction :content-to-render="computedSidebar"
                         flat/>

        <CSidebarMinimizer class="d-md-down-none"
                           @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"/>
    </CSidebar>
</template>

<script>
import nav from "@/containers/_nav";

export default {
    name: 'TheSidebar',
    nav,
    computed: {
        currentItems() {
            return nav[0]._children.filter(item => {
                if (item.name === 'Calendar') {
                    item.items = [
                        {
                            name: 'By Employee',
                            to: {
                                name: 'calendar:account'
                            }
                        },
                        {
                            name: 'By Schedule',
                            to: {
                                name: 'calendar:schedule'
                            }
                        }
                    ];
                }

                if (item.name === 'Employee') {
                    item.items = [
                        {
                            name: 'Search',
                            to: {
                                name: 'employee:manage:search'
                            }
                        }
                    ];
                }

                if (item.name === 'Schedule') {
                    item.items = [
                        {
                            name: 'Search',
                            to: {
                                name: 'schedule:search'
                            }
                        }
                    ];
                }

                if (item.items) {
                    // Hide action if it has no items
                    if (item.items.length > 0) {
                        return item;
                    }
                } else {
                    return item;
                }
            });
        },
        computedSidebar() {
            return [
                {
                    _name: 'CSidebarNav',
                    _children: this.currentItems
                }
            ];
        },
        minimize() {
            return this.$store.state.sidebarMinimize;
        },
        show() {
            return this.$store.state.sidebarShow;
        }
    }
};
</script>
