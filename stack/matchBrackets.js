
/*
栈的基本操作及如何判断一个表达式中的左右括号是否匹配
1.扫描整个表达式； 
2.判断当前字符是否为括号（左右括号） 
①如果不是，则继续扫描下一个字符； 
②如果是，则判断当前操作符是否为左括号 
若为左括号—>直接入栈。 
如果不是左括号，则说明是右括号，这时应该判断栈是否为空。 
若栈为空—> 说明此表达式右括号多于左括号。 
若栈不为空—>判断当前操作符是否和栈顶操作符匹配，若不匹配—->说明左右括号不匹配，若匹配—–>则继续判断下一个操作符。 
3.最后，判断栈是否为空 
①栈不为空—–>说明左括号多于右括号 
②栈为空—–>说明括号匹配成功。
————————————————
版权声明：本文为CSDN博主「小葱1024」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_34992845/java/article/details/70313454
*/
function IsOperator(ch) {
    if (ch == '(' || ch == ')' || ch == '[' || ch == ']' || ch == '{' || ch == '}')
    {
        return true;
    }
    return false;
}

function jsStack() {
	var s = [];
	return {
		push: function(v) {
			s.push(v)
		},
		pop: function() {
			return s.pop();
		},
		top: function() {
			return s[s.length - 1];
        },
        empty: function() {
            return s.length === 0;
        }
	}
}


function MatchBrackets(exprStr) {
    var s = jsStack();
    // assert(str);
    var len = exprStr.length;
    var i = 0;
    var str = '';
    //首先扫描字符串，然后判断是否为括号
    while (i < len)
    {
    	str = exprStr.charAt(i);
        if (!IsOperator(str))
        {
            i++;
            continue;
        }
        if (str == '(' || str == '[' || str == '{')
        {
            s.push(str);
            i++;
        }
        else//右括号
        {
            if (s.empty())
            {
                console.log("右括号多于左括号");
                return false;
            }
            if (str == ')' && s.top() == '(' || str == ']' && s.top() == '[' || str == '}' && s.top() == '{')
            {
                s.pop();
                i++;
            }
            else
            {
                console.log("左右括号不匹配");
                return false;
            }
        }
    }
    if (!s.empty())
    {
        console.log("左括号多于右括号");
        return false;
    }
    console.log("左右括号匹配正确");
    return true;
}

function Test() {
    var a = "(())abc{[(])}"; // 左右括号次序匹配不正确
    var b = "(()))abc{[]}"; // 右括号多于左括号
    var c = "(()()abc{[]}"; // 左括号多于右括号
    var d = "(())abc{[]()}"; // 左右括号匹配正确
    MatchBrackets(a);
    MatchBrackets(b);
    MatchBrackets(c);
    MatchBrackets(d);
}


Test();
