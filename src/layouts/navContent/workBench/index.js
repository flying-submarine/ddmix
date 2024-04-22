import { Input } from 'antd';
import { EditOutlined,PlusCircleOutlined} from '@ant-design/icons'
import { useState,useEffect,useRef } from 'react';
import QaComponent from './qaComponent';

import './index.scss'

const WorkBench = ()=>{
    const { TextArea } = Input;
    const textAreaRef = useRef(null);
    const [qaList,setQaList] = useState([])
    const [inText,setIntext] = useState('')
    const [isSend,setIsSent] = useState(false)
    const [timeDate,setTimeDate] = useState(Date.now())
    const [paramList,setParamList] = useState([])

    const watchEvent = (timestamp,eText)=>{
        // async function getResponse(){
        //     fetch('https://pre-llm-clouddoc.alibaba-inc.com/bigModel/chatStream', {
        //         method: 'POST', // 设置请求方法为POST
        //         headers: {
        //             'Content-Type': 'application/json' // 设置请求头
        //         },
        //         timeout: 20000,
        //         body: JSON.stringify({
        //             messages: [
        //                 {
        //                     role: 'system',
        //                     content: 'You are a helpful assistant.'
        //                 },
        //                 ...paramList,
        //                 {
        //                     role:'user',
        //                     content:eText
        //                 }
        //             ]
        //         }) // 设置请求体为空对象，根据你提供的数据，请求体可能需要更改
        //     })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         const reader = response.body.getReader(); // 获取响应数据流的阅读器
        //         setIntext('')
        //         let buffer = '';
        //         return reader.read().then(function processText({ done, value }) {
        //             if (done) { //请求结束
        //                 if(buffer.trim()!==''){
        //                     let lastContent = null;
        //                     // 使用正则表达式匹配出所有的 data 字段，并放入数组中
        //                     const regex = /data:{"content":"(.*?)"/g;
        //                     let match;
        //                     while ((match = regex.exec(buffer.trim())) !== null) {
        //                         lastContent = match[1];
        //                     }
        //                     setParamList(prevList=>([
        //                         ...prevList,
        //                         {
        //                             role:'user',
        //                             content:eText
        //                         },
        //                         {
        //                             role:'assistant',
        //                             content:lastContent
        //                         }
        //                     ]))
        //                 }
        //                 setIsSent(false)
        //                 setTimeDate(Date.now())
        //                 return;
        //             }
                    
        //             buffer += new TextDecoder().decode(value, { stream: true }); // 将数据流转换为字符串
        //             const parts = [];
        //             // 使用正则表达式匹配出所有的 data 对象，并放入数组中
        //             const regex = /data:(.*?)\n\n/g;
        //             let match;
        //             while ((match = regex.exec(buffer)) !== null) {
        //                 const dataString = match[1];
        //                 try {
        //                     const dataObject = JSON.parse(dataString);
        //                     parts.push(dataObject);
        //                 } catch (error) {
        //                     console.log('Error parsing JSON:', error);
        //                 }
        //             }
        //             parts.forEach(part => {
        //                 try {
        //                     const data = part; // 解析JSON数据
        //                     setQaList(prevList => {
        //                         // 检查当前消息列表中是否存在具有相同时间戳的消息
        //                         const existingItemIndex = prevList.findIndex(item => item.key === timestamp);
        //                         // console.log(e.data,'e.data')
        //                         if (existingItemIndex !== -1) {
        //                             // 如果存在相同的时间戳，则将新的消息内容追加到现有消息的属性 a 中
        //                             const updatedList = [...prevList];
        //                             updatedList[existingItemIndex].a = data.content;
        //                             return updatedList;
        //                         } else {
        //                             // 如果不存在相同的时间戳，则添加新元素
        //                             return [
        //                                 ...prevList,
        //                                 {
        //                                     q: eText,
        //                                     key: timestamp,
        //                                     a: data.content
        //                                 }
        //                             ];
        //                         }
        //                     });

        //                 } catch (error) {
        //                     console.error('Error parsing JSON:', error); // 解析错误处理
        //                 }
        //             });
        //             return reader.read().then(processText); // 继续读取下一部分数据
        //         });
        //     })
        //     .catch(error => {
        //         console.error('Error:', error); // 请求错误处理
        //         setIsSent(false)
        //         setTimeDate(Date.now())
        //     });
        // }
        // eText && getResponse()  
    }

    const inputEnter = (e)=>{
        if(!inText || isSend)  return 
        e?.preventDefault(); 
        setIsSent(true)
        watchEvent(timeDate,inText)
    }
    useEffect(() => {
        const container = document.querySelector('.a_content');
        container.scrollTop = container.scrollHeight + 5000;
    }, [qaList.length]);
    
    useEffect(() => {
        // 在 inText 变化时聚焦到 TextArea
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
    }, [inText]);

    const changeIntext = (e)=>{
        setIntext(e?.target?.value)
    }
    const sendClick= ()=>{
       inputEnter()
    }
    const newTalk = ()=>{
        setIntext('')
        setQaList([])
        setParamList([])
    }
    const clearClick = ()=>{
        setParamList([])
        setQaList(prevList => (
            [
                ...prevList,
                {
                    q: "",
                    key: "clearLine",
                    a: ""
                }
            ]
        ))
    }
    return <div className='workBench_page'>
        <div className="model-basic-info">
            <div className="model-basic-info-left">
                <img src="https://platform.idealab.alibaba-inc.com/20231227/2cefc3ca-15ab-4991-b1cb-4a6726ba7861_qianwen.jpg?Expires=4102329600&amp;OSSAccessKeyId=LTAI5tFJF3QLwHzEmkhLs9dB&amp;Signature=tEhARJQVqkiRCZAcgSUBQutl%2FN8%3D" alt="" className="model-basic-info-logo" data-spm-anchor-id="0.0.0.i23.369e5fb49OWRKW"/>
                <div className="model-basic-info-name">
                    AI 快说
                    <PlusCircleOutlined 
                        style={{ fontSize: '18px', color: 'rgb(0, 87, 255)',marginLeft:'30px'}}
                        onClick={newTalk}
                    />
                </div>
            </div>
        </div>
        <div className='a_content'>
            <div className='qa_content'>
                {qaList.map(record =>(
                    <QaComponent 
                        {...record}  
                        item={record}
                        key={record?.key}
                    />))
                }
            </div>
        </div>
        <div className='q_content'>
            <div className="prompt-multimodal-input-plus-content-logos">
                <img src="https://idealab-platform.oss-accelerate.aliyuncs.com/20231227/2cefc3ca-15ab-4991-b1cb-4a6726ba7861_qianwen.jpg?Expires=4102329600&amp;OSSAccessKeyId=LTAI5tFJF3QLwHzEmkhLs9dB&amp;Signature=tEhARJQVqkiRCZAcgSUBQutl%2FN8%3D"/>
            </div>
            <TextArea 
                rows={4}
                height={'200px'}
                value={inText}
                onChange={changeIntext}
                prefix={<EditOutlined />}
                onPressEnter={inputEnter}
                placeholder='Please input...'
                autoFocus
                ref={textAreaRef} 
                dir='auto'
            />
            {paramList.length ? <div className='clear-func' onClick={!isSend && clearClick}>
                <img src='https://img.alicdn.com/imgextra/i1/O1CN01Jc9dla1eViO2OzUUy_!!6000000003877-2-tps-32-32.png' className="clear-img"/>
            </div>:null}
            <div className="prompt-multimodal-input-plus-content-input-send">
                {isSend ?<img src="https://img.alicdn.com/imgextra/i3/O1CN01bID9yT1L7SnDINgTe_!!6000000001252-2-tps-40-40.png" className="loading-img" data-spm-anchor-id="0.0.0.i7.369e5fb4uGuENC"/>
                :<img onClick={sendClick} src="https://img.alicdn.com/imgextra/i2/O1CN01Q6rxsB1UUfP3bdL36_!!6000000002521-2-tps-36-36.png" className="send-button-img" data-spm-anchor-id="0.0.0.i7.369e5fb4uGuENC"/>
                }
            </div>
        </div>
    </div>
}
export default WorkBench