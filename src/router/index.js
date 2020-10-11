import {
    calendarRoutes,
    downloadRoutes,
    employeeAccountRoutes,
    employeeManageRoutes,
    pagesRoutes,
    scheduleRoutes
} from "@/router/routes";
import Router from "vue-router";
import store from "@/store";
import Vue from "vue";

Vue.use(Router);

const requireAuthenticated = (to, from, next) => {
    store.dispatch('auth/initialize')
        .then(() => {
            if (!store.getters['auth/isAuthenticated']) {
                next({
                    name: 'pages:account:login'
                });
            } else {
                next();
            }
        });
};

const requireUnauthenticated = (to, from, next) => {
    store.dispatch('auth/initialize')
        .then(() => {
            if (store.getters['auth/isAuthenticated']) {
                next('/');
            } else {
                next();
            }
        });
};

const redirectLogout = (to, from, next) => {
    store.dispatch('auth/logout')
        .then(() => next({
            name: 'pages:account:login'
        }));
};

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: configRoutes()
});

function configRoutes() {
    return [
        {
            path: '/',
            redirect: {
                name: 'dashboard'
            },
            name: 'home',
            meta: {
                label: 'Home'
            },
            component: () => import('@/containers/TheContainer'),
            beforeEnter: requireAuthenticated,
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    meta: {
                        label: 'Dashboard'
                    },
                    component: () => import('@/views/TheDashboard')
                },
                calendarRoutes(),
                downloadRoutes(),
                employeeAccountRoutes(),
                employeeManageRoutes(),
                scheduleRoutes()
            ]
        },
        pagesRoutes(requireUnauthenticated),
        {
            path: '/logout',
            name: 'logout',
            beforeEnter: redirectLogout
        },
        {
            // will match everything and if it's not found, redirect to 404
            path: '*',
            redirect: {
                name: 'pages:error:404'
            }
        }
    ];
}

