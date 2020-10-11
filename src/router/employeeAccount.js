export const employeeAccountRoutes = () => {
    return {
        path: '/employee/account',
        redirect: {
            name: 'employee:account:profile'
        },
        name: 'employee:account',
        meta: {
            label: 'Employee'
        },
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'password',
                name: 'employee:account:password',
                meta: {
                    label: 'Change Password'
                },
                component: () => import('@/views/employee/account/ThePassword')
            },
            {
                path: 'profile',
                name: 'employee:account:profile',
                meta: {
                    label: 'Profile'
                },
                component: () => import('@/views/employee/account/TheProfile')
            }
        ]
    }
};
