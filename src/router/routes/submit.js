/**
 * 商品
 **/
const index = () => import('@/components/page/pay')
const submit = () => import('@/components/page/pay/view/submit')

const routes = [
  {
    path: '/submit',
    component: index,
    children: [
      {
        path: 'ygx',
        component: submit,
        meta: {title: '提交订单'}
      }
    ]
  }
]
export default routes
