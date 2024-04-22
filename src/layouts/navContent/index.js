import { Menu, Button,Layout} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useState} from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { operLocalStorage } from '@/utils/index'
import { menuItem } from "./menuItem.js"
import WorkBench from './workBench/index.js';
import "./index.scss"

const { Content } = Layout;

export default function NavContent() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    
    const menuOnclick = ({key})=>{
        navigate(key)
    }
    return (
        <div className='sub_content'>
            {/* <div className={"left_content"}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    items={navItem}
                    onClick={menuOnclick}
                    inlineCollapsed={collapsed}
                />
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    className="collapsedBtn"
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div> */}
            <Content className='right_content'>
                <WorkBench/>
            </Content>
        </div>
    )
}
