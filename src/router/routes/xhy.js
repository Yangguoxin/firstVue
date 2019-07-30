/**
 * 商品
 **/
const index = () => import('@/components/page/xhy')
const productDetail = () => import('@/components/page/xhy/view/first')

const routes = [
  {
    path: '/xhy',
    component: index,
    children: [
      {
        path: '/',
        component: productDetail,
        meta: {title: '小黑鱼页面'}
      }
    ]
  }
]
export default routes
