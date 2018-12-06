### JS对象及继承方式综述

#### JS对象知识回顾

+ JS对象是若干无序属性的集合（数据属性、访问器属性、内部属性）


+ 生成对象的3种方式：字面量直接生成、`Object`工场方法、构造函数实例化对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201520982.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

在上述的过程中，有一个`Person.protorype.sayHi`是给原型添加`sayHi`方法。

**注意:create方法添加属性**

```javascript
var empty = {};
var obj2 = Object.create(empty, {
    x: { value: 1 },
    y: { value: 2, enumerable: true }
});
console.log(obj2); 
//返回的是自身的属性， 包括不可枚举属性， 但是会先返回可枚举属性， 之后返回不可枚举属性， 但是不可以返回继承的属性
console.log(obj2.hasOwnProperty("x"));// true
```

其中的`console.log(obj2)`，返回的是自身的属性，包括不可枚举属性，但是会先返回可枚举属性，之后返回不可枚举属性，但是不可以返回继承的属性。

#### JavaScript语言继承方式

+ JavaScript采用的是**原型的继承方式**，每个对象都有一个原型对象，最原始的原型是**null**


+ JavaScript的继承是对象-对象的原型继承，为面向对象提供了动态继承的功能


+ 任何方式创建的对象都有原型对象，可以通过对象的 `__proto__`属性来访问原型对象

```javascript
var obj = { num: 10 };
console.log(obj.__proto__ === Object.prototype); // true
var newObj = Object.create(obj);
var newObj2 = Object.create(obj); //多个对象同一个原型的情况
newObj.age = 23;
console.log(newObj.__proto__ === obj); // true
console.log(newObj2.__proto__ === obj); // true

// 思考
console.log(newObj.__proto__.__proto__); //Object.prototype
console.log(newObj.__proto__.__proto__.__proto__); //null
```

上述的关系可以用以下图示来反映：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201533474.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### JS对象的原型链

```javascript
/*JS对象的原型链*/
var proObj = { z: 3 };
var obj = Object.create(proObj);
obj.x = 1;
obj.y = 2;
console.log(obj.x); //1
console.log(obj.y); //2
console.log(obj.z); //3
console.log("z" in obj); //true in可以从原型链上进行查找
console.log(obj.hasOwnProperty("z")); //false hasOwnProperty不包括继承下来的属性
```

上述的代码可以变换成以下图示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201542212.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
obj.z = 5;
console.log(obj.hasOwnProperty("z")); // true
console.log(obj.z); // 5
console.log(proObj.z); ///3
obj.z = 8;
console.log(obj.z); //8
delete obj.z; //true
console.log(obj.z); //3
delete obj.z; //true 此时会静默失败，由于此时obj本身没有z这个属性，因此将不会删除z
console.log(obj.z); //still 3
//如何删除原型上的属性
delete obj.__proto__.z; //或者delete proObj.z;
console.log(obj.z); //此时彻底没有z了
```

上述的代码可以变换成以下图示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201552191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### 基于构造函数实现的原型继承

#### 通过构造函数来创建对象

+ 当一个函数与new结合，该函数将作为构造函数来使用，用来创建JS对象


+ JS（ES5）中没有其他语言（C++、Java）中的类，JS中通过构造函数来实现类的功能


+ 在JS中构造函数也是对象，有一个重要的属性（原型 prototype），该属性与继承相关

```javascript
/*基于构造函数实现的原型继承*/
function Person(age, name) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function() {
    console.log("Hi,i'm " + this.name); // 此时的this指向的还是当前的对象即p1对象
};
var p1 = new Person(20, "Jack");
console.log(p1.name);// Jack
console.log(p1.age);// 20
p1.sayHi();// Hi,i'm Jack
```

上述的代码可以转换为以下图示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201614685.png)

+ 构造函数有一个重要属性（原型`prototype`），该属性就是实例化出来的对象的原型


+ 构造函数的这个属性（原型 `prototype`）是真实对象，实例化的对象通过它实现属性继承
+ 可通过实例化出来的对象的`__proto__`属性来确认原型


+ 实例化的这个对象，有一个属性`__proto__`指向原型


+ 通过判断得知实例化出来的对象的`__proto__`就是构造函数的`prototype`属性

#### 基于构造函数实现的原型继承以及原型链的图解

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201622961.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

注意上述的**constructor**

`constructor`是定义在原型上的，可以通过`p1`的`constructor`属性来访问`p1`对象的构造器，但是实质上是`p1`的原型中的`constructor`属性。

```javascript
console.log(p1.__proto__ === Person.prototype); // true

Person.prototype.constructor
ƒ Person(age, name) {
    this.name = name;
    this.age = age;
}
```

#### 基于构造函数实现的原型继承-属性操作

![在这里插入图片描述](https://img-blog.csdnimg.cn/2018120620163375.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201641624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### JS对象-对象原型继承

#### JavaScript的原型继承是对象-对象的继承

+ 每个**对象都有一个原型对象**（可动态的指定原型，来改变继承关系，最原始的原型是null）


+ 思考并回答三种方式创建的对象的原型都是什么？


+ 多个对象继承于一个原型时，存在原型共享（节省内存如共享方法，但也带来了**共享**问题）

```javascript
//通过Object.create静态方法创建的对象的原型共享问题
var superObj = {
    x: 1,
    y: 2
};
var subObj_First = Object.create(superObj);
var subObj_Second = Object.create(superObj);
subObj_First.__proto__.x = 5; //若此行写为subObj_First.x = 5;结果又是如何？
console.log(subObj_Second.x);
```

上述代码中，通过`Object`静态方法创建了两个空对象，其中两个空对象的原型都是`superObj`，两个对象共享变量x和y，通过`subObj_First.__proto__.x = 5;`改变原型的x的属性的值，因此在`subObj_Second.x`访问x时，自身没有这个属性，会找到原型，输出5。

#### 构造函数实现的对象-对象的原型继承的原型共享问题

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.age = 22;
Person.prototype.showName = function() { console.log(this.name); };

function Student(id) {
    this.id = id;
}
//var p1 = new Person("Mike");Student.prototype = p1;
Student.prototype = new Person("Mike");
var s1 = new Student(2017001);
var s2 = new Student(2017002);
```

上述的代码可以转化为下列图示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201653332.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

上述代码的原型共享问题很严重，有弊端。

```javascript
//测试如下代码，思考为什么，这样的继承有什么弊端
console.log(s1.name, s1.age, s1.id);
console.log(s2.name, s2.age, s2.id);
s1.__proto__.name = "Jack";
console.log(s2.name);
s2.__proto__.__proto__.age = 99;
console.log(s2.age);
/*
输出结果：
Mike 22 2017001
Mike 22 2017002
Jack
99
*/
```

两个对象的name都是从person里面的name得到的，显然对于一个学生来说应该只有一个name，并且age都是唯一的，但是该代码没有实现。如果给每一个对象都添加一个name和age，会造成内存的浪费，怎么解决的呢？

### 通过构造函数模拟类-类的继承

#### 模拟类-类继承的形式一 

```javascript
//JS实现继承的形式 一
function Person(name, age) {
    this.name = name;
    this.age = age;
};
Person.prototype.showName = function() { console.log(this.name); };

function Student(name, age, id) {
    Person.call(this, name, age);
    this.id = id;
}
Student.prototype.__proto__ = Person.prototype;
var s1 = new Student("xxx", 22, 2017001);
var s2 = new Student("www", 23, 2017002);
```

上述的代码可以转化为如下图所示的内容：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2018120620170618.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

思考：name属性添加到哪个对象上了？`Person.prototype、Student.prototype`还是实例化的对象上？ `Name`添加到了实例化的对象上

推荐：将方法添加到对象的原型上（即构造函数的`prototype`上）**便于共享，节省内存**

#### 模拟类-类继承的形式二 

```javascript
//JS实现继承的形式 二
function Person(name, age) {
    this.name = name;
    this.age = age;
};
Person.prototype.showName = function() {
    console.log(this.name);
};

function Student(name, age, id) {
    Person.call(this, name, age);
    this.id = id;
}
Student.prototype = Object.create(Person.prototype); // 形成继承关系
// console.log(Person.prototype.constructor); //
// console.log(Student.prototype.constructor); //
Student.prototype.constructor = Student; // 把指飞的constructor指向正确的内容
var s1 = new Student("xxx", 22, 2017001);
var s2 = new Student("www", 23, 2017002);
```

思考：如果不把`Student.prototype.constructor`指回`Student`，那它将指向谁？

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201722640.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

如果不指定那么Student.prototype.constructor就会指飞。

上述的代码可以转换为一下图示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206201730748.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### JS继承补充部分

#### 静态方法与原型方法的区别

+ 静态方法是**构造器函数对象**（类）的方法，原型方法是实例化对象（对象）的原型的方法


+ 使用形式有什么不同，区别在哪里？（属性共享）


+ 思考`Object.getPrototypeOf(...)`与`Object.prototype.isPrototypeOf(...)`

```javascript
//静态方法实例与原型方法实例
var BaseClass = function() {};
BaseClass.prototype.f2 = function() {
    console.log("This is a prototype method ");
};
BaseClass.f1 = function() { //定义静态方法
    console.log("This is a static method ");
};
BaseClass.f1(); //This is a static method
var instance1 = new BaseClass();
instance1.f2(); //This is a prototype method
```

#### 再谈对象原型的constructor属性

+ 因为对象实例从原型中继承了constructor，所以可以通过constructor得到**实例的构造函数**

**（1）确定对象的构造函数名**

```javascript
function Foo() {}
var f = new Foo();
console.log(f.constructor.name);
```

**（2）创建相似对象**

```javascript
function Constr(name) {
    this.name = name;
}
var x = new Constr("Jack");
var y = new x.constructor("Mike");
console.log(y);
console.log(y instanceof Constr);
```

**（3）constructor可用于指定构造函数**

```javascript
function Person(area) {
    this.type = 'person';
    this.area = area;
}
Person.prototype.sayArea = function() {
    console.log(this.area);
};
var Father = function(age) {
    this.age = age;
};
Father.prototype = new Person('Beijin');
console.log(Person.prototype.constructor); //function person()
console.log(Father.prototype.constructor); //function person()
Father.prototype.constructor = Father; //修正constructor指向
console.log(Father.prototype.constructor); //function father()
var one = new Father(25);
```

#### 对象的公有属性、私有属性（回顾闭包）

涉及到访问私有属性时，需将间接访问私有变量的函数定义在构造函数中

```javascript
//公有属性、私有属性、特权方法
function A(id) {
    this.publicId = id;
    var privateId = 456;
    this.getId = function() {
        console.log(this.publicId, privateId);
    };
}
var a = new A(123);
console.log(a.publicId);
// console.log(a.privateId);
a.getId();
```

在调用`getId`方法的时候，会访问到`privateId`，因此形成了闭包