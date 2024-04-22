import {ReactComponent as Nodata} from '@/public/images/noData.svg'

import "./index.scss"

const NoDataPage = ()=>{
    return (
        <div className="noDataPage">
            <div className="noDataPage_content">
                <Nodata/>
            </div>
        </div>
    )
}

export default NoDataPage