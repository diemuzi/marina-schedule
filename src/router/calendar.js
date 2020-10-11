export const calendarRoutes = () => {
    return {
        path: '/calendar',
        redirect: {
            name: 'calendar:account'
        },
        name: 'calendar',
        meta: {
            label: 'Calendar'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'account',
                name: 'calendar:account',
                meta: {
                    label: 'Account'
                },
                component: () => import('@/views/calendar/TheAccount')
            },
            {
                path: 'account/profile/:id',
                name: 'calendar:account:profile',
                meta: {
                    label: 'Account Profile'
                },
                component: () => import('@/views/calendar/TheAccountProfile')
            },
            {
                path: 'schedule',
                name: 'calendar:schedule',
                meta: {
                    label: 'Schedule'
                },
                component: () => import('@/views/calendar/TheSchedule')
            },
            {
                path: 'schedule/profile/:id/:day',
                name: 'calendar:schedule:profile',
                meta: {
                    label: 'Schedule Profile'
                },
                component: () => import('@/views/calendar/TheScheduleProfile')
            }
        ]
    }
};
