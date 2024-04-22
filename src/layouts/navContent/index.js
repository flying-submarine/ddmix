import {Layout} from 'antd';
import WorkBench from './workBench/index.js';
import "./index.scss"

const { Content } = Layout;

export default function NavContent() {
    return (
        <div className='sub_content'>
            <Content className='right_content'>
                <WorkBench/>
            </Content>
        </div>
    )
}
