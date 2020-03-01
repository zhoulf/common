// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自zlf content-script的消息：', request);
	console.log(request, sender, sendResponse);

	chrome.tabs.query({ title: 'child_window' }, function(tabs) {
		if (tabs.length) {
			chrome.tabs.highlight({ tabs: 0 });
		} else {
			chrome.tabs.create({ 
				// "url": "https://www.baidu.com",
				"url": "http://localhost/openWindow/child_window.html",
				"index": 0,
				// "openerTabId": 666 // request.openerTabId 
			}, function(tab) {
				sendResponse(tab.id);
			});
		}
	});
	
});