### 函数的定义和调用

#### 函数简介

+ 代码设计的一个原则：可重复利用，**即执行相同功能的代码应该只定义一次**。


+ JS中的`alert()、parseInt()、console.log()、document.write()`等。


+ 函数：**完成特定功能的一段代码**（主要要实现可重用性，因此对于函数中的代码越多，那么所完成的功能就越多，重用率也就越低，此外要实现任务分解，将一个大的行为，分解成不同的事件函数）

#### 函数的三要素：（函数名，函数参数，函数返回值）

+ 函数名：如alert、 parseInt 、……


+ 函数的参数：传递给函数名的值，代表将被函数处理的数据，如alert ( ‘hello’ )


+ 函数的返回值：函数执行的返回结果，如confirm()，其返回值为true或false

注意：

（1）函数可以有return，也可以没有return，其中有return返回代表着返回return后面的值，没有return代表返回的是一个undefined值。

（2）函数的参数可以有多个，也可以没有。没有则代表undefined，有则存放在arguments类数组对象中

#### 函数的定义

+ 通过函数声明的形式来定义（要有函数名）


+ 通过函数表达式的形式来定义（可以是没有函数名的匿名函数，有名的话方便调用栈追踪）


+ 通过Function构造函数实例化的形式来定义（JS中函数也是对象，函数对象）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181122174137259.png)

```javascript
// 函数的定义方式（三种）

// 第一种：通过函数的声明的方式进行定义
function max(a, b) {
    return a > b ? a : b;
};
max(2, 3) // 3

// 第二种：函数表达式的形式来表现
var max = function(a, b) {
    return a > b ? a : b;
};
max(2, 3); // 3

// 第三种：使用new Function()构造函数的方法
var max = new Function('a', 'b', 'return a>b?a:b'); // 函数参数和函数体
max(2,3);
console.log(Function instanceof Function); // true
console.log(Function instanceof Object); // true
```

补充：具名函数和匿名函数

+ 具名函数

```javascript
var a = 2;
function foo(){
  	var a = 3;
  	console.log(a);//3
}
foo();
console.log(a);//2
```

虽然这种技术可以解决一些问题,但是它并不理想,因为会导致一些额外的问题。首先, 必须声明一个具名函数 `foo()` ,意味着 `foo` 这个名称本身“污染”了所在作用域(在这个例子中是全局作用域)。其次,必须显式地通过函数名`(foo())`调用这个函数才能运行其中的代码。如果函数不需要函数名(或者至少函数名可以不污染所在作用域),并且能够自动运行, 这将会更加理想。
+ 匿名函数

```javascript
var a = 2;
(function foo(){
  	var a = 3;
  	console.log(a);//3
})();
console.log(a)//2
```

函数会被当作函数表达式而不是一个标准的函数声明来处理。 `function`如果出现在声明中第一个词的位置，就是函数声明 函数表达式意味着函数被直接绑定在作用域中，意味着foo只能再被自己代表的位置被调用，不会污染全局作用域。
匿名函数的缺点在于

1. 忽略了代码可读性
2. 在栈追踪中不会显示有意义的函数名，造成调试困难因为没有函数名，所以函数在调用自己时，必须使用过期的`argument.callee`

#### 函数的调用

+ 作为函数直接调用（非严格模式下this为全局对象，严格模式下为undefined）


+ 作为方法调用（`this`为调用此方法的对象）


+ 通过`call()`和`apply(`)间接调用（this为函数对象的call/apply方法的首个参数，移花接木）


+ 作为构造函数调用（this为实例化出来的对象）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181122174149572.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
// 第一种：直接调用
function test(){
  	console.log(this);
}
test();// window

// 第二种：作为对象的方法使用
var x = 45;
var test = function() {
    console.log(this.x);
}
var obj = { x: 23 };
obj.test = test;
obj.test(); // 此时的this指代的是当前对象，因此返回的是23
test(); // test是window下的方法，因此返回的是45

// 对象的方法是嵌套定义的
var x = 45;
var obj = {
    x: 23,
    test: function() {
        function foo() {
            console.log(this.x);
        }
        foo();
    }
};
obj.test(); // 此时的this指代的是window，因此返回的是45

var fun1 = function() {
    return function fun2() {
        return this.x; //若改为 return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
/* fun3是一个函数，就是fun1
    function() {
      return function fun2() {
          return this.x; //若改为 return this;
    }
    fun4是fun1的返回结果
    function fun2() {
        return this.x; //若改为 return this;
    }
*/
console.log(obj.fun3()); //  fun3() 是fun1的返回结果
console.log(obj.fun3()()); // fun3()() 是this.x this是嵌套函数，指代的是window对象，因此为45
console.log(obj.fun4()); // fun4() 是this.x this指代的是obj对象，因此为23

// 方法三：通过call() apply()方法
var obj1 = { name: 'obj1' };
var obj2 = { name: 'obj2' };
obj1.foo = function() {
    console.log(this.name);
}
obj1.foo();// obj1
obj1.foo.call(obj2);// obj2
obj1.foo.apply(obj2);// obj2

// call apply 综合应用
var fish = {
    name: "fish",
    swim: function(m, n) {
        console.log("i'm " + this.name + " i cam swim ___", m, n);
    }
};
var bird = {
    name: "polly",
    fly: function(m, n) {
        console.log("i'm:" + this.name + " i can fly ___", m, n);
    }
};
var me = {
    name: "ABC"
};

bird.fly(5, 6);
fish.swim.call(me, 3, 4); // call在参数传递的时候是散列的传递
bird.fly.apply(me, [7, 8]); // apply在参数传递的时候是数组的形式传递
var name = 11;
bird.fly.apply(null, [7, 8]); // null 指向的是全局主体，就是全局下进行bird.fly方法的调用
```

### 函数的参数和返回值

#### 函数的参数的数量问题

JS函数调用时实参数量可以与形参不一致

+ 实参数量大于形参的情况（通过函数对象属性arguments获得所有实参、类数组对象）


+ 实参数量小于形参的情况（少的参数值为undefined、可使用`||`来给出默认值）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181122174201160.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
// 实参数大于形参数
function test() {
    console.log(arguments);// arguments.callee可以看出调用的函数是谁
    console.log(test.arguments==arguments);//false
    console.log(arguments.length);// arguemnts.length可以展示参数的个数
	console.log(typeof arguments);
	console.log(arguments instanceof Array);//false
	console.log(arguments instanceof Object);
    console.log(Array.prototype.slice.call(arguments));// 可以将参数转化为数组的形式
    var s = "";
    for (var i = 0; i < arguments.length; i++) {
        s += arguments[i];
    }
    return s;
}
test("hello,", "world!");//"hello,world!"


//实参数小于形参数
var sum = function(a,b,c){
    b = b||4;
    c = c||5;
    return a+b+c;
};
console.log(sum(1,2,3));// 6
console.log(sum(1,2));// 8
console.log(sum(1));// 10
conosle.log(sum());// undefined + 4 + 5 NaN
```

#### 参数类型与传递方式（值、引用）

**值传递**

实参为基本数据类型时，形参改变不影响实参（值传递）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181122174217332.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

**引用传递**

实参为引用类型时，形参改变影响实参（引用传递）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181122174227437.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

#### 函数的返回值

+ 返回值可以直接赋予变量或用于表达式中


+ return语句表示结束当前函数的执行，return语句**可以不带表达式**（例如：return;），return语句不带表达式时仍会返回值，该值为**undefined**


+ 函数中可以不出现return语句，**仍会返回值，该值为undefined**

### 函数对象

#### 函数对象的基本概念

+ JS中的函数也是对象，JS中每个函数都是作为对象来维护和运行的，即函数对象（既有属性也有方法）


+ 可以将函数（函数对象）赋值给一个变量，或将函数作为参数进行传递


+ 函数对象对应的类型是Function（类似于数组对象对应于Array、日期对象对应于Date）


+ 如果变量是函数（函数对象）时，typeof此对象，返回function，而非object 


+ 内置的函数对象（Array、Function、Date等），内置的非函数对象（Math、JSON）

```javascript
function foo() {} //创建了一个函数对象
console.log(foo); // 输出函数的内容
console.log(typeof foo); // function
console.log(foo instanceof Object); // true
console.log(foo instanceof Function); // true
console.log(foo === window.foo); // true

console.log(typeof Function); //function
console.log(typeof Array); //function
console.log(typeof Date); //function
console.log(typeof Error); //function
console.log(typeof Math); //Object
console.log(typeof JSON); //Object

// 思考题：
console.log(typeof new Function()); // function
console.log(typeof new new Function()); // object
console.log(typeof new Array()); // object
console.log(typeof new Date()); // object

// 练习：
var Person = new Function();
Person = function(name) {
    console.log(this.name);
}
console.log(Person instanceof Function); // true
console.log(Person instanceof Object); // true
var a = new Person('jake');
console.log(a instanceof Function); // false
console.log(a instanceof Object); // true
```

#### 函数对象的属性

+ length、arguments（隐藏的局部变量）：判断传入的实参数量是否和形参数量一致

```javascript
// length 属性表示形参的个数，arguments.length表示实参的个数
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        console.log("The count of the parameters you passed into the function doesn't match the function definition.");
    } else {
        console.log("Successfully call the function");
    }
}
checkVarCount(1,2);
checkVarCount(1);
```

+ caller、callee（arguments的属性，常用于递归调用）

```javascript
// caller属性代表着追踪是谁调用了该函数，如果该函数.caller == null表示是window下的函数或者没有被调用

// example 1
function test() {
    if (test.caller == null) {
        console.log("test is called from the toppest level");
    } else {
        console.log("test is called from the function:");
        console.log(test.caller.toString()); // 将函数转换为字符串的形式,不加.toString()会将这个函数输出
    }
}
console.log("没有调用的情况下test.caller为：", test.caller); // null
test();  // 最高层次的调用
function testOuter() {
    test();
}
testOuter();

// example2
var obj = {
    foo1: function() {
        console.log(this.foo1.caller);
    },
    foo2: function abc() {
        this.foo1();
    }
};
obj.foo1(); // null 表示没有调用者
obj.foo2(); // foo2()函数

//callee函数 返回正在被执行的function对象，即指定的 Function 对象的正文 -->递归; callee 属性是 arguments 对象的一个成员
//该属性仅当相关函数正在执行时才可用。通常这个属性被用来递归调用匿名函数
var func = function(n) {
    if (n <= 0)
        return 1;
    else
        return n * func(n - 1);//return n * arguments.callee(n - 1);
};
console.log(func(4));

(function func(n){
    if(n<=0){
        return 1;
    }else{
        return n*arguments.callee(n-1);
    }
})(4);
```

+ prototype：获取对象的原型。**每一个构造函数都有一个prototype属性**，指向另一个原型对象。这个原型对象的**所有属性和方法**，都会被构造函数的实例继承。

```javascript
function Man(name, age) {
    this.name = name;
    this.age = age;
}
Man.prototype.sex = "M";
Man.prototype.sayHi = function() {
    console.log("Hi,i'm", this.name);
};
var li = new Man("Leo", 10);
li.sayHi(); //调用原型的方法 Hi,i'm Leo
console.log(li.sex); //M
Man.prototype.isStrong = true; //原型上添加一个属性isStrong
console.log(li.isStrong); //true
```

#### 函数对象的方法

+ call、apply：移花接木，吸星大法，`call`是散列传递，`apply`是数组传递


+ bind：bind 绑定，给函数对象绑定调用的对象实体
+ toString、valueOf

```javascript
// bind 绑定，给函数对象绑定调用的对象实体
var x = 45;
var obj = {
    x: 23,
    test: function() {
        function foo() {
            console.log(this.x);
        }
        foo.bind(this)(); // 23 var fee = foo.bind(this); fee(); 此时的this指向的是obj对象，因此就给foo中的this绑定成obj对象调用
        foo();// 递归调用this指向的是window 因此为45
    }
};
obj.test();

var check = function(value) {
    if (typeof value !== 'number')
        return false;
    else
        return value >= this.minimum && value <= this.maximum;
};
var range = { minimum: 10, maximum: 20 };
var bindCheck = check.bind(range); // 给check这个函数中的this绑定给了range对象，并把函数赋值给bindcheck这个函数对象 绑定的结果是一个函数对象
var result = bindcheck(12); //把bindcheck的结果给了result 相当于range.check(12)
console.log(result); //true

// 该绑定函数将 bind 方法中指定的参数用作第一个参数和第二个参数。在调用该绑定函数时，指定的任何参数将用作第三个、第四个参数（依此类推）
var displayArgs = function(val1, val2, val3, val4) {
    console.log(val1 + " " + val2 + " " + val3 + " " + val4);
};
var emptyObject = {};
var displayArgs2 = displayArgs.bind(emptyObject, 12, "a");
displayArgs2("b", "c"); // Output: 12 a b c
```

### 高阶函数

高阶函数是指至少满足下列条件之一的函数

+ 函数**作为参数**被传递（最常见的形式：回调函数）


+ 函数作为返回值输出（与闭包有紧密联系）

```javascript
// part1 函数作为参数被传递
function add(x, y, f) {
    return f(x) + f(y);
}
add(2, 3, function(z) { return z * z; }); // 13
add(2, -3, Math.abs); // 5
add(2, 3, Math.sqrt); //2的开平方加3的开平方
练习使用高阶函数实现下述公式，要求函数复用
z = 2*(x+1)-3*y*y;
c = 2*a*a-3*(b-1);
k = 2*(i+1)-3(j-1);
function foo(x,y,c1,c2){
    return 2*c1(x)-3*c2(y);
}
function f1(x){
    return x+1;
}
function f2(x){
    return x-1;
}
function f3(x){
    return x*x;
}
foo(1,1,f1,f3);//1
foo(1,1,f3,f2);//2
foo(1,1,f1,f2);//4

var word_2 = "do another thing.";
var function_1 = function(callback) {
    this.word_1 = "do something.";
    console.log(this); // 全局下的函数 window
    console.log(this.word_1); 
    (callback && typeof(callback) === "function") && callback();
};
var function_2 = function() { console.log(this.word_2) }; //function2是一个函数对象
function_1(function_2); // 把函数对象作为参数传入function1函数
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81] map相当于映射

//filter 数组过滤 ，返回为false的将被过滤掉
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function(x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]

// part2:函数作为返回值输出
var x = 12;
var obj = {
    x: 34,
    fun2: function() {
        console.log(this.x, this);
    }
};
var fun1 = function() {
    return function fun2() {
        return this.x; //若改为 return this;
    }
};
obj.fun3 = fun1; // fun3就是一个函数对象，fun3的内容就是fun1的内容
obj.fun4 = fun1(); // fun4也是一个函数对象，fun4的内容是fun1的return的结果
```