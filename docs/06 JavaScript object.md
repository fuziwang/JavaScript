### JS对象简介

#### JS对象是什么

+ JS对象是一种**复合值**：将很多值复合在一起（包括原始类型值、对象、函数（方法））
+ JS对象是**若干无序属性的集合**，可以直接通过属性名来访问对象的属性（键值对）
+ 函数作为某一个对象的属性时，称其为该对象的方法

补充：注意键值对中，键key的数据类型是string类型，但是值value的数据类型就不一定了。

```javascript
var obj = {
  	name:3,
  	age:function(){
  		return typeof(name);
	}
}
obj.age();// 'string'
typeof(obj.name);// 'number'
```

创建对象：

```javascript
var man = {
  	name:'frewen',
  	age:20,
  	hobby:['playing ping pong','dancing'],
  	describe:function(){
  		console.log(this.name + '\'s age is ' + this.age + '.And his hobbies are ' + this.hobby[0] + ' and ' + this.hobby[1] + '.');
	}
}
// 定义完成 调用函数
man.descirbe();
// frewen's age is 20.And his hobbies are playing ping pong and dancing.
```

#### JS对象分类

+ **内置对象**（native object）由ECMAScript规范定义的对象或构造器对象（数组、函数等）


+ **宿主对象**（host object）由JS解析器所嵌入的宿主环境定义的（如：window、document）

  ​注意：当前学习的宿主环境是浏览器，而不仅仅有浏览器这一个宿主环境，比如node.js环境

+ **自定义对象**（user-defined object）运行中的用户自定义JS代码创建的对象//man对象

**标准内置对象分为两类：**

1. 构造器函数对象（类对象）--类似于String、Number、Boolean等构造函数
2. 非构造器对象—类似于Math、Json等非构造函数、

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181204204305421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

```javascript
/* 使用构造器的方式相应的创建相应的对象 */
var i = new String('str');// string object
var h = new Number(1);// number object
var g = new Boolean(true);// boolean object
var j = new Object({name:"Tom"});// object object
var k = new Array([1,2,3,4]);
var l = new Date();
var m = new Error();
var n = new Function();
var o = new RegExp(/\d/);
```

**难点：**

```javascript
console.log(Function instanceof Function); // true
console.log((new Function()) instanceof Function); //true 类似于Person()这就是一个new Function
console.log((new(new Function)) instanceof Function);
//false 类似于var p = new Person();p是一个对象
```

### JS对象的属性

#### JS对象属性的分类

+ **数据属性**（property，属性），字符串的键到值的映射（包括基本类型数据、对象、函数）


+ 访问器属性（accessor，或称为访问器），访问属性的方法，注意：访问和设置时不加括号


+ 内置属性（internal property）存在与ECMAScript规范中，不能直接访问

```javascript
var o = {
  	_x:1.0,// 不成文的规定 一般约定_x表示这个属性是私有属性
  	get x(){
  		return this._x;// 如果写成 get x(){return this.x;} 此时会不断的进行循环递归的调用
	},
  	set x(val){
  		this._x = val;
	}
}

console.log(o.x);// 调用get方法 1
o.x = 2;
console.log(o.x,o._x);// 调用set方法 访问_x属性值 2 2
```

上述代码注意几点：

+ 对于JS对象中，一般将带有`_`的属性称为私有属性，并通过`get`和`set`方法进行设置


+ 上述代码中如果将`get x()`改为

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181204204317408.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

则会出现错误，由于`get x()`方法的优先级要高于`x`属性，因此会一直调用`get x()`方法，出现递归执行的错误。

+ 代码解读

```javascript
console.log(o.x); //调用get x()方法，返回_x的值
o.x = 2; // 为对象添加一个x属性，同时调用set x()方法，设置_x的值为2
console.log(o.x, o._x); //由于get x()方法的优先级要高于x所以两个返回的都是this._x的值
```

+ 代码变形

```javascript
var o = {
  	x:1.0,// 不成文的规定 一般约定_x表示这个属性是私有属性
  	get x(){
  		return this._x;// 如果写成 get x(){return this.x;} 此时会不断的进行循环递归的调用
	},
  	set x(val){
  		this._x = val;
	}
}

console.log(o.x);// 调用get方法 没有_x属性 因此返回undefined
o.x = 2;// 给对象x属性重新赋值，同时调用set方法 会给_x赋值为2
console.log(o.x,o._x)// 2 2
```

+ 只读模式

```javascript
var o = {
  	_x:1.0,// 不成文的规定 一般约定_x表示这个属性是私有属性
  	get x(){
  		return this._x;// 如果写成 get x(){return this.x;} 此时会不断的进行循环递归的调用
	},
}

console.log(o.x);// 1
o.x = 2;// 添加属性x
console.log(o.x,o._x);//1 1
```

#### JS对象访问器属性实例

```javascript
var p1 = {
  	_name:"Jack",
  	_age:23,
  	set age(val){
  		if(val > 0&&val<150){
  			this._age = val;
		} else {
  			console.log('请设置正常的年龄');
		}
	},
  	get age(){
  		return this._age;
	}
};
p1.age = 178;// 请设置正常的年龄
```

### JS对象相关操作

#### 创建JS对象的方式

+ 通过**对象字面量的方式**直接创建对象

```javascript
var obj = {
  	num:10,
  	str:'Hi',
  	show:function(){
  		return this.str;
	}
};

console.log(obj.__proto__ === Object.prototype);// true
console.log(obj.__proto__.__proto__);// null
/*
1. obj对象的proto属性应该是其原型Object的prototype属性
2. obj对象的proto的proto为null
*/
```

- 通过Object的**create静态方法**创建对象

```javascript
var newObj = Object.create(obj);// newObj的原型的obj
newObj.age = 23;
// 其中静态方法相当于又在原来的基础上重新创建了一个对象newObj 这个对象是一个空对象
```

注意这个原型链：

newObj的原型为obj，其中obj的原型为Object的prototype属性，obj的原型的原型为null

```javascript
console.log(newObj.__proto__ === obj);// true
console.log(newObj.__proto__.__proto__ === Object.prototype);// true
console.log(newObj.__proto__.__proto__.__proto__ === null);//true
```

+ 通过**构造函数**的方式创建对象

```javascript
function Person(name,age){
  	this.name = name;
  	this.age = age;
}
Person.prototype.sayName = function(){
  	console.log("hello,I'm",this.name,this.age,"years old.");
}
var person1 = new Person('Mike',21);
person1.sayName();// hello.I'm Mike 21 years old.
```

注意这个原型链：

person1的原型为Person的prototype属性，其中Person的原型为Function的prototype属性，Function的原型为Object，最终回归到null

```javascript
console.log(person1.__proto__ === Person.prototype);//true
console.log(Person.__proto__ === Functon.prototype);//true
console.log(person1.__proto__.__proto__ === Object.prototype);// true
console.log(person1.__proto__.__proto__.__proto__ === null);//true
```

#### 对象属性的增删改查

+ 添加和删除自有属性


+ 访问和修改自有属性


+ 通过点与中括号访问属性的区别（写个访问属性的for循环练习）

```javascript
var obj = {};
obj.x = 2; //直接添加属性
console.log(obj.x); //通过.访问属性
obj.x = 5; //设置属性
console.log(obj["x"]); //通过[]访问属性
delete obj.x; //删除属性
console.log(obj.x);

# 输出结果
2
5
undefined
```

+ 添加属性：直接通过点的方式或者是中括号的方式直接进行添加

**练习：**

```javascript
var obj2 = {
    id_1: 2,
    id_2: 4,
    id_3: 6,
    id_4: 8,
    id_5: 10
};
for (var i = 1; i <= 5; i++) {
    console.log(obj2['id_' + i]);// 此时要用到中括号的方式
}

//思考obj3 和 obj4 内容是什么？为什么？
var obj3 = {};
for (var i = 0; i < 10; i++) {
    obj3.i = i;
}
// obj3的输出结果为对象里面有一个属性i，i的值为9。在循环里面第一次循环相当于给对象添加了一个i属性，
//属性值为0，后面的循环都是在改变i的值，因此最终循环结束，对象只有一个属性，属性值的结果为在循环里i的最后一个结果为9
var obj4 = {};
for (var i = 0; i < 10; i++) {
    obj4[i] = i;
}
/*在obj4的输出结果里面有10个属性，每一个的属性值分别是循环时的i值。在循环的每一个循环里，都为obj4添加了
一个新的属性，采用中括号的方式，所添加的属性值不是一样的。因此最终循环结束，对象有10个属性，每个属性对应
一个属性值*/
```

### 对象属性特性简介

**问题：为什么原型链上有些属性遍历不到**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181204204334949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

上述的代码中，在obj2上添加了y和z两个属性，同时obj1也有x这个属性，在obj2的原型链上有toString这个属性，但是通过for in的方式只能访问到x，y，z这三个属性，为什么访问不到原型链上的有些属性呢？

### 对象属性（数据属性）的特性

#### JS对象属性（数据属性）的特性

+ 属性的值（`[[value]]`），对应属性的值


+ 可写特性（`[[writable]]`），确定属性是否可写性


+ 可配置特性（`[[configurable]]`），确定属性是否能删除和其他特性是否可配置


+ 可枚举特性（`[[enumerable]]`），属性是否可枚举（是否可以遍历出来）

**设置属性的特性（defineProperty方法设置enumerable）**

```javascript
{enumerable:false})//表示不可枚举，如果是true表示可以枚举
```

```javascript
var obj = {
    x: 1,
    y: 2
};
Object.defineProperty(obj, 'x', { enumerable: false }); //表示不可枚举，如果是true表示可以枚举
for (var k in obj) {
    console.log(k, obj[k]);
}
# y 2
```

**设置属性特性实例（writable与configurable）**

```javascript
{enumerable:true,writable:false,configurable:false}
// 上述说明可以枚举，不可写，不可删除
```

```javascript
//设置属性特性实例（writable与configurable）
var person = { name: "Jack" };
Object.defineProperty(person, 'name', { enumerable: true, writable: false, configurable: false });
console.log(person.name); //jack
person.name = "Lucy"; // 不可写
console.log(person.name); //jack
delete person.name; // 不可删除
console.log(person.name); //jack
```

#### 给对象添加属性

+ 直接给对象添加属性（属性特性默认都为true）

```javascript
var obj = {
    x: 1,
    y: 2
};
//直接添加的属性，其所有特性默认都是true
obj.z = 3;
for (var k in obj) {
    console.log(k, obj[k]);
}
/*
x 1
y 2
z 3
*/
```

+ 通过`defineProperty`方法添加（属性特性默认为false）

```javascript
Object.defineProperty(obj, "w", { value: 456, configurable: true }); 
//writable,enumerable没有指定，所以默认为false
```

在上述过程中，给对象通过defineProperty的方式添加属性，这样所有的特性都默认为false，除非手动指定为true

```javascript
//通过defineProperty方法添加（属性特性默认为false）
var obj = {
    x: 1,
    y: 2
};
//直接添加的属性，其所有特性默认都是true
obj.z = 3;
//通过Object.defineProperty方法添加的属性，除了手动修改，其所有特性默认都是false
Object.defineProperty(obj, "w", { value: 456, configurable: true }); //writable,enumerable没有指定，所以默认为false
for (var k in obj) {
    console.log(k, obj[k]);
} // 没有办法输出w
/*
输出结果：
x 1
y 2
z 3
*/
```

没有输出w属性，因为w属性的enumerable的值为false，不可枚举

### 对象访问器（访问器属性）的特性

#### JS对象访问器（访问器属性）的特性

+ 可配置特性（`[[configurable]]`），确定属性**是否能删除**和其他特性是否可配置


+ 可枚举特性（`[[enumerable]]`），属性**是否可枚举**


+ 读取属性特性（`[[get]]`），在**读取属性时调用的函数**，默认是undefined


+ 写入属性特性（`[[set]]`），在**写入属性时调用的函数**，默认是undefined

```javascript
//添加访问器
var obj1 = {
    _name: "Lucy"
};
Object.defineProperty(obj1, "name", {
    get: function() { //只定义了get 特性，因此只能读不能写
        return this._name;
    }
});
console.log(obj1.name); //"Lucy"
obj1.name = "jack"; //只定义了getter访问器，因此写入失效
console.log(obj1.name); //"Lucy"
```

因为在用`defineProperty`添加属性的时候，默认为false，只添加了get方法，因此没有写入的set方法，因此没有办法写入。

#### 综合实例

```javascript
var obj2 = {
    _name: "Lucy",
    set name(val) { this._name = val; },
    get name() { return this._name; }
};
Object.defineProperty(obj2, "name", {
    get: function() {
        return this._name + "_hihi";
    },
    set: function(val) {
        this._name = val + "_haha";
    }
});
console.log(obj2.name);// Lucy_hihi
obj2.name = "jack";// 通过set方法 设置值
console.log(obj2.name); // jack_haha_hihi
```

在上述代码中，第一个输出调用了`get`方法，因此输出`lucy`加上`hihi`。第二个调用了`set`方法，因此写入了`this._name`为`jack_haha`，因此再调用`get`方法的时候输出了`jack_haha_hihi`

### 属性特性描述符及属性特性补充部分

#### 什么是属性特性描述符

+ 属性特性描述符是一个用来**查看对象属性的特性的对象**


+ 该对象包含4个属性，对应4个特性，通过`getOwnPropertyDescriptor`方法获得

```javascript
var obj = { x: 5 };
Object.defineProperty(obj, "y", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: 6
});
Object.defineProperty(obj, "z", {
    configurable: false,
    value: 7
});
Object.getOwnPropertyDescriptor(obj, "x");
// {value: 5, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(obj,"y");
// {value: 6, writable: false, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(obj,"z");
// {value: 7, writable: false, enumerable: false, configurable: false}
```

#### 对象属性特性

+ 给多个属性设置特性的方法（`Object.defineProperties`）


+ 在给多个属性添加特性的时候，相当于给不同的属性添加特性。


+ `Object.create`的第二个参数类似于`Object.defineProperties`的第二个参数，可以添加多个属性。


+ 使用Object的create方法，第二个参数的用法和`defineProperties`一样。

```javascript
// 给多个属性设置特性的方法（Object.defineProperties）
//Object.create的第二个参数类似于Object.defineProperties的第二个参数，可以添加多个属性。
var obj1 = { x: 3 };
var obj2 = Object.create(obj1, { y: { value: 3, enumerable: true } });
for (var i in obj2) {
    console.log(i, obj2[i]);
}
/*
输出结果：
x 3
y 3
*/

var obj = { _x: 1 };
Object.defineProperties(obj, {
    y: { value: 2, writable: true, configurable: true, enumerable: true },
    z: { value: 2, writable: true, configurable: true, enumerable: true },
    x: {
        get: function() { return this._x; },
        set: function(val) {
            this._x = val;
        }
    }
});
// {_x: 1, y: 2, z: 2}
```

#### Object与属性和属性特性相关的方法

+ `Object.keys(...)`、`Object.getOwnPropertyNames(...)` 区别：是否包含可遍历的属性
  + `Object.keys()` 返回所有自有（非继承）可枚举属性的键
  + `Object.getOwnPropertyNames()`返回所有自有（非继承）键，包括不可枚举

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181204204401821.png)

+ `Object.prototype.hasOwnProperty(...)` 可结合Object.keys一起使用


+ `Object.prototype.propertyIsEnumerable(...)`（hasOwnProperty的升级版）
  + `Object.prototype.hasOwnProperty()` 判断自身（不包括继承的）是否有该属性，不包括检测可枚举的属性
  + `Object.prototype.propertyIsEnumerable()` 判断自身（不包括继承的）是否有该属性并检测该属性是否可枚举

```javascript
obj2.hasOwnProperty("k"); //true
obj2.hasOwnProperty("x");// false
obj2.propertyIsEnumerable("k");//false
obj2.propertyIsEnumerable("x");// false
```

+ `in`  `for...in` (两者关于`enumerable`的区别）
  + `in` 检测一个对象是否有某个属性，包括继承的属性，包括不可枚举的属性
  + `for...in` 遍历一个对象的属性，包括继承的属性，但不包括不可枚举的属性

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181204204410924.png)

#### JS 对象之扩展、密封及冻结（级别逐渐升高）

+ `Extensible`（Object.isExtensible()、Object.preventExtensions( )）**限制添加新属性**

```javascript
var empty1 = {
    a: 1
};
console.log(Object.isExtensible(empty1)); //true
empty2 = Object.create({}, {
    "a": {
        value: 1,
        configurable: false, //不可配置
        enumerable: true, //可枚举
        writable: true //可写
    }
});
console.log(Object.isExtensible(empty2));// true
```

**一般来说，对象都是可以进行扩展的**

注意：

（1）设置对象是不可扩展的，一个对象是可以扩展的，但是二者仍然相等

```javascript
var obj = {};
var obj2 = Object.preventExtensions(obj);
console.log(obj === obj2); //true
```

（2）新创建的对象默认是可以进行扩展的，如果让其变为不可扩展的对象，则不可扩展

```javascript
var empty = {};
console.log(Object.isExtensible(empty)); //true
empty.a = 1; //添加成功
Object.preventExtensions(empty);
console.log(Object.isExtensible(empty)); //false
```

（3）使用传统的方式给不可扩展对象添加属性，会静默失败，不抛出异常；在严格模式中,为不可扩展对象添加属性将抛出错误；使用 `Object.defineProperty`方法为不可扩展对象添加新属性会抛出异常

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181204204421705.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ `seal`（Object.isSealed()、Object.seal( )）在extend的限制基础上，增加限制可配置属性特性

注意：

（1）设置一个对象是密封的，一个对象是不密封的，但是二者仍然相等

```javascript
var obj = { //声明一个对象
    prop: function() {},
    foo: "bar"
};
var o = Object.seal(obj); //将 obj 密封,且返回原对象
console.log(o === obj); //true
console.log(Object.isSealed(obj)); //true
```

其中`isSealed()`判断是否是密封的

（2）密封的对象仍然可以修改原先的属性值，但不能把密封对象的属性进行重新配置,譬如将数据属性重定义成访问器属性.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181204204433166.png)

（3）使用传统的方式给密封对象添加属性或删除属性，会静默失败，不抛出异常；在严格模式中，为密封对象添加属性或删除属性将抛出错误；使用 `Object.defineProperty`方法为密封对象添加新属性会抛出异常

![在这里插入图片描述](https://img-blog.csdnimg.cn/2018120420444075.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ `freeze`（Object.isFrozen()、Object.freeze( )）在seal的限制基础上，增加限制可写属性特性

```javascript
var obj = {
    prop: function() {},
    foo: "bar"
};
//可以添加新的属性,已有的属性可以被修改或删除
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;
Object.freeze(obj); //冻结
console.log(Object.isFrozen(obj)); //true
```

注意：

+ 对冻结的任何对象做任何操作都会失败，不可写入，不可删除，不可添加新的属性。


+ 使用传统的方式给冻结对象添加属性或删除属性或修改属性，会静默失败，不抛出异常；


+ 在严格模式中，为密封对象添加属性或删除属性或修改属性将抛出错误；


+ 使用 Object.defineProperty方法为密封对象添加新属性会抛出异常

![在这里插入图片描述](https://img-blog.csdnimg.cn/2018120420444828.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)