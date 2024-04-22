import { Layout } from 'antd';
import HeaderContent from './header'
import NavContent from './navContent'

import "./index.scss"

const LayoutContent = () => {
  return (
    <Layout className="layout">
      <HeaderContent/>
      <NavContent/>
    </Layout>
  )
}
export default LayoutContent;



