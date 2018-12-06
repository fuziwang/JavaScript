### JS this简介及特点

+ JavaScript语言中的this

在 JavaScript 中，this 是**动态绑定**，或称为运行期绑定的。由于其运行期绑定的特性，JavaScript 中的 this 含义要丰富得多，它可以是全局对象、当前对象或者任意对象，这完全取决于函数的调用方式

**this不进行作用域传递（函数嵌套时的this缺陷）**

补充：调试小技巧

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206195329312.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### JS this四种应用场景

#### 一般函数中的this

**非严格松散模式下**

+ 一般函数中的this（非严格松散模式下）指代全局对象（window）

```javascript
// 非严格模式下 this指向window
function thisTest() {
    console.log(this === window);
}
thisTest();// true
```

+ 可以通过this在函数内添加、删除、修改全局对象属性

```javascript
// 可以通过this给window对象添加属性和方法
var a = 10;
b = "Hi";

function thisTest2() {
    this.a = 20;
    delete this.b;
    this.c = "新添加属性";
}
thisTest2();
console.log(a, c);// 20 "新添加属性"
```

**严格模式下**

+ 一般函数中的this（严格模式）为**undefined**

```javascript
function thisTest() {
    "use strict"
    console.log(this);
}
thisTest();// undefined
```

+ 可以用此特性来判断当前是否为严格模式

```javascript
//"use strict"
function isStrictMode() {
    return this == undefined ? true : false;
}
isStrictMode();// false
```

#### 对象方法中的this

+ 函数作为对象的一个属性时，称之为对象的方法


+ 对象方法中的**this指代调用此方法的对象**（无嵌套的情况下）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206195342366.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

#### 构造函数中的this

构造函数中的this指代通过new新创建的对象

+ JS（ES5） 并没有类（class）的概念，而是使用基于原型（prototype）的继承方式


+ JS中的构造函数充当了类的角色，如果不使用 new 调用，则和普通函数一样。


+ 如果作为构造函数正确调用时，构造函数中的**this 绑定到新创建的对象上**

```javascript
function Point(x, y) {
    this.x = x;
    this.y = y;
}
var p = new Point(2, 3);
console.log(p); // 此时构造函数中的this就替换成了p对象
# Point{x:2,y:3}
```

思考：若直接调用Point函数，会是怎样一种情况，直接调用的话this指的是谁？

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206195353392.png)

补充说明：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206195402231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206195411131.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

#### 间接调用中的this（call、apply）

通过call/applay间接调用的函数中的this（指代第一个参数）

+ JS中函数也是对象（函数对象），也有属性和方法（length、call、apply等）注意，像call和apply这样的方法是定义在原型上的。


+ JS中函数可以通过call和apply进行间接调用，动态的指定由谁来调用此函数

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206195420789.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

### JS this缺陷和解决方法

+ this不进行作用域传递、函数嵌套中的this存在缺陷

```javascript
var point = {
    x: 0,
    y: 0,
    moveTo: function(x, y) {
        //内部嵌套函数
        function moveToX() {
            this.x = x; //this绑定到了哪里？
        }
        //内部嵌套函数
        function moveToY() {
            this.y = y; //this绑定到了哪里？
        }
        moveToX(); //moveToX.call(this);通过间接调用来解决
        moveToY();
    }
};
point.moveTo(2, 2);
console.log(point);
# point{x:0,y:0}
//console.log(window.x,window.y);
```

+ 方法一：使用变量（that或self）软绑定，使this指向正确

```javascript
// 解决方案一：软绑定
var point = {
    x: 0,
    y: 0,
    moveTo: function(x, y) {
        var that = this; //此时的that指向的就是当前对象
        function moveToX() {
            that.x = x; //this改为that
        }

        function moveToY() {
            that.y = y;
        }
        moveToX();
        moveToY();
    }
};
point.moveTo(2, 2);
console.log(point);
//console.log(window.x,window.y); 为什么不报错？但是console.log(x)和console.log(y)会报错
```

+ 方法二：使用call/apply间接调用，使this指向正确

```javascript
var point = {
    x: 0,
    y: 0,
    moveTo: function(x, y) {
        function moveToX() {
            this.x = x; //this绑定到了哪里？
            function abc() {};
            abc.call(this); // 此时的this不再指向的是point对象，指向的是window对象
        }

        function moveToY() {
            this.y = y; //this绑定到了哪里？
        }
        moveToX.call(this); //->this.moveToX()->point.MoveToX() 如果将此句话放到深层则this不再指向point
        moveToY();
    }
};
point.moveTo(2, 2);
console.log(point); //2,0
```

补充说明：

上述方法虽然很好，但是不能保证此时的this就一直指向point对象，可能在中间过程中发生改变：（**使用软绑定则不会发生这种情况**）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181206195433528.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

+ 方法三：使用Function.prototype.bind，使this指向正确

函数对象的绑定方法bind返回的是一个**函数**，可以直接调用，也可以传给一个**变量**

```javascript
var point = {
    x: 0,
    y: 0,
    moveTo: function(x, y) {
        function moveToX() {
            this.x = x; //this绑定到了哪里？
        }

        function moveToY() {
            this.y = y; //this绑定到了哪里？
        }
        moveToX.bind(point)(); // 函数对象的绑定方法返回的是一个函数，可以直接调用，也可以传给一个变量
        moveToY.bind(point)();
    }
};
point.moveTo(2, 2);
console.log(point);
```

构造函数中的this同样存在函数嵌套缺陷，解决办法同上