import Vue from 'vue'
import Router from 'vue-router'
import {setMetaTitle} from '@/util'

import ygx from '@/router/routes/ygx'
import xhy from '@/router/routes/xhy'
import submit from '@/router/routes/submit'

const base = '/myvue/'

Vue.use(Router)

// 有些地方需要强制刷新页面
Vue.prototype.$refresh = function (url = '') {
    url = url[0] === '/' ? url.slice(1) : url
    window.location.href = `${base}${url}`
}
// 打开新webview
Vue.prototype.$open = function (url = '') {
    url = url[0] === '/' ? url.slice(1) : url
    window.open(`${location.protocol}//${location.host}${base}${url}`)
}

const router = new Router({
    mode: 'history',
    base,
    routes: [
        {
            path: '/',
            redirect: '/ygx/zyq'
        }, {
            path: '/404',
            component: () => import('@/components/page/error/404')
        },
        // 注册业务路由 - begin
        ...ygx,
        ...xhy,
        ...submit,
        // 注册业务路由 - end
        {
            path: '/*',
            component: () => import('@/components/page/error/404')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        let title = to.meta.title
        setMetaTitle(title)
    } else if (typeof to.meta.title === 'undefined' && !to.meta.vTitle) {
        const title = '小黑鱼'
        setMetaTitle(title)
    }
    next()
})

export default router
