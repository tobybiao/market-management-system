import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import { getLoginUserFromStorage } from '@/util/storage'
Vue.use(Router)
const Login = () => import('@/page/Login')
// 管理员页面
const TheAdminDashboard = () => import('@/page/TheAdminDashboard')
const TheAdminHome = () => import('@/page/TheAdminHome')
const BusinessList = () => import('@/page/BusinessList')
const MarketManagerList = () => import('@/page/MarketManagerList')
const AddBusiness = () => import('@/page/AddBusiness')
const AddMarketManager = () => import('@/page/AddMarketManager')
// 商场管理员页面
const TheMarketManagerDashboard = () => import('@/page/TheMarketManagerDashboard')
const MarketGoodsList = () => import('@/page/MarketGoodsList')
const MarketCashierList = () => import('@/page/MarketCashierList')
const AddMarketGoods = () => import('@/page/AddMarketGoods')
const AddMarketCashier = () => import('@/page/AddMarketCashier')
// 商场收银员页面
const MarketCashierDashboard = () => import('@/page/TheMarketCashierDashboard')
const MarketCashierCollection = () => import('@/page/MarketCashierCollection')
// 入住商家页面
const TheBusinessDashboard = () => import('@/page/business/TheBusinessDashboard')
const TheBusinessHome = () => import('@/page/business/TheBusinessHome')
const BusinessGoodsList = () => import('@/page/business/BusinessGoodsList')
const BusinessOrderList = () => import('@/page/business/BusinessOrderList')
const AddBusinessGoods = () => import('@/page/business/AddBusinessGoods')
const BusinessCollection = () => import('@/page/business/BusinessCollection')
const router = new Router({
    routes: [
        {
            path: '/',
            component: Login,
            name: 'login'
        },
        {
            path: '/adminDashboard',
            component: TheAdminDashboard,
            name: 'adminDashboard',
            children: [
                {
                    path: '',
                    component: TheAdminHome,
                    name: 'adminHome',
                    meta: []
                },
                {
                    path: '/businessList',
                    component: BusinessList,
                    name: 'businessList',
                    meta: ['数据管理', '商家列表']
                },
                {
                    path: '/marketManagerList',
                    component: MarketManagerList,
                    name: 'marketManagerList',
                    meta: ['数据管理', '商场管理员列表']
                },
                {
                    path: '/addBusiness',
                    component: AddBusiness,
                    name: 'addBusiness',
                    meta: ['添加数据', '添加入住商家']
                },
                {
                    path: '/addMarketManager',
                    component: AddMarketManager,
                    name: 'addMarketManager',
                    meta: ['添加数据', '添加商场管理员']
                }
            ]
        },
        {
            path: '/marketManagerDashboard',
            component: TheMarketManagerDashboard,
            name: 'marketManagerDashboard',
            children: [
                {
                    path: '/marketGoodsList',
                    component: MarketGoodsList,
                    name: 'marketGoodsList',
                    meta: ['数据管理', '商场商品列表']
                },
                {
                    path: '/marketCashierList',
                    component: MarketCashierList,
                    name: 'marketCashierList',
                    meta: ['数据管理', '商场收银员列表']
                },
                {
                    path: '/addMarketGoods',
                    component: AddMarketGoods,
                    name: 'addMarketGoods',
                    meta: ['添加数据', '添加商场商品']
                },
                {
                    path: '/addMarketCashier',
                    component: AddMarketCashier,
                    name: 'addMarketCashier',
                    meta: ['添加数据', '添加商场收银员']
                }
            ]
        },
        {
            path: '/marketCashierDashboard',
            component: MarketCashierDashboard,
            name: 'marketCashierDashboard',
            children: [
                {
                    path: '/marketCashierCollection',
                    component: MarketCashierCollection,
                    name: 'marketCashierCollection',
                    meta: ['收款', '处理收款']
                }
            ]
        },
        {
            path: '/businessDashboard',
            component: TheBusinessDashboard,
            name: 'businessDashboard',
            children: [
                {
                    path: '',
                    component: TheBusinessHome,
                    name: 'businessHome',
                    meta: []
                },
                {
                    path: '/businessGoodsList',
                    component: BusinessGoodsList,
                    name: 'businessGoodsList',
                    meta: ['数据管理', '商品列表']
                },
                {
                    path: '/businessOrderList',
                    component: BusinessOrderList,
                    name: 'businessOrderList',
                    meta: ['数据管理', '订单列表']
                },
                {
                    path: '/addBusinessGoods',
                    component: AddBusinessGoods,
                    name: 'addBusinessGoods',
                    meta: ['添加数据', '添加商品']
                },
                {
                    path: '/businessCollection',
                    component: BusinessCollection,
                    name: 'businessCollection',
                    meta: ['收款', '处理收款']
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    const adminRouter = ['adminDashboard', 'adminHome', 'businessList', 'marketManagerList', 'addBusiness', 'addMarketManager'] // 管理员路由
    const marketManagerRouter = ['marketManagerDashboard', 'marketGoodsList', 'marketCashierList', 'addMarketGoods', 'addMarketCashier']
    const marketCashierRouter = ['marketCashierDashboard', 'marketCashierCollection']
    const businessRouter = ['businessDashboard', 'businessHome', 'businessGoodsList', 'businessOrderList', 'addBusinessGoods', 'businessCollection']
    // let loginUserInfo = store.state.loginUser // id username userType
    let loginUserInfo = getLoginUserFromStorage()
    console.log('从Storage中获取已登录用户信息：')
    console.log(loginUserInfo)
    if (to.name === 'login') { // 去登陆，放行
        if (loginUserInfo.id === '' || loginUserInfo.id === null) { // 未登录，放行
            next()
        } else {
            // 已经登录用户，回到对应的主页
            console.log('已经登录，无需再登录')
            if (loginUserInfo.userType === 'admin') {
                router.push({ name: 'adminDashboard' }) // 登录管理员回到管理员主页
            }
            if (loginUserInfo.userType === 'marketManager') {
                router.push({ name: 'marketManagerDashboard' })
            }
            if (loginUserInfo.userType === 'marketCashier') {
                router.push({ name: 'marketCashierDashboard' })
            }
            if (loginUserInfo.userType === 'business') {
                router.push({ name: 'businessDashboard' })
            }
        }
    } else { // 不是去登录
        if (loginUserInfo.id === '' || loginUserInfo.id === null) { // 未登录， 重新登录
            router.push({ name: 'login' })
        } else {
            // 已经登录
            if (adminRouter.indexOf(to.name) >= 0) { // 去管理员页面
                if (loginUserInfo.userType === 'admin') { // 登录用户是管理员
                    next()
                } else {
                    console.log('不是管理员，不能访问对应页面')
                    next(false)
                }
            }
            if (marketManagerRouter.indexOf(to.name) >= 0) { // 去商场管理员页面
                if (loginUserInfo.userType === 'marketManager') { // 登录用户是商场管理员， 放行
                    next()
                } else {
                    console.log('不是商场管理员，不能访问该页面')
                    next(false)
                }
            }
            if (marketCashierRouter.indexOf(to.name) >= 0) { // 去商场收银员页面
                if (loginUserInfo.userType === 'marketCashier') { // 登录用户是商场收银员， 放行
                    next()
                } else {
                    console.log('不是商场收银员，不能访问该页面')
                    next(false)
                }
            }
            if (businessRouter.indexOf(to.name) >= 0) { // 去商家页面
                if (loginUserInfo.userType === 'business') { // 登录用户是商家，放行
                    next()
                } else {
                    console.log('不是商家，不不能访问该页面')
                    next(false)
                }
            }
        }
    }
})
export default router
