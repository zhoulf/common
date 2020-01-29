function $(selector) {
	return {
		dom: dom(selector),
		on: on,
		offset: offset,
		height: height,
		text: text,
		css: css,
		append: append,
		scrollTop: scrollTop,
		setData: setData,
		value: value
	};
}
$.log = function() {
	console.log.apply(console, arguments);
};

$.noop = function(v) { return v; };

$.nearestModulo = function(num, module) {
	var val = num % module;
	if (val === 0) {
		return num;
	}
	
	return val < module/2 ? num - val : num + (module - val);
}

$.each = function(collection, iterate) {
	for (var i = 0, len = collection.length; i < len; i++) {
		iterate(collection[i], i);
	}
}

function dom(selector) {
	return typeof selector === 'object' 
	? selector
	: document.querySelector(selector);
}

function on(evtName, handler, bobble) {
	addEventListener.call(this.dom, evtName, handler, !!bobble);
}

function offset() {
	return {
		left: this.dom.scrollLeft,
		top: this.dom.scrollTop
	};
}

function height(val) {
	if (isNaN(val)) {
		return this.dom.clientHeight;
	} else {
		this.dom.style.height = val;
		return this;
	}
}

function text(str) {
	this.dom.innerText = str;
	return this;
}

function css(attrs) {
	for (var attr in attrs) {
		if (attrs.hasOwnProperty(attr)) {
			this.dom.style[attr] = attrs[attr] + 'px';
		}
	}
}

function scrollTop(val) {
	this.dom.scrollTop = val;
}

function append(tagName, size) {
	var rowsFrag = document.createDocumentFragment();
	var row, cell, i;
	while (size--) {
		row = document.createElement(tagName);
		for (i = 0; i < 6; i++) {
			cell = document.createElement('li');
			cell.setAttribute('tabindex', -1);

			row.appendChild(cell);
		}
		rowsFrag.appendChild(row);
	}

	this.dom.appendChild(rowsFrag);
}

function setData(data, columnModel) {
	var childs = this.dom.childNodes;

	$.each(childs, function(row, i) {
		$.each(row.childNodes, function(cell, j) {
			cell.innerHTML = columnModel[j].render(data[i][columnModel[j].dr]);
		});
	});
}

function value() {
	return this.dom.value;
}