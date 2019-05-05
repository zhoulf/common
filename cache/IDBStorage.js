const emptyFn = () => {}
const indexDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

let asyncDB = null;

const IDBStorage = function(storeName) {

	let errorFn = IDBStorage.onerror || emptyFn;
	let successFn = IDBStorage.onsuccess || emptyFn;
	let config = { 'dataBaseName': 'library', 'version': Date.now() };

	const { dataBaseName, version } = Object.assign(config, IDBStorage.config);

	var request = null;
	var db = null;
	var idb = null;

	const openDB = () => {
		return new Promise((resolve, reject) => {
			request = indexDB.open(dataBaseName, version);

			request.onerror = event => { reject(event); errorFn(event) };
			request.onsuccess = event => {
				resolve(db = request.result);
				successFn(event);
			};

			request.onupgradeneeded = event => {
				idb = event.target.result;
				console.log('onupgradeneeded');

				var objectStore;
				if (!idb.objectStoreNames.contains(storeName)) {
					objectStore = idb.createObjectStore(storeName, { autoIncrement: true });
				}
			}
		})
	};

	const execute = (resolve, reject, data) => {
		let store = db.transaction([storeName], 'readwrite').objectStore(storeName);
		let exec = data === undefined ? store.get(1) : store.put(data, 1);

		exec.onsuccess = (event) => { resolve(data); };
		exec.onerror = (event) => reject(event);
	};

	asyncDB = Promise.resolve().then(openDB);

	return {
		put(data) {
			return new Promise((resolve, reject) => {
				asyncDB.then(db => {
					execute(resolve, reject, data);
				})
			})
		}
	}
}


/* use */
/*
IDBStorage.config = {
	'dataBaseName': 'SMS',
	'version': 1
}

IDBStorage.onerror = error => console.log('error');
IDBStorage.onsuccess = () => console.log('success');

IDBStorage('userList').put({name: 'zhangsan'}).then(d => console.log(d));
*/