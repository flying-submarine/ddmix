import { Tooltip } from 'antd';

import "./index.scss"

const DisableTooltip = ({children,tipMessage,isShowTip=true})=>{
   if(!isShowTip)  return children
   return (
        <div className="disableTooltip_page">
            <Tooltip title={tipMessage}>
                {children}
            </Tooltip>
        </div>
    )

}

export default DisableTooltip