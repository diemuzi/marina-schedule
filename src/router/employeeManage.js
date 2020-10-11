export const employeeManageRoutes = () => {
    return {
        path: '/employee/manage',
        redirect: {
            name: 'employee:manage:search'
        },
        name: 'employee:manage',
        meta: {
            label: 'Manage Employee'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'create',
                name: 'employee:manage:create',
                meta: {
                    label: 'Create'
                },
                component: () => import('@/views/employee/manage/TheCreate')
            },
            {
                path: 'profile/:id',
                name: 'employee:manage:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/employee/manage/TheProfile')
            },
            {
                path: 'search',
                name: 'employee:manage:search',
                meta: {
                    label: 'Search'
                },
                component: () => import('@/views/employee/manage/TheSearch')
            }
        ]
    }
};
