import { Layout,Dropdown, Menu, Space, Avatar, Affix, Button} from 'antd';
import { DownOutlined,FormOutlined,LogoutOutlined } from '@ant-design/icons';
import Logo from './logo.png'; 
import User from './user.jpeg'; 
import { useNavigate } from "react-router-dom";
import "./index.scss"

const { Header } = Layout;

      
export default function HeaderContent() {
  const navigate = useNavigate();
  const menuOnclick = ({key})=>{
    navigate(key)
  }
  const userInfo = ()=>{
    const menuItem = [
        {
          key: 'changePwd',
          label: (
            <Button type="text" onClick={()=>navigate(`/`)}>
              <FormOutlined />Change Password
            </Button>
          )
        },
        {
            key: 'modifyPersonalInformation',
            label: (
              <Button type="text" >
                <FormOutlined />Modify Personal Information
              </Button>
            )
        },
        {
          key: 'logout',
          label: (
            <Button type="text">
              <LogoutOutlined /> Log out
            </Button>
          )
        },
      ] 
    return(
      <Menu 
          items={menuItem}
      />
    ) 
  }
  return (
    <Affix className='headerContent'>
      <Header>
        <div className='logo'>
          {/* <img src={Logo} alt="error" /> */}
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={menuOnclick}
          items={[
            { 
              key:"/",
              label:"AI 快说",
            },
            { 
              key:"/talk1",
              label:"工作台",
            },
          ]}
          className={'isWorkBench'}
        />
        <div className='info'>
          <Dropdown overlay={userInfo} trigger='hover'>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Space size={16}>
                <Avatar icon={<img src={User} alt="error" className="prompt-box-avatar"/>} />
                  {"default"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
    </Affix>
  )
}
