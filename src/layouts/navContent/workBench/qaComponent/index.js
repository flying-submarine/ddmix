import User from './user.jpeg'; 

import './index.scss'

const QaComponent = ({item})=>{
  if(item.key === 'clearLine'){
    return <div className="divider-line">
      <p/>
      <p className='text'>Context Cleared</p>
      <p/>
    </div>
  }
  return <div className='qaComponent'>
    <div className='prompt-box'>
      <img src={User} alt="error" className="prompt-box-avatar"/>
      <div className="prompt-box-desc">
          <div className="prompt-box-desc-prompt" dir='auto'>
            {item.q}
          </div>
        </div>
    </div>
    <div className='single-chat-box chat-box-wrap'>
      <div className="model-basic-info">
        <div className="model-basic-info-left">
          <img src="https://platform.idealab.alibaba-inc.com/20231227/2cefc3ca-15ab-4991-b1cb-4a6726ba7861_qianwen.jpg?Expires=4102329600&amp;OSSAccessKeyId=LTAI5tFJF3QLwHzEmkhLs9dB&amp;Signature=tEhARJQVqkiRCZAcgSUBQutl%2FN8%3D" alt="" className="model-basic-info-logo" data-spm-anchor-id="0.0.0.i23.369e5fb49OWRKW"/>
          <div className="model-basic-info-name">Qwen-Turbo-Poly-Chat_HF</div>
        </div>
      </div>
      <div className="have-service-chat-box">
        <div className="ChatBox">
          <div className="ChatBox-contents">
            <div className="ChatBox-contents-inner">
              <div className="ChatBox-contents-inner-box" >
                <div className="ChatBox-contents-inner-box-text" >
                  <p dir='auto'>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default QaComponent
