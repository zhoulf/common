// defer: https://github.com/sxei/chrome-plugin-demo
console.log('这是zlf定义的插件！');

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function() {
    injectCustomJs();
    initCustomPanel();
	initCustomEventListen();
})

window.addEventListener("message", function(e)
{
	console.log('收到zlf消息：', e.data);
	if(e.data && e.data.cmd == 'invoke') {
		eval('('+e.data.code+')');
	}
	else if(e.data && e.data.cmd == 'open_child_window') {
		// tip(e.data.data);
	    chrome.runtime.sendMessage({ greeting: '打开其它tab页' }, function(response) {
			console.log('收到来自后台的回复：' + response);
		});
    }

}, false);

// 监听长连接
// chrome.runtime.onConnect.addListener(function(port) {
// 	console.log(port);
// 	if(port.name == 'test-connect') {
// 		port.onMessage.addListener(function(msg) {
// 			console.log('收到长连接消息：', msg);
// 			tip('收到长连接消息：' + JSON.stringify(msg));
// 			if(msg.question == '你是谁啊？') port.postMessage({answer: '我是你爸！'});
// 		});
// 	}
// });

// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'scripts/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.body.appendChild(temp);
}

function initCustomPanel()
{
	var panel = document.createElement('div');
	panel.innerHTML = `
			<a href="javascript:openChildWindow(666)">通过postMessage发送消息给content-script</a><br>
	`;
	document.body.appendChild(panel);
}

function initCustomEventListen() {
	var hiddenDiv = document.getElementById('myCustomEventDiv');
	if(!hiddenDiv) {
		hiddenDiv = document.createElement('div');
		hiddenDiv.style.display = 'none';
		hiddenDiv.id = 'myCustomEventDiv';
		document.body.appendChild(hiddenDiv);
	}
	hiddenDiv.addEventListener('myCustomEvent', function() {
		var eventData = document.getElementById('myCustomEventDiv').innerText;
		tip('收到自定义事件：' + eventData);
	});
}


var tipCount = 0;
// 简单的消息通知
function tip(info) {
	info = info || '';
	var ele = document.createElement('div');
	ele.className = 'chrome-plugin-simple-tip slideInLeft';
	ele.style.top = tipCount * 70 + 20 + 'px';
	ele.innerHTML = `<div>${info}</div>`;
	document.body.appendChild(ele);
	ele.classList.add('animated');
	tipCount++;
	setTimeout(() => {
		ele.style.top = '-100px';
		setTimeout(() => {
			ele.remove();
			tipCount--;
		}, 400);
	}, 3000);
}