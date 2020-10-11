export const downloadRoutes = () => {
    return {
        path: '/download',
        name: 'download',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: 'employee/:id',
                name: 'download:employee',
                component: () => import('@/views/download/TheEmployee')
            },
            {
                path: 'employee/all',
                name: 'download:employee:all',
                component: () => import('@/views/download/TheEmployeeAll')
            },
            {
                path: 'schedule/:id',
                name: 'download:schedule',
                component: () => import('@/views/download/TheSchedule')
            },
            {
                path: 'schedule/all',
                name: 'download:schedule:all',
                component: () => import('@/views/download/TheScheduleAll')
            }
        ]
    }
};
