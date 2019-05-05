import Idb from "../src/Idb";
import db_sms_config from "./db_sms_config";


class Storage {
	constructor() {
		this._data = {};
	}
	get(name) {
		return Promise.resolve(this._data[name]);
	}
	set(name, value) {
		return Promise.resolve(this._data[name] = value);
	}
	clear(name) {
		return Promise.resolve(this._data[name] = undefined);
	}
	removeAll() {
		return Promise.resolve(this._data = {});
	}
};

class IDBStorage {
	get(name) {
		return new Promise((resolve, reject) => {
			Idb(db_sms_config).then(sms_db => {
				sms_db.query({
			        tableName: name,
			        condition: item => item,
			        success: r => {
			          // console.log('查询成功')
			          r ? resolve(r) : reject(r);
			        }
			      });
			})
		})
	}
	set(name, value) {
		return new Promise((resolve, reject) => {
			Idb(db_sms_config).then(sms_db => {
				sms_db.insert({
			        tableName: name,
			        data: value,
			        success: r => {
			          console.log('set success')
			          resolve(value)
			        }
			      });
			})
		})
	}
	clear(name) {
		return Idb(db_sms_config).then(sms_db => {
			return sms_db.clear_table({ tableName: name });
		})
	}
	removeAll() {
		return Idb(db_sms_config).then(sms_db => {
			return sms_db.delete_db();
		})
	}
}

class CacheStore {
	constructor(name) {
		this.cid = name;
		this.store = new IDBStorage();
	}
	get() {
		return this.store.get(this.cid);
	}
	set(data) {
		return this.store.set(this.cid, data);
	}
	clear() {
		return this.store.clear(this.cid);
	}
	removeAll() {
		this.store.removeAll();
	}
}

function strategy(options) {
	let defaults = {
		"type": "expires",
		"expires": Date.now() + 1000*60*60*24,
		"maxAge": 31536000,
		"noStore": function() {
			return false;
		}
	}

	return Object.assign(defaults, options);
}

function size(d) {
	return Array.isArray(d) && d.length;
}

function initCache(settings, dataPomis, store) {

	var timeCache = {
		"expires": function(d) {
			if (new Date() < settings.expires && d.length) {
				console.log('from cache');
				return Promise.resolve(d);
			} else {
				return dataPomis();
			}
		},
		"maxAge": function(d) {
			if (new Date() < Date.now() + settings.maxAge && d.length) {
				console.log(`from cache`);
				return Promise.resolve(d);
			} else {
				return dataPomis();
			}
		}
	}
	return function() {
		return store.get().then(d => {
			if (settings.noStore(d)) {
				return dataPomis();
			}
			if (timeCache[settings.type]) {
				return timeCache[settings.type](d);
			}

			console.warn(`cache type: ${setting.type} is not existent!`);
			return dataPomis();
		})
	}
}

class Cache {
	constructor(name, dataPomis, options) {
		this.store = new CacheStore(name);

		/*
		 * expires maxAge
		 * expires: 当前时间小于过期时间expirationDate，直接使用缓存数据
		 * maxAge: 缓存的内容将在 relativeTime 秒后失效
		 */
		// 按优先级从低到高：设置过期时间、相对的过期时间、触发是否过期的事件
		this._settings = strategy(options);

		// dataSource是一个promise对象
		this.dataPomisFn = () => {
			 return dataPomis().then(
					data => { 
						console.log(`cache it: ${name}`);
						return this.store.set(data)
					}
				);
		};

		this.loadFn = initCache(this._settings, this.dataPomisFn, this.store);
	}

	load() {
		return this.loadFn();
	}

	clear() {
		return this.store.clear();
	}

	removeAll() {
		return this.store.removeAll();
	}
}


var ajaxUser = function() {
	return Promise.resolve([{id: 1,score: 68,name: "小明"},{id: 2,score: 88,name: "小洪"}])
}
var ajaxMenu = function() {
	return Promise.resolve({id: 1,name: 'item1', pid: 0, link: 'www.baidu.com'})
}

var ajaxPermision = function() {
	return Promise.resolve({
		id: 1, 
		f: [{n:1,t:'RW'},{n:2,t:'R'}],
		m: [{n:1,t:'W'},{n:2,t:'R'}],
		d: [{n:1,t:'RW'},{n:2,t:'R'}]
	})
}

var ajaxBiz = function() {
	return Promise.resolve({
		sec_code: '000001',
		sec_name: 'pingan'
	})
}

var userCache = new Cache('user', ajaxUser, { type: 'expires' });
userCache.load();

var menuCache = new Cache('menu', ajaxMenu, { type: 'maxAge' });
menuCache.load();

var permisionCache = new Cache('biz', ajaxBiz, { noStore() { return true; } }); // { noStore() { return true; }
permisionCache.load().then(d => console.log(d));

class SessionCache extends Cache {
	constructor(name, dataPomis, options) {
		let noStore = (d) => {
			console.log(sessionStorage.getItem('sessionId'), d);
			return sessionStorage.getItem('sessionId') != (d && d[0] && d[0].id);
		};

		// control是最高优先级的缓存，按默认可缓存1天
		super(name, dataPomis, { noStore });
	}
}

var bizCache = new SessionCache('permision', ajaxPermision);
bizCache.load().then(d => console.log(d))

var btn = document.createElement('button');
btn.innerHTML = 'removeAll';
btn.onclick = () => userCache.removeAll();
document.body.appendChild(btn);

var btn = document.createElement('button');
btn.innerHTML = 'clear';
btn.onclick = () => userCache.clear();
document.body.appendChild(btn);

