![在这里插入图片描述](https://img-blog.csdnimg.cn/20181120093523487.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### Number类型

Number基本数据类型变量有与**其对应的Number包装对象**，当访问Number基本数据类型属性或方法时创建临时包装对象，访问的都是对象中的属性或方法（注：访问对象属性时，首先访问自身属性，访问不到时，则会在原型链上寻找对应的属性和方法）

+ Number原型方法(Number对象继承的方法）
  + `Number.prototype.toFixed(...)、Number.prototype.toPrecision(...)`
  + `Number.prototype.toString(...)、Number.prototype.toExponential(...)`


+ Number构造器属性（静态属性）
  + `Number.MAX_VALUE、Number.MIN_VALUE`
  + `Number.NaN、Number.NEGATIVE_INFINITY、Number.POSITIVE_INFINITY`


+ **Number函数的使用**
  + 类型转换、实例化Number对象（原始值的包装对象）

注意Math对象的方法

+ 常用操作
  + 四舍五入：`Math. round( )`
  + 向下取整：`Math.floor( )`
  + 生成随机数：`Math.random( )`
  + 取到最大值：`Math.max( )`
  + 取到最小值：`Math.min( )`


+ `Math.ceil()`执行向上舍入，即它总是将数值向上舍入为最接近的整数；


+ `Math.floor()`执行向下舍入，即它总是将数值向下舍入为最接近的整数；


+ `Math.round()`执行标准舍入，即它总是将数值四舍五入为最接近的整数；

```javascript
//number属性
Number.MAX_VALUE //JS中最大的数
Number.MIN_VALUE //JS中最小的数
Number.NaN //NaN,表示非数字值，与任意其他数字都不等，包括本身，就是NaN==NaN返回结果是false,应该使用isNaN()方法来进行判断
console.log(NaN === NaN);
console.log(isNaN("12,3"));
Number.NEGATIVE_INFINITY // 负无穷
Number.POSITIVE_INFINITY // 正无穷

//number实例方法
var n1 = 12345.6789;
console.log(n1.toFixed(2)); // 将一个数字转换为指定小数位数的字符串
console.log(n1.toPrecision(3)); // 将一个数字在对象的值超出指定位数时，将其转换为指数计数法
console.log(n1.toString()); // 使用指定的进制，将一个数字转换为字符串，不传入参数，默认为十进制
console.log(n1.toExponential(2)); // 将一个数字表示指数类型，参数表示小数点后的位数

//注意Math的用法
console.log(Math.floor(3.8)); // floor 向下取整 3
console.log(Math.floor(-3.8)); //-4
console.log(Math.ceil(3.2)); // ceil 向上取整 4
console.log(Math.ceil(-3.2)); // -3
console.log(Math.round(-3.2)); // round 标准的四舍五入 // -3
console.log(Math.round(-3.5)); // -3
console.log(Math.round(-3.8)); // -4
```

### String类型

#### 基本概念

String 类型用于表示由零或多个 16 位 Unicode 字符组成的字符序列，即字符串。字符串可以由双引号`(")`或单引号`(')`表示， 

String基本数据类型变量有与**其对应的String包装对象**，当访问String基本数据类型属性或方法时创建临时包装对象，访问的都是对象中的属性或方法（注：访问对象属性时，首先访问自身属性，访问不到时，则会在原型链上寻找对应的属性和方法）

```javascript
// 空字符 空格字符
var a = '';
var b = ' ';
// 使用字面量创建字符串
var str = 'abc/dce/f';
```

常见的转义字符：

| \0   | 空字节  |
| ---- | ---- |
| \n   | 换行   |
| \’   | 单引号  |
| \\   | 斜杠   |
| \’’  | 双引号  |

```javascript
//转义字符 \n \" \' \\
console.log("abc\ndefghi\\\n\'mn\'");

# 输出结果
abc
defghi\
'mn'
```

#### 属性

字符串String类型的每个实例都有一个**length属性**，表示字符串中的字符个数。由于字符串是不可变的，**所以字符串的长度也不可变**

```javascript
var str = "abcde";
console.log(str.length);//5 临时包装成了String对象
str.length = 1;
console.log(str.length,str);//5 "abcde" 临时包装对象并不影响原始值
```

#### 方法

```javascript
// 对象通用方法 返回string类型的原始字符串值
console.log("test".valueOf()); //"test"
console.log("test".toString()); //"test"
console.log("test".toLocaleString()); //"test"

// 访问字符方法
// 字符串的访问字符方法总共有chartAt()、 中括号[]、 charCodeAt()三种
/* charAt()方法：charAt()方法接收一个基于0的字符位置的参数，返回指定位置的字符。当参数为空或NaN时， 默认参数为0； 
当参数超出范围时， 则返回一个空字符串 */
var str = "hello";
console.log(str.charAt(1)); //e
console.log(str.charAt(-1)); //''
console.log(str.charAt(10)); //''
console.log(str.charAt()); //h 
console.log(str.charAt(NaN)); //h
/* charAt()方法涉及到Number()函数的隐式类型转换，如果转换为数值，则按照上述规则输出字符串；如果转换为NaN，则输出第0个字符 */
var str = "hello";
console.log(str.charAt(true)); //'e'
console.log(str.charAt(false)); //'h'
console.log(str.charAt('abc')); //'h'
console.log(str.charAt({})); //'h'
console.log(str.charAt([2])); //'l'
/* 中括号[] 使用方括号加数字索引来访问字符串中的特定字符。 如果参数超出范围或是NaN时， 则输出undefined； 
没有参数时，会报错；该方法没有Number() 转型函数的隐式类型转换，但参数为单数值数组时可转换为数值*/
var str = "hello";
console.log(str[0]); //h
console.log(str[[1]]); //e
console.log(str[false]); //undefined
console.log(str[-1]); //undefined
console.log(str[NaN]); //undefined
console.log(str[]); //报错
/* charCodeAt() 方法类似于charAt() 方法， 接收一个基于0的字符位置的参数，但返回的是指定位置的字符16位Unicode编码。
返回值是一个16位的整数，在0-65535之间，即0x0000 - 0xffff 之间.
参数为空或NaN时， 默认参数为0； 当参数超出范围时， 则返回NaN */
var str = "hello";
console.log(str.charCodeAt()); //104
console.log(str.charCodeAt(0)); //104
console.log(str.charCodeAt(1)); //101
console.log(str.charCodeAt(-1)); //NaN
console.log(str.charCodeAt(10)); //NaN
console.log(str.charCodeAt(NaN)); //104
// charCodeAt()同样涉及Number()的隐式类型转换
console.log(str.charCodeAt(true)); //101
console.log(str.charCodeAt(false)); //104
console.log(str.charCodeAt('abc')); //104
console.log(str.charCodeAt({})); //104
console.log(str.charCodeAt([2])); //l08

// 字符串拼接
// 关于字符串拼接共有concat() 和加号 + 两种方法
/* concat() 方法用于将一个或多个字符串拼接起来， 返回拼接得到的新字符串， 而原字符串不发生改变。 
若参数(第一个参数除外) 不是字符串， 则通过String() 方法隐式转换为字符串， 再进行字符串拼接 */
var stringValue = 'hello ';
var result = stringValue.concat('world', '!');
console.log(result); //'hello world!'
console.log(stringValue); //'hello'
// [注意] 第一个参数只能是字符串， 如果是其他类型(数组除外) 则报错
(1).concat('2'); //报错
(true).concat('false'); //报错
({}).concat('abc'); //报错

// 字符串拼接
// 关于字符串拼接共有concat() 和加号 + 两种方法
/* concat() 方法用于将一个或多个字符串拼接起来， 返回拼接得到的新字符串， 而原字符串不发生改变。 
若参数(第一个参数除外) 不是字符串， 则通过String() 方法隐式转换为字符串， 再进行字符串拼接 */
var stringValue = 'hello ';
var result = stringValue.concat('world', '!');
console.log(result); //'hello world!'
console.log(stringValue); //'hello'
// [注意] 第一个参数只能是字符串， 如果是其他类型(数组除外) 则报错
(1).concat('2'); //报错
(true).concat('false'); //报错
({}).concat('abc'); //报错

// 创建子字符串
// 创建子字符串共有slice()、substr()和substring()三种方法
/* slice(start, end) 方法需要两个参数start和end， 返回这个字符串中从start位置的字符到(但不包含) end位置的字符的一个子字符串；
如果end为undefined或不存在， 则返回从start位置到字符串结尾的所有字符 */
var stringValue = 'hello world';
console.log(stringValue.slice()); //'hello world'
console.log(stringValue.slice(2)); //'llo world'
console.log(stringValue.slice(2, undefined)); //'llo world'
console.log(stringValue.slice(2, -5)); //'llo '
console.log(stringValue.slice(2, -20)); //''
console.log(stringValue.slice(20)); //''
console.log(stringValue.slice(-2, 2)); //''
console.log(stringValue.slice(-2, -20)); //''
console.log(stringValue.slice(-2, 20)); //'ld'
console.log(stringValue.slice(-20, 2)); //'he'
console.log(stringValue.slice(-20, -2)); //'hello wor'
// slice()方法涉及到Number()转型函数的隐式类型转换，当start被转换为NaN时，相当于start = 0；
// 当end被转换为NaN时(end为undefined除外)，则输出空字符串
var stringValue = 'hello world';
console.log(stringValue.slice(NaN)); //'hello world'
console.log(stringValue.slice(0, NaN)); //''
console.log(stringValue.slice(true, [3])); //'el'
console.log(stringValue.slice(null, undefined)); //'hello world'
console.log(stringValue.slice({})); //'hello world'
console.log(stringValue.slice('2', [5])); //'llo'
/* substring(start,end)方法需要两个参数start和end，返回这个字符串中从start位置的字符到(但不包含)end位置的字符的一个子字符串；
   如果end为undefined或不存在，则返回从start位置到字符串结尾的所有字符
   如果任一参数是NaN或负数，则被0取代
   如果任一参数大于字符串长度，则被字符串长度取代
   如果start 大于 end，则交换它们的值 */
var stringValue = 'hello world';
console.log(stringValue.substring()); //'hello world'
console.log(stringValue.substring(2)); //'llo world'
console.log(stringValue.substring(2, undefined)); //'llo world'
console.log(stringValue.substring(20)); //''
console.log(stringValue.substring(-2, 2)); //'he'
console.log(stringValue.substring(NaN, 2)); //'he'
console.log(stringValue.substring(-2, 20)); //'hello world'
console.log(stringValue.substring(3, 2)); //'l'
console.log(stringValue.substring(3, NaN)); //'hel'
console.log(stringValue.substring(-20, 2)); //'he'
console.log(stringValue.substring(-20, -2)); //'' 
// 同样地， substring() 方法也涉及到Number() 转型函数的隐式类型转换
var stringValue = 'hello world';
console.log(stringValue.substring(true, [3])); //'el'
console.log(stringValue.substring(null, undefined)); //'hello world'
console.log(stringValue.substring({}, {})); //''
console.log(stringValue.substring('2', [5])); //'llo'
/* substr(start, end) 方法需要两个参数start和end， end代表返回的子字符串的字符个数； 
   该方法返回这个字符串中从start位置的字符开始的end个字符的一个子字符串； 
   如果end为undefined或不存在， 则返回从start位置到字符串结尾的所有字符
   如果start是负数， 则start = max(length + start, 0)
   如果start是NaN， 则相当于start = 0
   如果end是负数或NaN， 则end = 0， 因此会返回空字符串
   start和end无法交换位置
   [注意] 该方法不是ECMAScript标准， 已经被弃用
   [注意] IE8 - 浏览器在处理向substr() 传递负值的情况时存在问题， 它会返回原始的字符串*/
var stringValue = 'hello world';
console.log(stringValue.substr()); //'hello world'
console.log(stringValue.substr(2)); //'llo world'
console.log(stringValue.substr(2, undefined)); //'llo world'
console.log(stringValue.substr(2, NaN)); //''
console.log(stringValue.substr(NaN, 2)); //'he'
console.log(stringValue.substr(20)); //''
console.log(stringValue.substr(-2, 3)); //'ld'
console.log(stringValue.substr(-2, 20)); //'ld'
console.log(stringValue.substr(-20, 2)); //'he'
console.log(stringValue.substr(-20, -2)); //''    
console.log(stringValue.substr(2, 5)); //llo w
// 同样地， substr() 方法也涉及到Number() 转型函数的隐式类型转换
var stringValue = 'hello world';
console.log(stringValue.substr(true, [3])); //'el'
console.log(stringValue.substr(null, undefined)); //'hello world'
console.log(stringValue.substr({})); //'hello world'
console.log(stringValue.substr('2', [5])); //'llo w'
// 大小写转换　　 
// ECMAScript中涉及字符串大小写转换的方法有4个： toLowerCase()、 toLocaleLowerCase()、 toUpperCase()、 toLocaleUpperCase()
/* toUpperCase() toUpperCase() 方法将字符串转换成大写
   toLowerCase() toLowerCase() 方法将字符串转换成小写
   toLocaleUpperCase() toLocaleUpperCase() 方法将字符串转换成大写(针对地区)
   toLocaleLowerCase() toLocaleLowerCase() 方法将字符串转换成小写(针对地区)
   [注意] 在不知道自己的代码将在哪个语言环境中运行的情况下， 使用针对地区的方法更稳妥*/
var string = 'Hello World';
console.log(string.toLowerCase()); //hello world
console.log(string.toLocaleLowerCase()); //hello world
console.log(string.toUpperCase()); //HELLO WORLD
console.log(string.toLocaleUpperCase()); //HELLO WORLD

//查找子串位置　　 
//有两个从字符串中查找子字符串位置的方法： indexOf() 和lastIndexOf()。 
/* indexOf()
   indexOf(searchString, start) 方法接收searchString和start两个参数，返回searchString首次出现的位置，如果没有找到则返回-1
   该方法会隐式调用String() 转型函数， 将searchString非字符串值转换为字符串； 
   隐式调用Number() 转型函数， 将start非数字值(undefined除外) 转换为数值
   searchString表示要搜索的子字符串； start表示该搜索的开始位置， 若忽略该参数或该参数为undefined、 NaN或负数时， start = 0*/
var string = 'hello world world';
console.log(string.indexOf('ld')); //9
console.log(string.indexOf('ld', undefined)); //9
console.log(string.indexOf('ld', NaN)); //9
console.log(string.indexOf('ld', -1)); //9
console.log(string.indexOf('ld', 10)); //15
console.log(string.indexOf('ld', [10])); //15
console.log(string.indexOf('true', [10])); //-1
console.log(string.indexOf(false, [10])); //-1
/* lastIndexOf() 与indexOf() 不同， lastIndexOf() 从右向左查找
lastIndexOf(searchString, start) 方法接收searchString和start两个参数， 返回searchString第一次出现的位置， 如果没有找到则返回-1
同样地， 该方法会隐式调用String() 转型函数， 将searchString非字符串值转换为字符串； 
隐式调用Number() 转型函数， 将start非数字值(undefined除外) 转换为数值
searchString表示要搜索的子字符串； start表示该搜索的开始位置， 若忽略该参数或该参数为undefined、 NaN时， start = length - 1； 
若start为负数， start = 0*/
var string = 'hello world world';
console.log(string.lastIndexOf('ld')); //15
console.log(string.lastIndexOf('ld', undefined)); //15
console.log(string.lastIndexOf('ld', NaN)); //15
console.log(string.lastIndexOf('ld', -1)); //-1
console.log(string.lastIndexOf('h', -1)); //0
console.log(string.lastIndexOf('w', undefined)); //12
console.log(string.lastIndexOf('ld', 10)); //9
console.log(string.lastIndexOf('ld', [10])); //9
console.log(string.lastIndexOf('true', [10])); //-1
console.log(string.lastIndexOf(false, [10])); //-1

// 字符串比较
// localeCompare() 方法用于比较两个字符串， 遵循下列规则
// 1.如果字符串在字母表中应该排在字符串参数之前， 则返回一个负数(大多数情况下为-1)
// 2.如果字符串等于字符串参数， 则返回0
// 3.如果字符串在字母表中应该排在字符串参数之后， 则返回一个正数(大多数情况下为1)
var stringValue = 'yellow';
console.log(stringValue.localeCompare('brick')); //1  'y'> 'b'
console.log(stringValue.localeCompare('yellow')); //0  'yellow' == 'yellow'
console.log(stringValue.localeCompare('zoo')); //-1    'yellow' < 'zoo'

// 去除首尾空格
// ECMAScript5为所有字符串定义了trim() 方法。 这个方法会创建一个字符串的副本，删除前置及后缀的所有空白字符，然后返回结果
// 由于trim() 方法返回的是字符串的副本， 所以原始字符串中的前置及后缀空格会保持不变
// [注意] IE8 - 浏览器不支持
var string = '    hello world   ';
console.log(string.trim()); //'hello world'
console.log(string); //'    hello world   '
// 空白字符不仅仅包括空格， 还包括制表符(\t)、 换行符(\n) 和回车符(\r)
'\r\nabc \t'.trim() // 'abc'

/* split()方法基于指定的分隔符将一个字符串分割成多个字符串，并将结果放在一个数组中，分隔符可以是字符串，也可以是一个RegExp
该方法可以接受第二个参数(可选) 用于指定数组的大小， 如果第二个参数为0 - array.length范围内的值时按照指定参数输出， 
其他情况将所有结果都输出,若指定分隔符没有出现在字符串中，以数组的形式返回原字符串的值*/
var colorText = 'red,blue,green,yellow';
console.log(colorText.split('')); //["r", "e", "d", ",", "b", "l", "u", "e", ",", "g", "r", "e", "e", "n", ",", "y", "e", "l", "l", "o", "w"]
console.log(colorText.split(',')); //["red", "blue", "green", "yellow"]
console.log(colorText.split(',', 2)); //["red", "blue"]
console.log(colorText.split(',', 6)); //["red", "blue", "green", "yellow"]
console.log(colorText.split('-')); //["red,blue,green,yellow"]
console.log(colorText.split(/\,/)); //["red", "blue", "green", "yellow"]
console.log(colorText.split(/e/)); //["r", "d,blu", ",gr", "", "n,y", "llow"]
console.log(colorText.split(/[^\,]+/)); //将除去逗号以外的字符串变为分隔符["", ",", ",", ",", ""],IE8-会识别为[",",",",","]
```
#### Base64 转码

有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。

所谓 Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、`+`和`/`这64个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。

JavaScript 原生提供两个 Base64 相关的方法。

- `btoa()`：任意值转为 Base64 编码
- `atob()`：Base64 编码转为原来的值

```JavaScript
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"
```

注意，这两个方法不适合非 ASCII 码的字符，会报错。

```JavaScript
btoa('你好') // 报错
```

要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

```JavaScript
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```