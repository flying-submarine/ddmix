import { createBrowserHistory } from "history"
import { get } from "@/utils/request"

const history = createBrowserHistory()
const navigateUrl = ( path )=>{
    return  history.push({ pathname:path 
})}
function getNearly7Day(tDay = new Date().getTime()) { 
    let days = []
    for (let i = 0; i <= 24 * 6; i += 24) {
        let dateItem = new Date(tDay - i * 60 * 60 * 1000) 
        let y = dateItem.getFullYear() 
        let m = dateItem.getMonth() + 1 
        let d = dateItem.getDate() 
        let valueItem = y + '-' + m + '-' + d 
        days.unshift(valueItem) 
    }
    return days
}
function getUrlOption(){ 
    let str = window.location.search.substring(1).split("&");
    let obj = {};
    str.forEach(e => {
        let list = e.split("=");
        obj[list[0]] = list[1];
    });
    return obj
}

function toCurrency(num){
    if(num == null) return num
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

const checkLoginLink = (urlId='')=>{ 
    get('/start/check_login').then(()=>{
        window.open(`/cpq/boq/preview?boqId=${urlId}`);
    });
}
const downloadExcel = (urlId='')=>{ 
    get('/start/check_login').then(()=>{
        window.location.href= `/cpq/boq/download/excel?boqId=${urlId}` 
    });
    // get(`/boq/download/excel?boqId=${urlId}`)
}
const checkPreviewLoginLink = (urlId='')=>{ 
    get('/start/check_login').then(()=>{
        window.open(`/cpq/boq_template/preview?id=${urlId}`);
    });
}


const formatDate=()=>{ 
    const date = new Date();
    const y =  date.getFullYear();
    const M =  ('0' + (date.getMonth() + 1)).substring(1);
    const d =  ('0' + date.getDate()).substring(1);
    return `${y}-${M}-${d}`;
}

const operLocalStorage = (method,keyName, defaultValue) => { 
    if (!window.localStorage) return console.error('Browser is not compatible localStorage.')
    try { 
        if (method==="get"){
           const value =  window.localStorage.getItem(keyName);
           return JSON.parse(value)
        } 
        if(method==="set"){
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        }
        if(method=== "delete"){
            window.localStorage.removeItem(keyName)
        }
    } catch (err) {
        return console.error(err);;
    }
};

export {
    navigateUrl,
    getNearly7Day,
    formatDate,
    operLocalStorage,
    getUrlOption,
    checkLoginLink,
    checkPreviewLoginLink,
    toCurrency,
    downloadExcel
}