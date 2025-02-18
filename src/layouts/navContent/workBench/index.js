import { Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import Chat from './chat.png';
import QaComponent from './qaComponent';
import './index.scss';

const WorkBench = () => {
    const { TextArea } = Input;
    const textAreaRef = useRef(null);
    const [qaList, setQaList] = useState([]);
    const [inText, setIntext] = useState('');
    const [isSend, setIsSent] = useState(false);
    const [timeDate, setTimeDate] = useState(Date.now());
    const [paramList, setParamList] = useState([]);
    const [currentResponse, setCurrentResponse] = useState(''); // 用于存储当前回复的片段

    const watchEvent = async (timestamp, eText) => {
        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "deepseek-r1:1.5b",
                    prompt: eText,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            let result = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // 将流式数据转换为字符串
                const chunk = new TextDecoder().decode(value);
                const jsonChunk = JSON.parse(chunk);

                // 更新当前回复
                result += jsonChunk.response;
                setCurrentResponse(result);

                // 更新 UI
                setQaList(prevList => {
                    const lastItem = prevList[prevList.length - 1];
                    if (lastItem && lastItem.key === timestamp) {
                        return [
                            ...prevList.slice(0, -1),
                            { ...lastItem, a: result }
                        ];
                    }
                    return prevList;
                });
            }
        } catch (error) {
            console.error("Error fetching response from Ollama:", error);
        } finally {
            setIsSent(false); // 重置发送状态
        }
    };

    const inputEnter = (e) => {
        if (!inText || isSend) return;
        e?.preventDefault();
        setIsSent(true);

        // 添加用户输入到 qaList
        const newQaItem = {
            q: inText,
            key: timeDate,
            a: '' // 初始回复为空
        };
        setQaList(prevList => [...prevList, newQaItem]);

        // 调用 watchEvent 获取回复
        watchEvent(timeDate, inText);

        // 清空输入框
        setIntext('');
        setTimeDate(Date.now()); // 更新时间戳
    };

    useEffect(() => {
        const container = document.querySelector('.a_content');
        container.scrollTop = container.scrollHeight + 5000;
    }, [qaList.length]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [inText]);

    const changeIntext = (e) => {
        setIntext(e?.target?.value);
    };

    const sendClick = () => {
        inputEnter();
    };

    const newTalk = () => {
        setIntext('');
        setQaList([]);
        setParamList([]);
        setCurrentResponse(''); // 清空当前回复
    };

    const clearClick = () => {
        setParamList([]);
        setQaList(prevList => [
            ...prevList,
            {
                q: "",
                key: "clearLine",
                a: ""
            }
        ]);
    };

    return (
        <div className='workBench_page'>
            <div className="model-basic-info">
                <div className="model-basic-info-left">
                    <img src={Chat} alt="Chat" />&nbsp;&nbsp;
                    <div className="model-basic-info-name">
                        AI 快说
                        <PlusCircleOutlined
                            style={{ fontSize: '18px', color: 'rgb(0, 87, 255)', marginLeft: '30px' }}
                            onClick={newTalk}
                        />
                    </div>
                </div>
            </div>
            <div className='a_content'>
                <div className='qa_content'>
                    {qaList.map(record => (
                        <QaComponent
                            {...record}
                            item={record}
                            key={record?.key}
                        />
                    ))}
                </div>
            </div>
            <div className='q_content'>
                <div className="prompt-multimodal-input-plus-content-logos">
                    <img src={Chat} alt="Chat" />
                </div>
                <TextArea
                    rows={4}
                    height={'200px'}
                    value={inText}
                    onChange={changeIntext}
                    onPressEnter={inputEnter}
                    placeholder='Please input...'
                    autoFocus
                    ref={textAreaRef}
                    dir='auto'
                />
                {paramList.length ? (
                    <div className='clear-func' onClick={!isSend && clearClick}>
                        <img
                            src='https://img.alicdn.com/imgextra/i1/O1CN01Jc9dla1eViO2OzUUy_!!6000000003877-2-tps-32-32.png'
                            className="clear-img"
                            alt="Clear"
                        />
                    </div>
                ) : null}
                <div className="prompt-multimodal-input-plus-content-input-send">
                    {isSend ? (
                        <img
                            src="https://img.alicdn.com/imgextra/i3/O1CN01bID9yT1L7SnDINgTe_!!6000000001252-2-tps-40-40.png"
                            className="loading-img"
                            alt="Loading"
                        />
                    ) : (
                        <img
                            onClick={sendClick}
                            src="https://img.alicdn.com/imgextra/i2/O1CN01Q6rxsB1UUfP3bdL36_!!6000000002521-2-tps-36-36.png"
                            className="send-button-img"
                            alt="Send"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkBench;