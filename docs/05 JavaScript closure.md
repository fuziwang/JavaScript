### JavaScript预解析

#### JS的解析和执行过程

**代码案例** - 思考：下列代码是否会报错，区别于其他语言。

```javascript
console.log(a);
var a = 2;
conosle.log(a);
```

该代码的输出结果为undefined 2（在c++中这样的代码是会报错的，但是在JavaScript中不会报错，由于发生了预解析的过程）

```javascript
// 从解析器角度看到的代码
var a;
console.log(a);//undefined
a = 2;
console.log(a);// 2
```

**JS的解析和执行过程**

+ 全局预解析阶段（全局变量和函数声明前置）


+ 全局顺序执行阶段（变量赋值、函数调用等操作）


+ 当遇到函数调用时，在执行函数内代码前，进行函数范围内的预解析


+ 当存在函数嵌套时，以此类推，会进行多次函数预解析

```javascript
// example1
console.log(a, b); //undefined undefined 
var b = 23;
console.log(a, b); //undefined 23
var a = b;
console.log(a, b); //23 23

// example2
console.log(obj1, obj2); //undefined undefined
var obj1 = { x: 23 };
console.log(obj1, obj2); //{x:23} undefined
var obj2 = obj1;
console.log(obj1, obj2); //{x:23} {x:23}
obj2.x = 25;
console.log(obj1, obj2); //{x:25} {x:25}

// example3
function foo() {
    console.log("j:", j); // undefined
    var j = 10;
    console.log("j:", j); // 10
}
foo();
console.log("j:", j); // error
```

**预解析主要工作（变量声明和函数声明提升）**

+ 解析器在执行代码前的进行代码扫描（var、function）


+ 将变量和函数声明在当前作用域（全局、函数）内进行提升 

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214829432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

> 注：ES5中函数及变量声明重复的话，后面的函数或者变量会将前面的进行覆盖

**同时有var和function关键字**

+ 情形1：函数表达式

```javascript
// 当function前有运算符的话，认定为表达式，不提升
foo();
var foo = function() {
    console.log("foo");
};
# Uncaught TypeError: foo is not a function
#    at <anonymous>:1:1

// 上述代码等价于
var foo;
foo();// error
foo = function(){
  	console.log("foo");
};
```

练习：

```javascript
console.log(foo);// undefined
var foo = function() {
    console.log("foo");
};
foo();// foo

// 上述代码等价于
var foo;
console.log(foo);// undefined
foo = function(){
  	console.log("foo");
};
foo();// 函数会将变量进行覆盖 foo
```

+ 情形2：变量名同函数名

```javascript
AA();
function AA() {
    console.log("AA_1");
}
var AA = function() {
    console.log("AA_2");
};
AA();

// 上述代码等价于
function AA() {
    console.log("AA_1");
}
var AA;// 在最顶端和在这是等效的 函数会将变量进行覆盖
AA();// AA_1;
AA = function(){
  	console.log("AA_2");
};
AA();// AA_2
```

#### 预解析与作用域

**静态词法作用域（重要）**

```javascript
var name = "Jack";
function echo() {
    console.log(name); // 此时的name指向了Jack之后不会再改变
}
function foo() {
    var name = "Bill";
    echo();
}
foo(); //Jack
```

JS采用的是静态词法作用域，代码完成后作用域链就已形成，与代码的执行顺序无关

**全局变量与局部变量**

+ 全局变量：拥有**全局作用域**的变量（JS代码中任何地方都可以访问）


+ 全局变量是跨域了所有函数自身作用域的自由变量，可以在函数内和函数外直接访问


+ 局部变量：函数内声明的变量，只在函数体内有定义，**作用域是局部性的**


+ 在函数外不能直接访问函数的局部变量，但可以通过**闭包**来访问


+ 函数内访问同名变量时，局部变量会覆盖全局变量

```javascript
//example1 访问全局变量 x === window.x
var x = "outside f1";
var f1 = function() {
     console.log(x);
};
f1(); // outside f1
console.log(x); //  outside f1

//example2 局部变量会覆盖全局变量
var x = "outside f1";
var f1 = function() {
	var x = "inside f1";
  	console.log(x);
};
f1(); // inside f1
console.log(x); //  outside f1

//example3 局部变量的作用域就在局部
var f2 = function() {
    var y = "局部";
    console.log(y);
};
f2(); // '局部'
console.log(y); //报错

//example4 在函数里不加var声明的变量默认都是全局变量
var f2 = function() {
    y = "全局";
    console.log(y);
};
f2(); // "全局"
console.log(y); //"全局"
```

**声明前置与作用域的关系（全局作用域、函数作用域）**

```javascript
// 声明前置与作用域的关系
if (true) {
    var i = 0;
}
console.log(i);
// 等价于
var i;
if (true) {
    i = 0;
}
console.log(i); //ES5 中没有块级作用域 0
```

### JS作用域及其特点

#### JS作用域

+ 作用域就是**变量与函数的可访问范围**（变量生效的区域范围，即在何处可以被访问到）


+ 作用域控制着**变量与函数的可见性和生命周期**，它也是根据名称查找变量的一套规则


![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214850474.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

上述实例（嵌套作用域）中：

变量d只能在bar作用域中被访问到，变量c只能在fn和bar作用域中被访问到

在bar中访问a时为500（**覆盖性**）在bar中访问c时为200（**链式关系**）

```javascript
var a = 10,
    b = 20;

function fn() {
    var a = 100,
        c = 200;
    //console.log(a,b,c,d); 报错由于此时的d还没有定义
    function bar() {
        //bar局部作用域
        var a = 500,
            d = 600; // 若此句该为var a = 500;b = 600;则此时的b相当于是全局变量
        console.log(a, b, c, d); // 500 20 200 600
    }
    bar();
}
fn();
//console.log(a,b,c,d); // 报错 c d此时都没有定义
```

#### JS作用域特点

**词法作用域**

+ JS采用的是**词法作用域（静态性）**，这种静态结构决定了一个变量的作用域


+ 词法作用域不会被函数从哪里调用等因素影响，与调用形式无关（体现了静态性）

注意：词法作用域主要确定变量的具体内容

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214901488.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ 通过**new Function**创建的**函数对象**不一定遵从静态词法作用域


+ 对比下边两个例子（通过不同形式定义的函数对象，访问到的scope的区别）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214910243.png)
**关于块作用域** 

+ 大多数语言都有块级作用域，变量“存活”在最近的代码块中，比如Java中


+ JS（ES5）采用的是函数级作用域，**没有块作用域**


+ 无块作用域的问题（变量污染、变量共享问题）变量污染、变量共享问题,尤其是异步执行的情况下。如果是两个单独的文件的情况下，更容易造成变量污染

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214918705.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### JS执行上下文与调用栈（Call Stack）

#### 执行上下文

+ 执行上下文指代码执行时的**上下文环境**（包括局部变量、相关的函数、相关自由变量等）


+ JS运行时会产生多个执行上下文，处于活动状态的执行上下文环境只有一个

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214929253.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

#### 理解执行上下文

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214937122.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126214951305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215000106.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)
JS运行时会产生多个执行上下文，处于活动状态的执行上下文环境**只有一个**

**练习：**

```javascript
//理解执行上下文（通俗的例子）,嵌套的情况
var xx = ["书桌","书包","铅笔盒"];//小明家中
console.log("在家-做作业中 1 ...");
function goToStore(){
    var yy = ["文具店老板","出售的文具"];//文具商店中
    console.log("在文具店-买文具中  ...");
    function goToBank(){
        var zz = ["银行职员","柜员机"];//银行中
        console.log("在银行-取钱 ... 返回文具店");
    }
    console.log("在文具店-买文具中  ... 发现没带钱");
    goToBank();
    console.log("在文具店-买好文具  ... 返回家");
}
console.log("在家-做作业中 2 ... 发现笔没油了");
goToStore();//笔没油了，去商店买笔
console.log("在家-继续做作业...");
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215013313.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

#### 调用栈（Call Stack）

+ 代码执行时JS引擎会**以栈的方式来处理和追踪函数调用**（函数调用栈 Call Stack）


+ 栈底对应的是**全局上下文环境**，而栈顶**对应的是当前正在执行的上下文环境**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215022619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215032178.png)

#### 作用域链与执行上下文

**理解代码执行时形成的作用域链（继续小明的例子）**

+ 如果有多个文具店和多个银行，那么执行就有多种可能，形成不同的链式关系


+ 依然要遵从**静态词法作用域**（在A文具店，应该有A店老板，而不应有B店老板）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215042366.png)

**作用域链与执行上下文**

+ 执行时，当前执行上下文，**对应一个作用域链环境来管理和解析变量和函数（动态性）**


+ 变量查找按照由内到外的顺序（遵循词法作用域），直到完成查找，若**未查询到则报错**


+ 当函数执行结束，**运行期上下文被销毁，此作用域链环境也随之被释放**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215054143.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### JS的立即执行表达式IIFE

#### 什么是IIFE以及其使用方式

+ IIFE英文全称：Immediately-InvokedFunction Expression即立即执行的函数表达式


+ IIFE的作用（建立函数作用域，解决ES5作用域缺陷所带来的问题，如：**变量污染、变量共享**等问题）

**IIFE的写法**

使用小括号的写法（最常见的两种）

+ `(function foo( x,y){ ... }(2,3));`  //2,3为传递的参数


+ `(function foo(x,y){ ... })(2,3);` 

```javascript
(function count(arr){
  	console.log(arr.length);
})([1,2,3,4]); // 4

// 括号位置的不同
(function count(arr){
  	console.log(arr.length);
}(1,2,3,4));// 4
```

注意：IIFE是表达式，要注意使用分号结尾，否则可能出现错误

```javascript
(function() {
    console.log("111");
})()//没有分号的话会报错
(function () {
    console.log("222");
})()
# Uncaught TypeError: (intermediate value)(...) is not a function
#    at <anonymous>:4:1
```

与运算符结合的写法（执行函数、进行运算）

```javascript
var i = function( ){ return 10; }( ); //i为10
true&& function( ){  ... }( );
~function(arg1,arg2){ ... }(x,y); //x,y为传递参数 位运算非操作符
!function( ){ ...  }( );//思考!function(){return 2; }( ); 与 !function(){return 0; }( );
```

在上述的式子中，IIFE是一个表达式，类似于我们所说的a=2；执行的时候要注意是立即执行，因此function( ){  ... }( );的结果就是返回值

```javascript
! function() { return2; }();  // fasle
! function() { return0; }(); // true
```

练习下列例子：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215107499.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

#### 通过IIFE来解决的问题（JS缺陷）

**变量污染问题**

+ JS（ES5）中没有块作用域，容易造成js文件内或文件间的**同名变量互相污染**


+ 我们往往会通过IIFE引入一个新的作用域来限制变量的作用域，来避免变量污染

![在这里插入图片描述](https://img-blog.csdnimg.cn/2018112621512033.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

**变量共享错误**

+ 当程序运行到变量所在作用域时，变量被创建，JS（ES5）没有块作用域，变量可能会共享

如下例：

在函数作用域中创建的变量 i 只有一个，出现了变量 i 共享问题，可通过IIFE解决

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215130301.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

在程序的执行过程中，程序会先执行循环，之后i的值就变为了10，再每一次调用函数数组的函数时，输出的结果都是10，因此需要使用立即执行表达式来解决这个问题

代码调试过程图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215140921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

通过立即执行表达式解决问题：

```javascript
function f(){
    var getNumFuncs = [];//函数数组
    for(var i=0;i<10;i++){
        (function (j) {
            getNumFuncs[j] = function(){return j;};
        })(i);
    }
    return getNumFuncs;//设置断点，查看变量共享问题
}
var tmp = f();
tmp[3]();
```

注意：上述的代码中的也是先执行循环，但是在执行循环的时候，程序将每一个i的值都传入到了创建的是个作用域的一个中，实现了i值的传入，i为实参，j为形参。

#### IIFE实际应用案例 

**案例一**

```javascript
var tabs = document.getElementsByClassName('tabs')[0].children;
var contents = document.getElementsByClassName('show')[0];

for(var i=0;i<tabs.length;i++) {
    //(function (i) { 	//IIFE start
        tabs[i].onclick=function(){
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].className = '';
            }
            this.className = "active";
            contents.innerHTML = "导航" + i + "内容";
        };
    //}(i));			//IIFE end
}
```

tab的length为4，由于变量共享在同一个作用域下，所以变量 i 只有一个，并最终i为4，所以点击任何标签，都输出“点击了4”

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215204673.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

避免闭包中非期望的变量共享问题，解决方式 IIFE

```javascript
var tabs = document.getElementsByClassName('tabs')[0].children;
var contents = document.getElementsByClassName('show')[0];

for(var i=0;i<tabs.length;i++) {
    (function (i) { 	//IIFE start
        tabs[i].onclick=function(){
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].className = '';
            }
            this.className = "active";
            contents.innerHTML = "导航" + i + "内容";
        };
    }(i));			//IIFE end
}
```

tab的length为4，立即执行了4次函数，有4个函数作用域，所以变量 i 生成了4次，所以点击时能正常输出1到4

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215215984.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

**案例二**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215225784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

通过立即执行表达式可以实现

```javascript
for (var i = 0; i < 5; i++) {
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000*i);
    })(i);
}
```

### JS闭包

#### 闭包的概念

**闭包（引入案例）**

思考：函数内的局部变量，是否能在函数外得到（按照常理来说是没有办法进行访问的）

有什么方法能读写函数内部的局部变量？

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215237109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

**闭包（closure）的概念**

+ 闭包是由**函数和与其相关的引用环境**组合而成的实体（函数和它所在的作用域的变量）


+ 闭包是**词法作用域**中的函数和其相关变量的包裹体

```javascript
function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//输出多少？
console.log(inc(2));//输出多少？
inc = createInc(5);
console.log(inc(1));//输出多少？

# 输出结果
6
8
6
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215249453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
function createInc(startValue){
	return function(step){
		startValue+=step;
		return startValue;
	}
}
var inc = createInc(5);
console.log(inc(1));//输出多少？ 6
console.log(inc(2));//输出多少？ 8
var inc2 = createInc(5);
console.log(inc(1));//输出多少？ 9
console.log(inc2(1));//输出多少？ 6
```

根据上述代码，可以写出下列的图示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215301422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

若一个函数离开了它被创建时的作用域，它还是会与这个作用域的变量相关联

**闭包是一个函数外加上该函数创建时所建立的作用域**

```javascript
function foo() {
    var i = 0;
    function bar() {
        console.log(++i);
    }
    return bar;
}
var a = foo();
var b = foo();
a();//输出多少？ 1
a();//输出多少？ 2
b();//输出多少？ 1
```

1. 函数bar和其相关词法上下文中的变量i，构成了一个闭包
2. 返回的函数bar，依然能够访问到变量i（藕断丝连）

> a和b对应的是否为同一个闭包？ // a 和 b对应的不是同一个闭包
>
> 思考：foo和它相关作用域的变量是否形成闭包？//foo和它相关的作用域的变量也会形成一个闭包

#### 闭包的常见形式

**以函数对象形式返回**

```javascript
var tmp = 100;// 注意：词法作用域，形成的闭包是否包含此行的tmp 不包含
function foo(x){
  	var tmp = 3;// 思考：若屏蔽此行，则又会输出多少？
  	return function(y){
  		console.log(x + y + (++tmp));
	}
}
var fee = foo(2);
fee(10);// 16
fee(10);// 17
fee(10);// 18
```

上述代码中`fee` 形成了一个闭包，闭包包含一个函数对象以及`tmp`（其中tmp是3，不是100，tmp = 100是自由变量，全局变量）和`x`变量

+ 思考：若屏蔽此行，则又会输出多少？

```markdown
113
114
115
```

+ 思考：此实例中fee函数对象相关作用域的变量都有哪些？形成的闭包是否包含foo函数之外（即第一行）的自由变量tmp？foo中的tmp是否调用后就释放？

```markdown
答：包含tmp和x 不包含自由变量tmp
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215316189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
function foo(x){
  	var tmp = 3;
  	return function(y){
      	x.count = x.count ? x.count+1 :1;
      	console.log(x + y + tmp,x.count);
	}
}
var age = new Number(2);
var bar = foo(age);
bar(10);// 15 1
bar(10);// 15 2
bar(10);// 15 3
```

+ 思考：此实例中bar函数对象相关作用域的变量都有哪些？（tmpx）foo中的tmp是否调用后就释放？（不会释放，会常驻内存中）

**作为对象的方法返回**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215326775.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ 对于c来说的count和reset和n都是构成了两个闭包


+ 对于d来说的count和reset和n都是构成了两个闭包

#### 闭包的作用及常用场景

**闭包的作用**

+ 可通过闭包来访问隐藏在函数作用域内的局部变量


+ 使函数中的变量被保存在内存中不被释放（单例模式）

```javascript
var n = 10;
function f1(){
  	var n = 999;
  	nAdd = function(){n+=1;};
  	function f2(){
  		console.log(n);
	}
  	return f2;
}
var result = f1();
result();// 999
nAdd();
result();// 999
```

上述实例中，无法在f1函数外直接得到局部变量n的999的值，可以通过闭包间接的在f1函数外访问和修改n

> 注意：上述中nAdd不在result对应的闭包里面！

因此将代码进行修改可得：

```javascript
var n = 10;
function f1(){
  	var n = 999;
  	nAdd = function(){n+=1;};
  	function f2(){
  		console.log(n);
	}
  	return f2;
}
var result = f1();
var result1 = f1();
result();// 999
nAdd();
result1();// 1000
result();// 999
```

> 其中nAdd不在f1所对应的闭包里面，因此在对result1()进行调用的时候，则会对n的值进行改变，但是对于result()的调用结果不会发生改变。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215339935.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

**闭包的实际应用案例**

+ 案例分析一：创建结点（单例模式）

比如说我现在的需求是这样的，在网页中有时候会需要遮罩层，调用的时候我就创建一个，但是你不可能每次调用创建，所以如果存在就用以前的，如果不存在就创建新的

```javascript
function fn(){
  	var a;
  	return function(){
  		return a || (a = document.body.appendChild(document.createElement('div')));
	}
};
var f = fn();
f();
```

定时与节点，闭包应用案例 2秒后执行，由于闭包所以objID此时还存在

虽然有时没有直接用，但闭包无时无刻不存在

```javascript
function closureExample(objID,text,timedelay){
  	setTimeout(function(){
  		console.log(objID,text);
	},timedelay);
}
closureExample("mydiv","Closure is Create",2000);
```

**闭包的注意事项**

+ 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包


+ 使用闭包时要注意不经意的变量共享问题，可以通过立即执行表达式来解决

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181126215350732.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)