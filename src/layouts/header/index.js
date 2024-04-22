import { Layout,Dropdown, Menu, Space, Avatar, Affix,message, Button} from 'antd';
import { DownOutlined,FormOutlined,LogoutOutlined } from '@ant-design/icons';
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
            <Button type="text" onClick={()=>navigate(`/talk`)}>
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
          <img 
            src='https://img.alicdn.com/imgextra/i2/O1CN01EhxJJz1fMqPcnRyJR_!!6000000003993-2-tps-497-120.png' 
            alt="error"
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={menuOnclick}
          items={[
            { 
              key:"/talk",
              label:"ideaTALK",
            },
            { 
              key:"/talk1",
              label:"Workspace",
            },
            { 
              key:"/talk2",
              label:"ideaIMAGE",
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
