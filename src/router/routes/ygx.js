/**
 * 商品
 **/
const index = () => import('@/components/page/ygx')
const productDetail = () => import('@/components/page/ygx/view/first')

const routes = [
  {
    path: '/ygx',
    component: index,
    children: [
      {
        path: 'zyq',
        component: productDetail,
        meta: {title: '第一个页面', keepAlive: true}
      }
    ]
  }
]
export default routes
