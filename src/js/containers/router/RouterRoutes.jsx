/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/

import React from 'react';

const AgencyProfile = React.lazy(() => import('containers/agency/AgencyContainer').then((comp) => comp));
const ErrorPage = React.lazy(() => import('components/errorPage/ErrorPage').then((comp) => comp));

// eslint-disable-next-line import/prefer-default-export
export const routes = [
    {
        path: `/`,
        component: () => {
            window.location.href = '/agency/department-of-defense?fy=2025';
            return null;
        },
        exact: true
    },
    {
        path: '/agency/:agencySlug',
        component: AgencyProfile,
        exact: true
    },
    {
        path: '*',
        component: ErrorPage
    }
];

