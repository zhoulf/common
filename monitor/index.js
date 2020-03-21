const Koa = require('koa');
const cp = require('child_process'); // 用来创建子进程
const path = require('path');
const fs = require('fs');
const utils = require('./utils');
const app = new Koa();

const KoaStatic  = require('koa-static');

const static = KoaStatic(path.join(__dirname, '/static/'));
app.use(static); 

app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = await utils.parsePostData(ctx);
        ctx.body = postData;

    } else if (ctx.url === '/log' && ctx.method === 'POST') {
        let postData = await utils.parsePostData(ctx);
        ctx.body = postData;
    }
});

    

// 3.分配路由
app.listen(3000);

cp.exec('open http://localhost:3000/'); // 自动打开浏览器