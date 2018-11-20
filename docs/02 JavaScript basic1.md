### JavaScript基础语法

#### JS语句与语句块

+ 语句语法
  + 每一条语句都要以`;`结束
  + 一条语句必须在同一行内，不能换行
  + 每一条语句都要独占一行（编码规范）
  + JS语句是JavaScript程序的基本组成单位


+ JS语句块
  + 一组相关的代码的集合
  + 用{ }括起来的一些语句组成语句块
  + 用在流程控制、函数或对象中
  + JavaScript代码的执行次序与书写次序相同

**JavaScript中的{ }语句块的二义性**

详细内容请查看文章：https://www.jb51.net/article/80127.htm

```javascript
// JavaScript中的{}语句块的二义性

/* {}语句块一般包含两个含义
1. 表示语句块，由于JavaScript在ES5中没有块级作用域，因此写法是无辜的
2. 对象字面量，创建对象的时候 */
var max = function(x, y) {return x>y?x:y;}; 
{
    foo: max(2, 3) //{}语句块这个代码JavaScript将语句作为label语句进行解析，因此不会报错 3,作为语句进行执行了不在作为了对象执行
}

{
    foo: max(2, 3),
    name: 'Lily' // 程序报错，原因这里产生二义性 {}，没有被认为是对象字面量，而是被认为是代码块
    //这样为什么会报错？这不是对象字面量的写法吗？
	// 因为javascript中{}的二义性，{}不仅仅被认为是对象字面量而且还会被认为是代码块。
    // 一个代码块，两条label语句，如果没有逗号，是完全没有问题的，所以关键在于逗号，两条语句的分隔应该使用分号，所以javascript会判定这是语法错误
}

{
    console.log('JavaScript'); // {}被认为是语句块，因此照常输出 JavaScript
    foo: max(2, 3); // 3
}

({
    foo: max(2, 3),
    name: 'Lily' 
})// 正确的写法
```

#### JS语句分类

+ 表达式语句、复合语句、条件语句(if-else、switch)、循环语句（for、for...in）


+ ES5中的块（ES5中没有块作用域，所以带来了很多问题）

```javascript
// example1
{
  var a = 20;
}
console.log(a);//输出结果为20，没有块作用域
//example2
if(true){
  	var a = 20;
}
console.log(a);//输出结果为20，没有块作用域
//example3
if(false){
  	var b = 30;
}
console.log(b);//输出结果为undefined，b是一个没有值的变量。
// ES5中没有块作用域
for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}
console.log(i);// 虽然i是局部变量，但是i的值，仍旧被记录下来 5

//扩展知识在chrome中测试下述代码： var a,b = 3;  与 var a = b = 3;   谁是局部变量，谁是全局变量？
function foo() {
    var a = b = 3; // 类似于var a; b = 3;其中a是局部变量，b是全局变量
    var a,b = 3;// a,b都是局部变量，因此所以都会报错
}
foo();
console.log("b:", b); //输出3，全局变量
console.log("a:", a); //报错，局部变量
```

#### JS注释

程序中不会被认为代码执行的内容，通常用于对代码进行解释提高代码可读性

+ 单行注释 `//` 可以嵌套//  或  `/*..*/`


+ 多行注释 `/* */`  不可以进行嵌套`/*...*/` 可以嵌套//

### JavaScript变量

#### JS标识符的用法

+ 标识符用来给变量或函数进行命名，以字母、下划线或$为开始（不可以以数字开头）

```txt
/* 声明（创建）变量 */
使用var关键词 var 变量的名字 = '初识值'
通常变量声明的时候同时赋予初值
/* 变量声明 */
变量名称中可以包含：数字、字母、_(下划线)和$
变量可以以字母、_(下划线)和$开头（一般以字母开头，也可以用_（下划线）和$开头但是w3c并不建议这么做）
变量名称对大小敏感，区分大小写
```

#### 字面量、保留字

+ 对象字面量 `var obj ={x:12，y:23};`


+ 数组字面量 `var arr =[1,2,true,'xyz'];`


+ 保留字：arguments、break、case、catch、class、const等
  + 关于arguments的用法请查看文章：https://www.cnblogs.com/caoyc/p/5735299.html

```javascript
// 在进行变量命名时不能使用保留字，例如 arguments、break、case、catch、class、const
// arguments 用法：arguments是一个对应于传递给函数的参数的类数组对象
function f(a) {
    console.log(a); // 1
    console.log(arguments); // Arguments(3) 是一个类对象数组，将传入的所有参数保存在一个数组中
    console.log(arguments[0]); // 1
    console.log(arguments[1]); // 2
    console.log(arguments[2]); // 3
}
f(1, 2, 3);
```

### JS的数据类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181120093342532.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

#### JavaScript数据类型分类

JavaScript（ES5）数据类型（6种）及其划分（2类）

+ 基本（原始）类型（Number、String、Boolean、Null、Undefined）


+ 引用（对象）类型（Object（Array、Function、Date、Error等））

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181118190258717.png)            

#### 数据类型检测方法（typeof、instanceof）

+ `typeof`（判断基本类型、函数、对象）


+ `instanceof`（判断对象类型，比如对象数组等等，基于原型链进行判断） 

```javascript
//1、typeof的使用方法：
//原始的数据类型中注意typeof null是object，这个是一个well-known bug
console.log(typeof NaN); //number
console.log(typeof '123'); //string
console.log(typeof false); //boolean
console.log(typeof undefined); //undefined
console.log(typeof null); //object
//引用数据类型typeof是包括两种类型 function object
console.log(typeof function foo() {}); //function
var a = {
    name: 'Lily',
    age: 18,
}
console.log(typeof a); //object
console.log(typeof [1, 2, 3]); //obiect
console.log(typeof Array); //function Array()方法
console.log(typeof Function); //function
console.log(typeof Date); //function
console.log(typeof Number); //String、Boolean 这里有Number() String() Boolean()方法 function
console.log(typeof Math); //定义Math对象时不用Math()方法，因此这里是 Object
console.log(typeof JSON); //object
//2、instanceof的使用方法：
//类型检测 instanceof （左侧操作数为对象，右侧操作数为原型链中的一个类型时，返回为true）
var dog = { name: 'Lily', age: 18, };
console.log(dog instanceof Object); //true 此时的Object必须要大写
var b = [1, 2, 3];
console.log(b instanceof Object); //true
console.log(b instanceof Array); //true
var Person = function() {
    //...
}
var c = new Person();
console.log(typeof Person); //function
console.log(Person instanceof Function);// true
console.log(c instanceof Person); //true;
console.log(c instanceof Object); //true
```

#### 基本类型与引用类型的区别

+ 内存分配方式不同
  + 堆区与栈区、存值与存地址、影响变量的生命周期（自动清除-栈区、垃圾回收-堆区）
  + 函数内定义的基本数据类型的临时变量分配在栈区
  + 引用数据类型的变量的**引用（地址）**存储在栈区或堆区，被引用（指向）的对象存储在堆区

> 思考：对象的属性如果是基本类型，那么该属性是分配在堆区还是栈区
>
> 答案：堆区，因为本身对象就存放在堆区中，因此对应的对象的属性也存放在堆区中

**栈区常用来存储函数局部临时变量，一般数据量较小，堆区常用来存储更为复杂的数据结构的对象**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181118190345752.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
//基本数据类型和引用数据类型的内存分配不同
var a = 10; //a是全局变量 类似于window.a
function foo() {
    var a = 20; //栈区
    var b = '10'; //栈区
    var obj = { name: 'Lily', age: 12 };
    // obj的引用存在栈中，{ name: 'Lily', age: 12 }存在堆中，通过栈中的变量名obj(访问地址)访问
    //栈区自动清除机制
    /* 当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的*/
    //堆区垃圾回收机制
    /* 当我们在程序中创建一个对象时， 这个对象将被保存到运行时数据区中， 以便反复利用（因为对象的创建成本通常较大）， 这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁， 即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。*/
}
```

+ 赋值时不同
  + 赋值、赋引用（地址）、深拷贝与浅拷贝

```javascript
//基本（原始）数据类型与引用（对象）类型的区别 赋值方式不同
//赋值
var str1 = 'a';
var str2 = str1;
str2 = 'b';
console.log(str1, str2); // a b

//赋引用
var obj1 = { v: 12 }; // obj1存放的是引用，引用指向堆区的{v: 12}
var obj2 = obj1; // obj2存放的也是引用，引用指向堆区的{v: 12}
obj2.v = 13; // 通过obj2改变堆区中v值改为13.
console.log(obj1, obj2); // 输出的都是堆区中的内容
obj2 = { v: 14 }; // obj2存放的是引用，只不过此时由堆区中的{v: 12}变为了指向{ v: 14 }，另一个对象
console.log(obj1, obj2); // 输出的结果是两个引用指向的不同堆区的内容
```

+ 判等时的不同
  + 值类型是判断变量的值是否相等（值比较）
  + 引用类型是判断所指向的内存空间是否相同（引用比较）

```javascript
// 值类型判断值是否相同
var a = 100;
var b = 100;
console.log(a == b); //true
console.log(a === b); //true
//引用类型是判断所指向的内存空间是否相同
var c = new Number(200);
var d = new Number(200);
console.log(c == d); // c和d所指向的内存空间不相同 false
console.log(c === d); //false

var a3 = new Number(200);
var b3 = a3;
console.log(a3 == b3); // true 所指向的内存空间相同
console.log(a3 === b3); // true 都是引用类型，指向的内存空间也相同

b3 = new Number(200);
console.log(a3 === b3); // false 所指向的内存空间不相同

//值类型和引用类型综合
var a4 = new Number(200);
var b4 = 200;
console.log(a4 == b4); //true发生了类型转换，a4发生转换，如果b4发生转换，结果还是false
console.log(a4 === b4); //false 两者类型本身就不同

var a5 = { x: 1, y: 2 };
var b5 = { x: 1, y: 2 };
console.log(a5 === b5);
console.log(a5.x === a5.x); //对象属性如果是基本类型内存分配在堆区，比较时是值比较
```

+ 函数参数传递时的不同
  + 按值传递(call by value)
  + 按引用传递(call by reference)

注意：真正决定这几种不同的是数据类型，而不是内存分配方式，内存分配方式决定的是变量的生命周期

```javascript
// 基本（原始）数据类型与引用（对象）类型的区别2 函数参数传递方式不同

// 值传递
var str_a = "Hello World";

function fn_a(arg) {
    console.log(arg); // Hello World
    arg = "Hai";
    console.log(str_a, arg); // Hello World , Hai
};
fn_a(str_a);
console.log(str_a); // Hello World

// 引用传递（所有对引用的操作就是对原来的所指向的数据的操作）
var obj_a = { value: 1 };

function fn_(arg) {
    arg.value = 3; //通过arg改变指向的空间的改变
};
fn_a(obj_a); // 发生引用传递，相当于arg也指向了obj_a所指向的那一块堆区空间{ value: 1 }
console.log(obj_a); // 这时候obj_a是{value:3}
function fn_b(arg) {
    arg = { value: 2 }; //创建了一个新的对象，arg指向新对象
};
fn_b(obj_a); // 发生引用传递，相当于arg也指向了obj_a所指向的那一块堆区空间{ value: 3 }
console.log(obj_a); // 这时候obj_a是{value:3}
```

#### 基本数据类型的值

+ Number类型的值
  + 整数与浮点数
  + NaN、Infinity（正无穷）、-Infinity（负无穷）、+0、-0
  + 注意Math对象的方法

```javascript
// 基本数据类型的值 Number类型
var a1 = 20;
var a2 = 23.4;
console.log(parseInt(a2)); //如果是非数字，则先转换为字符串，然后在转成整型
console.log(parseInt('23.4a')) // 结果为23 
console.log(parseFloat("23.456xy")); //同上，结果为23.456
//注意：parseInt和parseFloat都为全局方法，即window全局对象的方法
console.log(parseInt === window.parseInt);// true
console.log(parseFloat === window.parseFloat);// true

console.log(Math.ceil(a2)); //向上舍入
console.log(Math.floor(a2)); // 向下舍入
console.log(Math.round(a2)); // 标准的四舍五入
a3 = 5e2; //指数形式 5X102
console.log(a3); //500
console.log(typeof Math); //输出是 object

//NaN
var x = Number("xis021"); //试着转成Number类型
console.log(x); //NaN
isNaN(x); //如果x是NaN，则返回true，如果不是NaN，则返回false
typeof NaN; // Number

console.log(Math.log(-1)); //NaN log(e) 函数的自变量中的e必须>0
console.log(Math.acos(2)); //NaN acos(e)  函数的自变量范围在-1 到 + 1 之间。如果 e的范围超出 1.0 函数溢出得NaN
console.log(NaN == NaN); //false本身NaN的值是不同的

//Infinity与-Infinity
var y1 = 2 / 0;
console.log(y1); //Infinity
var y2 = -2 / 0;
console.log(y2); //-Infinity
isFinite(y2); //false，非有限数
isFinite(23); //true，有限数

//0与-0
var z1 = 1 / Infinity;
console.log(z1); //0
var z2 = -1 / Infinity;
console.log(z2); //-0
```

+ String类型的值
  + 空字符、字符和字符串、转义字符
  + 常见的转义字符：

|  \0  | 空字节  |
| :--: | :--: |
|  \n  |  换行  |
|  \’  | 单引号  |
|  \\  |  斜杠  |
| \’’  | 双引号  |

```javascript
// 基本数据类型中string类型的值

// 空字符 空格字符
var a = '';
var b = ' ';

// 使用字面量创建字符串
var str = 'abc/dce/f';

// 常用的方法
var str = "abc_def_ghi_jkl_mn";
str.split("_"); //以数组的形式展示用_分隔的字符串
str.split("_", 2); // 以数组的形式，数量为2个
str.concat("_opq"); //在原有的字符串后面连接_opq,原字符串发生改变
str.substr(4, 7); // 从四号位置截取字符串截取7个字符 原字符串不发生改变
str.substring(4, 7); // 从四号位置截取字符串截取到（但不包括）第7个位置 原字符串不发生改变
str.slice(2); // 从2号开始截取到最后
str.slice(2, 5); // 从2号开始截取到5（但不包括）
str.slice(-2);
str.slice(2, -2);
```

+ Boolean类型的值`true、false`


+ Null与Undefined

```javascript
// undefined和unclear的区别
var a;
alert(a); // undefined
a; // a is uncleared; error
// undefined的两种情况 一种是变量没有初始值的情况 一种是函数没有返回值的情况。
function fee() {
    //没有返回值的情况
}
var a = fee();
console.log(a); //undefined
```

#### 数据类型转换

+ 其他类型转换为Boolean类型

  + 转换方式 `Boolean() value?true：false !!value`   

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181118190402489.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ 其他类型转换为Number类型
  + 转换方式 `Number() +value parseFloat parseInt`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181118190412306.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ 其他类型转换为String类型
  + 转换方式 `String() ''+value value.toString();`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181118190422781.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
//其他类型转换为boolean类型 使用Boolean()函数
console.log(Boolean(undefined));// false
console.log(Boolean(null));// false
console.log(Boolean(0));// false
console.log(Boolean(NaN));// false
console.log(Boolean(1));// true
console.log(Boolean(""));// false
console.log(Boolean("abc"));// true
console.log(Boolean({}));// 对于任何对象转化都是true
if (new Boolean(false)) {
    console.log("执行");
} // 结果为执行，原因是因为if() if判断会自动执行Boolean()函数，对于任何对象转化都是true

//其他类型转化为number类型
console.log(Number(undefined)); // NaN alerting
console.log(Number(null)); // 0
console.log(Number(true));// 1
console.log(Number(false));// 0
console.log(Number(""));//0
console.log(Number("abc"));// NaN
console.log(Number("123.345xx")); //NaN
console.log(Number("32343,345xx")); //NaN
console.log(Number({ x: 1, y: 2 })); //NaN

console.log(parseFloat("123.345xx")); // 123.345
console.log(parseFloat("32343,345xx")); // 32343
console.log(parseInt("123.345xx"));//123
console.log(parseInt("32343,345xx")); //32343

//其他类型转换为string类型
console.log(String(undefined)); //undefined
console.log(String(null));// null
console.log(String(true));// true
console.log(String(false));//false
console.log(String(0));// 0
console.log(String(234));// 234
console.log(String({ x: 1, y: 2 }));// [object] [Object]
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181118190436920.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ 隐式类型转换
  + 使用关系运算符时的转换（==、>、<、引用类型和基本类型比较时）
  + 使用算数运算符时的转换（'img'+ 3 + '.jpg';  “25”-0;）
  + 使用逻辑运算符时的转换（  !!0;  ）
  + 执行流程语句时的转换（if(obj){...}）

```javascript
// 隐式类型转换
var a = 1;
var b = 2;
console.log(a > b, typeof(a > b)); // false boolean

var c = 3 + '2'; //32 3->'3'
var d = '3' - 2 //1 '3'->3

var e = !!a;
console.log(typeof e); // boolean
```

+ 显式类型转换（使代码更清晰）
  + Boolean()、Number()、String()、Object()
  + 数转为字符串（toString()、toFixed()、toPrecision()、toExponential()）
  + 字符串转为数字（parseInt()、parseFloat()）
  + 对象转换为原始值（toString()、valueOf()）

### 包装对象

> **问题的提出**：对于基本数据类型，他们本身就不是对象，可是为什么会有方法和属性呢？
>
> 原因是：因为他们这些基本数据类型都有对应的包装类型

+ 数字、布尔、字符串等**基本数据类型**都有对应的包装对象类型，可以将其包装成对象


+ 临时对象在使用之后立即释放

```javascript
// 包装对象
// 对于包装对象来说，属性不能发生改变
var str = 'abc';
console.log(str.length); // 将str包装成对象，因此有了length属性
str.length = 1; // 属性并没有发生改变
console.log(str, str.length); // 结果为‘abc’ 3

var array = [1, 2, 3, 4];
console.log(array.length); // 4
array.length = 1;
console.log(array, array.length); //对于引用类型要发生改变 [1] 1
```