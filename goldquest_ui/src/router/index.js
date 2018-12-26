import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin/Admin'
import Buy from '@/components/Buy/Buy'
import Customers from '@/components/Customers/Customers'
import CustomerView from '@/components/Customers/CustomerView'
import Dashboard from '@/components/Dashboard/Dashboard'
import Inventory from '@/components/Inventory/Inventory'
import Login from '@/components/Auth/Login'
import Signup from '@/components/Auth/Signup'
import Account from '@/components/Auth/Account'
import ProfitLoss from '@/components/ProfitLoss/ProfitLoss'
import Reports from '@/components/Reports/Reports'
import Sell from '@/components/Sell/Sell'
import Shipments from '@/components/Shipments/Shipments'
import ShipmentView from '@/components/Shipments/ShipmentView'
import Stores from '@/components/Stores/Stores'
import StoreView from '@/components/Stores/StoreView'
import Transactions from '@/components/Transactions/Transactions'
import TransactionView from '@/components/Transactions/TransactionView'
import {
    Auth
} from 'aws-amplify'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: (to, from, next) => {
                Auth.currentAuthenticatedUser().then(user => {
                    next('/');
                }).catch(err => {
                    next();
                });
            },
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/account',
            name: 'Account',
            component: Account,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/buy',
            name: 'Buy',
            component: Buy,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/sell',
            name: 'Sell',
            component: Sell,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/customers',
            name: 'Customers',
            component: Customers,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/customers/:customerId',
            name: 'CustomerView',
            component: CustomerView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports',
            name: 'Reports',
            component: Reports,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports/inventory',
            name: 'Inventory',
            component: Inventory,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports/transactions',
            name: 'Transactions',
            component: Transactions,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports/transactions/:transactionId',
            name: 'TransactionView',
            component: TransactionView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports/shipments',
            name: 'Shipments',
            component: Shipments,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports/shipments/:shipmentId',
            name: 'ShipmentView',
            component: ShipmentView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/admin/stores',
            name: 'Stores',
            component: Stores,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/admin/stores/:storeId',
            name: 'StoreView',
            component: StoreView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reports/profit-loss',
            name: 'ProfitLoss',
            component: ProfitLoss,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/logout',
            beforeEnter: (to, from, next) => {
                Auth.signOut()
                    .then(() => next('/login'))
                    .catch(err => console.error(err));
            }
        },
    ]
})
