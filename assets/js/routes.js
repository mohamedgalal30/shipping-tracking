import React from 'react';
import Layout from './core/components/Layout';
import TasksPage from './task/components/TasksPage';
import ViewTaskPage from './task/components/ViewTaskPage';
import NotFound404 from './core/components/common/NotFound404';

let routes = [
    {
        path: '/',
        component: TasksPage,
    },
    {
        path: '/tasks_list',
        component: TasksPage,
    },
    {
        path: '/tasks/:id/map',
        component: ViewTaskPage
    },
    {
        component: NotFound404,
    }
];

// set default layout
routes = routes.map(route => {
    if (!route.layout) route.layout = Layout;
    if (route.exact == undefined) route.exact = true;
    return route;
});

export default routes;