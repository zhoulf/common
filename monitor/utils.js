function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.addListener('data', (data) => { // 有数据传入的时候
                postData += data;
            });
            ctx.req.on('end', () => {
                let parseData = parseQueryStr(postData);
                resolve(parseData);
            });
        } catch (e) {
            reject(e);
        }
    })
}

// 处理 string => json
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log('queryStrList',queryStrList);
    console.log('queryStrList.entries()',queryStrList.entries());
    for(let [index,queryStr] of queryStrList.entries()){
        let itemList = queryStr.split('=');
        console.log('itemList',itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}

exports.parsePostData = parsePostData;