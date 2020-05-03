/**
1.扫描后缀表达式： abc*+de*f+g*+
①如果是数字，则让其进栈 
②若为操作符，则从栈中取出两个操作数，先取出的作为右操作数，后取出的作为左操作数，然后进行该操作符的运算，并使其结果入栈。 
③重复上述过程，直至表达式扫描完成。 
2.最终栈中只留一个元素—–>即就是结果。
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

var calc = function(oprate, s1, s2) {
    var oprateMap = {
        '+': (s1, s2) => s1 + s2,
        '-': (s1, s2) => s1 - s2,
        '*': (s1, s2) => s1 * s2,
        '/': (s1, s2) => s1 / s2,
    }
    return oprateMap[oprate](+s1, +s2);
}

var suffixToValue = function(exprStr) {
    var stk = Stack();
    for (let s of exprStr) {
        if (!isOperator(s)) stk.push(s)
        else {
            let r = stk.pop(), l = stk.pop();
            stk.push(calc(s, l, r))
        }
    }

    return stk.pop();
}

console.log(suffixToValue('123*+45*6+7*+'))
