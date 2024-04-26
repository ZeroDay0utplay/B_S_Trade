function convert(jsonArr){
    let strArr = [];
    for (let x of jsonArr){
        strArr.push(x.stock_name);
    }
    return strArr;
}

module.exports = {convert};