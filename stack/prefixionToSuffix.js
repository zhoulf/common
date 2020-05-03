/**
1.遇到操作数，直接输出； 
2.栈为空时，遇到运算符，入栈； 
3.遇到左括号，将其入栈； 
4.遇到右括号，执行出栈操作，并将出栈的元素输出，直到弹出栈的是左括号，左括号不输出； 
5.遇到其他运算符’+”-”*”/’时，弹出所有优先级大于或等于该运算符的栈顶元素，然后将该运算符入栈； 
6.最终将栈中的元素依次出栈，输出。 
经过上面的步骤，得到的输出既是转换得到的后缀表达式。 
举例：a+b*c+(d*e+f)g ———> abc+de*f+g*+

*/

var Stack = function() {
	var s = [];

	return {
		_data: s,
		push(v) { s.push(v) },
		pop() { return s.pop() },
		top() { return s[s.length - 1]; },
		isEmpty() { return s.length === 0 }
	}
}

var getPriority = function(str) {
	var priority = {
		'+': 2,
		'-': 2,
		'*': 4,
		'/': 4
	}
	return priority[str];
}

var isOperator = function(ch) {
    return ['+','-','*','/','%','(',')'].includes(ch);
}

function prefixionToSuffix(exprStr) {
	var stk = Stack();
	var suffix = '';
	for (let s of exprStr) {
		// 操作数直接显示
		if (!isOperator(s)) {
			suffix += s
		} 
		// 操作符或括号
		else {
			// 如果为空或左括号，先入栈
			if (stk.isEmpty() || s === '(') stk.push(s)
			// 遇到）出栈，直到遇到(
			else if (s === ')') {
				let v = stk.pop();
				while(v !== '(') {
					suffix += v;
					v = stk.pop();
				}
			} 
			// 相等或低于栈顶元素时，所有大于等于的元素出栈
			else if (getPriority(s) <= getPriority(stk.top())) {
				while(!stk.isEmpty() && getPriority(s) <= getPriority(stk.top())) {
					suffix += stk.pop();
				}
				stk.push(s);
			}
			// 判断优先级高低，高的入栈
			else {
				stk.push(s)
			}
		}

	}
	
	if (!stk.isEmpty()) {
		let v;
		while( v = stk.pop()) suffix += v;
	}

	return suffix;
}

console.log(prefixionToSuffix('a+b*c+(d*e+f)*g'))