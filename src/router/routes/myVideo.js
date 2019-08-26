/**
 * 视频
 **/
const index = () => import('@/components/page/ygx')
const myVideo = () => import('@/components/page/ygx/view/video')

const routes = [
  {
    path: '/ygx',
    component: index,
    children: [
      {
        path: 'video',
        component: myVideo,
        meta: {title: '视频', keepAlive: true}
      }
    ]
  }
]
export default routes
