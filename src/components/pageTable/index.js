import {useEffect,useState,useImperativeHandle,forwardRef} from "react"
import { post } from "@/utils/request"
import {Table} from 'antd';
import './index.scss'
import { useCallback } from "react";
const PageTable= ({ columns,url,rowKey, scroll,initParam},ref)=>{
    const [list,setList] = useState([])
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [expandStyle, setExpandStyle] = useState(false);
    const [pageInfo,setPageInfo] = useState({
        pageNum:1,
        pageSize:10,
    })
    useEffect(()=>{
        getList({...initParam,...pageInfo}, url)
    },[pageInfo, url])
    
    useImperativeHandle(ref,()=>({
        updateList:(searchParams)=>getList({...initParam,...pageInfo,...searchParams}, url)
    }))

    const getList = useCallback((params, url)=>{
        setLoading(true);
        post(url,{
            ...params,
        }).then((data)=>{
            const {dataList,total} = data
            setTotal(total)
            setExpandStyle(false)
            setLoading(false);
            if(url === '/boq/list_new'){
                const aftChildrenList = dataList.map(item=>{
                    const {children,...rest} = item
                    return  Array.isArray(children) && children.length ? item : rest
                })
                if(aftChildrenList.find(i=>i?.children?.length)){
                    setExpandStyle(true)
                }
                return  setList(aftChildrenList)
            }
            setList(dataList)
        });
    },[])
    return (
        <Table 
            columns={columns} 
            dataSource={list} 
            className={`page_Table ${expandStyle ? 'expandClass' :''}`}
            rowKey={r => r[rowKey]}
            scroll={scroll}
            loading={loading}
            pagination={{
                pageSize:pageInfo?.pageSize,
                total:total,
                current: pageInfo?.pageNum,
                showSizeChanger: false,
                onChange: page => {
                    setPageInfo({...pageInfo,pageNum:page});
                },
            }}
        />
    )
}
export default forwardRef(PageTable)