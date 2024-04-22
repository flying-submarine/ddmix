
const dataByGroup = (list)=>{
    const chargeTypeTitleList = [...new Set(list.map(ele=>ele.chargeTypeTitle+ele.commodityName))];
    const obj = {};
    chargeTypeTitleList.forEach(item=>{
        obj[item]=list.filter(ls=>{
           return (ls.chargeTypeTitle+ls.commodityName)===item
        });
        obj[item].forEach((ele,index)=>{
            if(index===0) {
                ele.rowSpan = obj[item].length;
            } else {
                ele.rowSpan = 0;
            }
        })
    })
    let nextData = [];
    Object.values(obj).forEach(item=>{
        nextData = nextData.concat(item);
    })
    return nextData;
}

const calculatorList = (chargeType, discount, list)=>{
    return list.map(item=>{
        if(item.chargeTypeTitle+item.commodityName === chargeType) {
            item.discount = discount;
            item.tradeAmount = (100 - discount)===0 ? 0 :(Number(item.originalAmount)*(100 - discount)/100*Number(item.quantity)).toFixed(3)
            item.priceAfterDiscount =(100 - discount)===0 ? 0 :(Number(item.originalAmount)*(100 - discount)/100).toFixed(3)
        }
        return item;
    })
}

export { dataByGroup, calculatorList }