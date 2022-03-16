import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

let router = new Router({
    mode: 'hash',
    //base: process.env.BASE_URL,
    routes: [
        {
			name: "HomePage",
			path: '/',
			redirect: 'login'
			// component: () => import('@/views/auth/Login'),
			// meta: { authorize: [] }
		},
		{
			name: "Login",
			path: '/login',
			component: () => import('@/views/auth/Login'),
			// meta: { authorize: [] }
		},

        {
            name: 'AdminRoutes',
            path: '/admin',
            redirect: '/',
            component: () => import('@/layouts/Layout'),
            children: [
                // Components
                
                {
                    name: 'Dashboard',
                    path: '/',
                    component: () => import('@/views/pages/Dashboard'),
                },

                
                {
                    name: 'Alerts',
                    path: '/alerts',
                    component: () => import('@/views/pages/Alerts'),
                },

                {
                    name: 'Profile',
                    path: '/profile',
                    component: () => import('@/views/pages/Profile'),
                },

                {
                    name: 'Icons',
                    path: '/icons',
                    component: () => import('@/views/pages/Icons'),
                },

                {
                    name: 'Events',
                    path: '/events',
                    component: () => import('@/views/pages/Games'),
                },
                {
                    name: 'Merchant',
                    path: '/merchant',
                    component: () => import('@/views/pages/merchant'),
                },
                {
                    name: 'TableSimple',
                    path: '/tables-simple',
                    component: () => import('@/views/pages/TableSimple'),
                },
                {
                    name: 'Add Employee',
                    path: '/addEmployee',
                    component: () => import('@/views/pages/addEmployee'),
                },
                {
                    name: 'Department',
                    path: '/department',
                    component: () => import('@/views/pages/department'),
                },
                
                {
                    name: 'Designations',
                    path: '/designations',
                    component: () => import('@/views/pages/designations'),
                },
                {
                    name: 'Job Status',
                    path: '/jobStatus',
                    component: () => import('@/views/pages/jobStatus'),
                },
                {
                    name: 'Shifts',
                    path: '/shifts',
                    component: () => import('@/views/pages/Shifts'),
                },
                {
                    name: 'Holiday',
                    path: '/holiday',
                    component: () => import('@/views/pages/Holiday'),
                },
                {
                    name: 'Employee',
                    path: '/employee',
                    component: () => import('@/views/pages/employee'),
                },
                {
                    name: 'Schedule',
                    path: '/schedule',
                    component: () => import('@/views/pages/schedule'),
                },
                {
                    name: 'Scheduling',
                    path: '/scheduling',
                    component: () => import('@/views/pages/scheduling'),
                },
               
            ]
        },

    ],
});

router.beforeEach((to, from, next) => {

	const { authorize } = to.meta;
	const userRole = store.getters.userRole;
	const isLoggedIn = store.getters.isLoggedIn;

	if (authorize) {
		if (!isLoggedIn) {
			// not logged in so redirect to login page with the return url
			return next({ path: '/login', query: { returnUrl: to.path } });
		}
		// check if route is restricted by role
		if (authorize.length && !authorize.includes(userRole)) {
			// role not authorised so redirect to home page
			return next({ path: `/${userRole.toLowerCase()}` });
		}
	}
	next();
});

export default router