import {ReactComponent as NoCookiePage} from '@/public/images/noCookiePage.svg'
import "./index.scss"

const noCookiePage = ()=>{
    return (
        <div className="noCookiePage">
            <div className="noCookiePage_content">
                <div>
                    <div className='svgStyle'>
                        <NoCookiePage/>
                    </div>
                    <h3>
                        Your browser settings block third-party cookies, you need to modify the settings before open this page.
                    </h3>
                    <h4>
                        <p>For Chrome, please refer to:</p>
                        <a href='https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop'>
                            https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop
                        </a>
                    </h4>
                    <h4>
                        
                        <p>For Safari, please refer to:</p>
                        <a href='https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac'>
                            https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                        </a>
                    </h4>
                    <h4>
                        <p>For Firefox, please refer to:</p>
                        <a href='https://support.mozilla.org/en-US/kb/third-party-cookies-firefox-tracking-protection'>
                            https://support.mozilla.org/en-US/kb/third-party-cookies-firefox-tracking-protection
                        </a>
                    </h4>
                    <h4>
                        <p> For Edge, please refer to:</p>
                        <a href='https://support.microsoft.com/en-us/search?query=enable%20cookies%20in%20edge'>
                            https://support.microsoft.com/en-us/search?query=enable%20cookies%20in%20edge
                        </a>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default noCookiePage