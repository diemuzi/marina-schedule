export default [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: 'Dashboard',
                to: {
                    name: 'dashboard'
                },
                icon: 'cil-speedometer'
            },
            {
                _name: 'CSidebarNavTitle',
                _children: [
                    'Actions'
                ]
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Calendar',
                route: '/calendar',
                fontIcon: 'fas fa-user-clock',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Employee',
                route: '/employee',
                fontIcon: 'fas fa-user-tie',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Schedule',
                route: '/schedule',
                fontIcon: 'fas fa-calendar-alt',
                items: []
            }
        ]
    }
];