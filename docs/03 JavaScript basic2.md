### JavaScript运算符

#### 算术运算符

+ 加法运算符：`+ (一方面可以用于数值的相加，另一方面可以用于字符串的连接)`

- 减法运算符：`- (字符串和数值相减可以得到数值)`


- 乘法运算符：`* (字符串和数值相乘可以得到数值,可以作为隐式转化字符串的方法)`


- 除法运算符：`/ (整数相除可以得到小数)`


- 余数运算符：`%`

+ 自增运算符：`++`（用法和C语言的相同，注意前置和后置的区别）


+ 自减运算符：`--`

```javascript
// + 用于字符串的时候表示连接，用于数值的时候表示运算
console.log("1" + "2"); //"12"
console.log("1" + 2); //"12"
console.log(1 + {}); //"1[object Object]"
console.log(10 + 20 + '是您的年龄'); //30 是您的年龄

//注意区分++i和i++运算
var x = "1";
console.log(++x); //2 注意++和--的隐式类型转换
var x = "1";
console.log(x + 1); //11
// 注意+=返回的是string类型
var a = '1';
a += 1;
console.log(a); // 11

// 注意区分JavaScript和C语言的区别
var i = 1;
var y = ++i + ++i + ++i;
console.log(y); //javascript的结果是9，而对于C语言的结果是12
```

#### 关系运算符

比较两个值，然后返回**一个布尔值**，表示是否满足比较条件

+ `==` 相等（如果类型不同，先转换再比较，注：引用类型到基本类型的转换方向）


+ `===` 全等（若类型不同则false，若类型相同则判断同 ==）


+ `!=` 不相等（相当于==的逆运算）


+ `!==` 全不相等（先判断类型，若类型不同则返回true，相当于===的逆运算）

```markdown
# == 类型不同，尝试进行转换和比较：
null == undefined // 相等
number == string (string转换为number进行比较)
boolean == number(boolean转换为number进行比较)
object == string | number(对象要转换为基本数据类型)
```

```javascript
// 关系运算符
// == === != !==

console.log(3 === 3); // true
console.log(3 === "3"); //false
console.log(3 == "3"); //true
console.log(3 == new String(3)); //true
console.log(3 === new String(3)); //false
console.log(undefined == 0);// false
console.log(null == 0);// false
console.log(null == undefined);// true
console.log(null === undefined);// false
console.log(NaN == NaN);// false
console.log(true == 2);// false true->1!=2

var obj1 = new String("xyz");
var obj2 = new String("xyz");
console.log("xyz" === obj1); //false
console.log(obj1 == obj2); // false
console.log(obj1 === obj2); //false
console.log(obj1 == new String("xyz")); //false

var obj1 = new String("xyz");
var obj2 = obj1;
console.log("xyz" != obj1); // false
console.log(obj1 !== obj2); // false
console.log(obj1 != obj2); //false
console.log(obj1 != new String("xyz")); //true
```

#### 逻辑运算符

+ 非运算符：`!`

逻辑非运算符可以用于任何值。无论这个值是什么数据类型，**这个运算符都会返回一个布尔值。**它的流程是：先将这个值转换成布尔值，然后取反，规则如下：

```javascript
var box = !(5 > 4); //false
var box = !''; //true
var box = !'Lee'; //false
var box = !0; //true
var box = !8; //false
var box = !null; //true
var box = !NaN; //true
var box = !undefined; //true

// 使用一次逻辑非运算符，流程是将值转成布尔值然后取反。
// 而使用两次逻辑非运算符就是将值转成成布尔值取反再取反，相当于对值进行Boolean()转型函数处理。
var box = !!0; //false
var box = !!NaN; //false
```

+ 或运算符`||`  和 与运算符 `&&`

**&&与||的基本理解及应用**

最常见情况（运算符两边的操作数都是布尔类型）

1. 对于`&&`来说， 除了两侧都为真时为真，其他情况都为假
2. 对于 `||` 来说，除了两侧都为假时为假，其他情况都为真

```javascript
// &&
console.log(2>1&&4<5);// true
console.log(true&&(!2));// false
console.log(false&&("2" == 2));// false
console.log(false&&false);// false

// ||
console.log(2>1||4<5);// true
console.log(true||(!2));// true
console.log(false||("2" == 2));// true
console.log(false||false);// false  
```

**&&与||的深层次理解（非布尔类型）**

当逻辑运算符&&和||两侧的操作数不是布尔类型时

1. 首先将左操作数转换成布尔类型
2. 对转换后的左操作数进行逻辑判断（true or false）
3. 根据短路原则返回原始左操作数或原始右操作数
   + 对于`&&`，转换后的左操作数若为true，则直接返回原始右操作数，若为false则直接返回原始左操作数
   + 对于`||`，转换后的左操作数若为true，则直接返回原始左操作数，若为false则直接返回原始右操作数

```javascript
//操作数非布尔类型，&&短路原则
console.log(2&&4);// 4
console.log(0&&4);// 0
console.log({x:2}&&{name:"Jack"});// {name:"Jack"}
console.log(null&&"hello");// null
console.log({}&&"world");// "world"

//操作数非布尔类型，||短路原则
console.log(2||4);// 2
console.log(0||4);// 4
console.log({x:2}||{name:"Jack"});// {x:2}
console.log(null||"hello");// "hello"
console.log({}||"world");// {}

//思考 所有对象转换为布尔类型 都为 true
console.log((new Boolean(false))&&234);// 234
console.log((new Boolean(false))||234);// new Boolean(false)
```

**&&与||在实际中的应用**

+ 遵循短路特性，使用&&和||可用来实现条件语句

```javascript
var score = 76;
if(score>90){
    console.log("优");
}else if(score>75){
    console.log("良");
}else if(score>60){
    console.log("及格");
}else{
    console.log("不及格");
}

//通过&&和||的组合实现如上功能，注：小括号优先级最高
console.log((score>90&&"优")||(score>75&&"良")||(score>60&&"及格")||"不及格");
```

+ 使用||来设置函数参数的默认值
  + 函数定义时可以给参数指定默认值，调用时若未传参数则该参数的值取它定义时的默认值
  + JS（ES6之前）不能直接为函数的参数指定默认值，可以通过 `||` 来实现

> 在下列案例中：未传参的话，形参初识为undefined，undefined转化为布尔值为false，根据||短路原则直接返回右操作数

```javascript
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));// 1 + 2 + 3
console.log(sum(1,2));// 1 + 2 + 5
console.log(sum(1));// 1 + 4 + 5
// console.log(sum(1,0,0));// 1 + 4 + 5

// sum函数的问题及完善
// 若实参转换为布尔类型为false，返回值则可能不是预期结果，如sum(1,0,0)为10
var sum = function(a,b,c){
    if(b!=false){b = b||4;}//(b!=false)&&(b=b||4);
    if(c!=false){c = c||5;}//(c!=false)&&(c=c||5);
    return a+b+c;
};
console.log(sum(1,2,3));// 1 + 2 + 3
console.log(sum(1,2));// 1 + 2 + 5
console.log(sum(1));// 1 + 4 + 5
console.log(sum(1,0,0));// 1 + 0 + 0
```

#### 赋值运算符

注意=与==（表达式要发反写，有什么好处）

```javascript
var a = 20;
if (a = 2) { //本来想写判等符号，确写成赋值
    console.log('Yes'); //结果输出了Yes
}
// 输出Yes

// 表达式反写的原因就是为了防止将判等号写成赋值符号
if (2 = a) {
    console.log('Yes'); // error
}
# Uncaught ReferenceError: Invalid left-hand side in assignment
```

#### 特殊运算符

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181121215238333.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ `delete` 运算符（删除属性）


+ `in` 运算符（判断某一个document是否在window上）


+ `new` 运算符（创建构造器的实例）


+ `void`（不管void的后面的值是多少都会返回undefined，一元运算符）

### JavaScript流程控制结构

#### 选择和分支语句

+ if 语句 - 只有当指定条件为 true 时，使用该语句来执行代码 


+ if...else 语句 - 当条件为 true 时执行代码，当条件为 false 时执行其他代码 


+ if...else if....else 语句 - 使用该语句来选择多个代码块之一来执行 （一个执行，其他的就不再进行执行了）

对于 if 语句括号里的表达式，ECMAScript 会自动调用**Boolean()**转型函数将这个表达式的结果转换成一个布尔值。如果值为 true，执行后面的一条语句，否则不执行。

```javascript
var box = 100;
if (box >= 100) {//如果满足条件，不会执行下面任何分支
  	console.log('甲');
} else if (box >= 90) {
  	console.log('乙');
} else if (box >= 80) {
  	console.log('丙');
} else if (box >= 70) {
  	console.log('丁');
} else if (box >= 60) {
  	console.log('及格');
} else {//如果以上都不满足，则输出不及格
  	console.log('不及格');
}
```

+ switch 语句 - 使用该语句来选择多个代码块之一来执行

**switch语句中的case**

1. case在比较时使用的是**全等操作符比较**,因此不会发生隐式类型转换
2. case 后可以是一个表达式（如i<60）

```javascript
//  case在比较时使用的是全等操作符比较,因此不会发生隐式类型转换
var i = '1';
switch (i) {
    case 1:
        console.log('1 Number');
        break;
    // case '1':
    //     console.log('"1" Number');
    //     break;
    default:
        console.log('default');
}

# 输出default

//思考：下边的例子输出什么?
// var j = 23; 输出 case_111
// var j = "23"; 输出 case_222
// var j = new String("23"); 输出 case_default
var j = new Number(23); // 输出 case_default
switch (j) {
    case 23:
        console.log("case_111");
        break;
    case "23":
        console.log("case_222");
        break;
    case new Number(23):
        console.log("case_333");
        break;
    default:
        console.log("case_default");
}
```

**switch语句中的穿透性及其应用**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181121215252527.png)

从满足第一case处开始执行，直到遇到break为止，若都没有break则直到default结束为止

#### 循环语句

+ **do...while** 语句

do...while 语句是一种先运行，后判断的循环语句。也就是说，不管条件是否满足，**至少先运行一次循环体。**

```javascript
var box = 1; //如果是 1，执行五次，如果是 10，执行 1 次
do {
	alert(box);
  	box++;
} while (box <= 5); //先运行一次，再判断
```

+ **while**语句

while 语句是一种先判断，后运行的循环语句。也就是说，必须满足条件了之后，方可运行循环体。

```javascript
var box = 1; //如果是 1，执行五次，如果是 10，不执行
while (box <= 5) { //先判断，再执行
	alert(box);
	box++;
}
```

+ **for**语句

for 语句是一种先判断，后运行的循环语句。但它具有在执行循环之前初始变量和定义循环后要执行代码的能力。

```javascript
for (var box = 1; box <= 5 ; box++) { //第一步，声明变量 var box = 1;
	alert(box); //第二步，判断 box <=5
} //第三步，alert(box)
//第四步，box++
//第五步，从第二步再来，直到判断为 false
```

#### break和continue语句

break和 continue语句用于在循环中精确地控制代码的执行。

+ break 语句会立即退出循环，强制继续执行循环体后面的语句。
+ continue 语句退出当前循环，继续后面的循环。

```javascript
for (var box = 1; box <= 10; box++) {
	if (box == 5) break; //如果 box 是 5，就退出循环
	document.write(box);
	document.write('<br />');
}
for (var box = 1; box <= 10; box++) {
	if (box == 5) continue; //如果 box 是 5，就退出当前循环
	document.write(box);
	document.write('<br />');
}
```

### JS严格模式

#### 基本概念

+ ES5中的运行模式：严格模式和非严格模式（松散模式）


+ 严格模式的目的
  + 消除Javascript语法的一些**不合理、不严谨之处，减少一些怪异行为**
  + 消除代码运行的一些不安全之处，保证代码运行的安全
  + 提高编译器效率，增加运行速度


+ 启用严格模式的方式
  + 针对整个脚本文件使用 `'usestrict'`
  + 针对函数使用 `'usestrict'`

```javascript
// 严格模式的使用方法
"use strict" //全局使用

function f() {
    "use strict" //函数内部使用
}
```

#### JS严格模式下语法和行为的改变

+ **严格模式下全局变量需显式声明**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181121215310397.png)

```javascript
// 严格模式下全局变量需要显式声明
function f() {
    // 'use strict' 会报错，不会输出a
    a = 3;
    return a;
}
console.log(f());
```

+ **函数中的this**

一般函数中的this（严格模式）为undefined，非严格下为全局变量window

```javascript
// 函数中的this 一般函数中的this（严格模式）为undefined，非严格下为全局变量window
function f() {
    // 'use strict' 会报错，不会输出a
    return this;
}
console.log(f()); // 非严格模式下为window 严格模式下this为undefined
```

可以用此特性来判断当前是否为严格模式

```javascript
/* 判断是否为严格模式,怎么判断一个函数是严格模式？ */
function isStrictMode() {
    if (this === undefined) {
        return true; // 严格模式
    } else {
        return false; // 不是严格模式
    }
}
isStrictMode();
```

+ **属性、变量及函数参数**

严格模式下禁止删除不可改变的属性和未定义的变量

```javascript
// 严格模式下禁止删除不可改变的属性和未定义的变量
function f(str) {
    // 'use strict'
    str.length = 0;
    console.log(str.length);
}
var a = 'abc';
f(a);// 3

function f(str) {
    'use strict'
    str.length = 0;
    console.log(str.length);
}
var a = 'abc';
f(a);
# Uncaught TypeError: Cannot assign to read only property 'length' of string 'abc'
#     at f (<anonymous>:3:16)
#     at <anonymous>:7:1
```

严格模式下禁止函数参数重名

```javascript
// 严格模式下禁止函数参数重名
//"use strict";
function f(a, a, b) {
    return a + b;
}
f(2, 3, 4);// 7

"use strict";
function f(a, a, b) {
    return a + b;
}
f(2, 3, 4);
# Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```

严格模式下禁止删除未定义的变量

```javascript
//严格模式下禁止删除未定义的变量
delete foo; // true

'use strict';
delete foo; //error
# Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
```