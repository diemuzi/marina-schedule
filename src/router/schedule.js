export const scheduleRoutes = () => {
    return {
        path: '/schedule',
        redirect: {
            name: 'schedule:search'
        },
        name: 'schedule',
        meta: {
            label: 'Schedule'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'schedule:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/schedule/TheCreate')
            },
            {
                path: 'profile/:id',
                name: 'schedule:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/schedule/TheProfile')
            },
            {
                path: 'search',
                name: 'schedule:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/schedule/TheSearch')
            }
        ]
    }
};
