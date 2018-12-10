### 数组的创建和基本操作（增删改查）

#### 创建数组的方式

+ 通过**字面量**的方式直接创建，直接量中的值可以是任意的表达式


+ 通过Array构造函数来创建数组对象，注意传递的**参数**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181210121836574.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z1eml3YW5n,size_16,color_FFFFFF,t_70)

**经典案例一：异步执行方式**

```javascript
var arr = [];
for (var i = 0; i < 5; i++) {
    document.onclick = function() {
        arr[j] = j;
    }
}
// onclick之后
console.log(arr);
# [empty*5,5]
```

```javascript
var arr = [];
arr[5] = 5;
console.log(arr);
# [empty*5,5]
```

上述的代码的实质就是下方第二块代码，在执行`document.onclick`之前，`i`的值就已经是`5`了，所以相当于直接给`arr`的第`6`个属性添加了属性值为`5`；所以`arr`在点击之后是一个有`6`个元素的值。前五个为空，第六个元素为`5`。

经典案例二：数据类型表示

```javascript
var a1 = [1, 2, 3];
var a2 = a1;
a2.length = 0;
console.log(a1, a2);// [] []

var a3 = [1, 2, 3];
var a4 = a3;
a4 = [];
console.log(a3, a4);// [1,2,3] []
```

#### 数组元素的增删改查的基本操作

```javascript
//增删改查
var a = ["hello"];
a[1] = 3.14; //增：直接添加数组元素，通过方法添加元素参见后续章节
a[2] = "world";
console.log("删除a[2]前的数组a", a);
delete a[2]; //删：此时数组长度还是3。如何彻底删除？直接修改length与pop方法
console.log("删除a[2]后的数组a", a);
a[0] = "XX"; //改：修改数组元素a[0]
console.log(a[0]); //查:看数组中的元素，索引从0开始

# 输出结果
删除a[2]前的数组a (3) ["hello", 3.14, "world"]
删除a[2]后的数组a (3) ["hello", 3.14, empty]
XX
```

当采用`delete`进行删除的时候，此时的数组的长度不会发生改变，如果想彻底删除，需要直接修改`length`或者使用`pop`方法。

**思考题目**

```javascript
var i = 2,
    b = [];
b[i] = 3; // 相当于b[2] = 3;
b[i+1] = 'YY';// 相当于b[3] = 'YY';
console.log(b);// [empty,empty,3,'YY'] 
b[b[i]] = b[0];// 给b[3]重新赋值赋值结果为b[0] b数组添加了0属性 值为undefined
console.log(b);// [empty,empty,3,undefined]
```

#### 数组相对于普通对象的特别之处

+ **数组是对象的特殊形式**，可以为数组添加对象属性，对于0至2的32次方之外的数，将作为普通对象的键来对待


+ 数组特别之处在于，当使用2的32次方以内的**非负整数**作为属性名时（包括类型转换的数字），数组会自动维护其length属性，作为数组的元素，而不是数组对象的属性

```javascript
var a = [];
a[-1.23] = true; //创建一个名为“-1,23”的属性
console.log(a.length);// 0
a[1.23] = 'hello'; // 转换为属性
console.log(a.length);// 0
a["100"] = 0; // 数组的第101个元素
console.log(a.length);// 101
a[1.00] = "Hi"; //和a[1]相当
console.log(a.length);// 101
console.log(a);
# [empty, "Hi", empty × 98, 0, -1.23: true, 1.23: "hello"]
```

### 稀疏数组与多维数组

#### 稀疏数组

+ 稀疏数组是包含从0开始的不连续索引的数组，length值**大于实际定义的元素的个数**


+ 遍历稀疏数组时，注意的跳过无元素项的问题

```javascript
var a1 = [, "abc"];
console.log(a1.length);// 2

for (var i in a1) {
    console.log(i, a1[i]); //输出几个元素
}
// 1 abc

console.log(0 in a1, 1 in a1); // 0 是 遍历不到的
// false true

# 稀疏数组中没有元素的内容是遍历不到的

var a2 = new Array(3);
console.log(a2.length);// 3
console.log(a2);// [empty*3]

//注意：
var a3 = [, , ,];
# 在没有值的情况下，几个逗号表示数组的元素就有几个
console.log(a3.length);// 3

console.log(["a", "b"].length); // 2
console.log(["a", "b", ].length); // 2
console.log(["a", "b", , ].length); // 3
```

#### 多维数组（矩形数组、交错数组）

JS中可以通过包含数组的数组来模拟多维数组

```javascript
var table = new Array(5);
for (var i = 0; i < table.length; i++) {
    table[i] = new Array(5); //若是table[i] = new Array(i);
}

for (var row = 0; row < table.length; row++) {
    for (var col = 0; col < table[row].length; col++) {
        table[row][col] = row * col;
    }
}
var product = table[2][4];
console.log(product)// 8
console.log(table);
/*
[Array(5), Array(5), Array(5), Array(5), Array(5)]
0: (5) [0, 0, 0, 0, 0]
1: (5) [0, 1, 2, 3, 4]
2: (5) [0, 2, 4, 6, 8]
3: (5) [0, 3, 6, 9, 12]
4: (5) [0, 4, 8, 12, 16]
length: 5
*/
```

### 数组的方法和相关高阶函数

#### 数组静态方法（构造器函数对象的方法）

+ **Array.from()** 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

```javascript
var bar = ["a", "b", "c"];
Array.from(bar); // ["a", "b", "c"]
Array.from('foo'); // ["f", "o", "o"]
```

+ **Array.isArray()** 用于确定传递的值是否是一个 Array。

```javascript
var arr1 = [1, 3, 4];
console.log(Array.isArray(arr1)); // 判断是否是数组 true
arr1.x = 'xx';
console.log(Array.isArray(arr1)); // true
```

+ **Array.of()** 方法创建一个具有**可变数量参数的新数组**实例，而不考虑参数的数量或类型。

 `Array.of()` 和 `Array` 构造函数之间的区别在于处理整数参数：`Array.of(7)`创建一个具有单个元素 7 的数组，而 `Array(7)` 创建一个长度为7的空数组（注意：这是指一个有7个空位的数组，而不是由7个`undefined`组成的数组）。

```javascript
Array.of(7); // [7]避免了new Array的错误
Array.of(1, 2, 3); // [1, 2, 3]
Array(7); // [ , , , , , , ] [empty*7]
Array(1, 2, 3); // [1, 2, 3]
```

#### 数组原型方法（添加和删除元素-破坏性）

+ **Array.prototype.shift()**

**shift()** 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

```javascript
var arr2 = [1, 3, 5, 7];
var shiftElement = arr2.shift(); //返回去除的元素
console.log(shiftElement, arr2);// 1 [3,5,7]
```

+ **Array.prototype.unshift(elem1?,elem2?,...)**

**unshift()** 方法将一个或多个元素添加到数组的**开头**，并返回**新数组的长度**。

```javascript
var newLength = arr2.unshift(1, 2); //返回新的数组长度
console.log(newLength, arr2);// 5 [1,2,3,5,7]
```

+ **Array.prototype.pop()**

**pop()**方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

```javascript
var popElement = arr2.pop(); //返回pop出去的元素
console.log(popElement, arr2);// 7 [1,2,3,5]
```

+ **Array.prototype.push(elem1?,elem2?,...)**

**push()** 方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。

```javascript
var newLength = arr2.push(77, 88); //返回新的数组长度
console.log(newLength, arr2);// 6 [1,2,3,5,77,88]

//思考：如何通过push将两个数组组合成一个数组
var arr3 = ["a", "b"];
var arr4 = ["c", "d"];
Array.prototype.push.apply(arr3, arr4);
console.log(arr3);// ["a", "b","c", "d"]
```

+ **Array.prototype.splice(start,deleteCount?,elem1?,elem2?)**

**splice()** 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。从`start`开始，移除`deleteCount`个元素，并插入给定的元素

```javascript
var arr5 = ["a", "b", "c", "d"];
var spliceElements = arr5.splice(1, 2, "x"); //返回切掉的数组
console.log(spliceElements, arr5);// ["b","c"] ["a", "x", "d"]
//思考start若是负数则返回什么？
arr5.splice(-2,2,"x");// ["x", "d"]
console.log(arr5);// ["a", "x"]
```

#### 数组原型方法（排序和颠倒元素顺序-破坏性）

+ **Array.prototype.reverse()**

**reverse()** 方法将数组中元素的位置颠倒。

第一个数组元素成为最后一个数组元素，最后一个数组元素成为第一个。

```javascript
var arr1 = [1, 2, 3];
arr1.reverse();
console.log(arr1);// [3,2,1]
```

+ **Array.prototype.sort(compareFunction?)**  回调函数的写法，思考冒泡排序

**sort()** 方法用[就地（ in-place ）的算法](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability)对数组的元素进行排序，并返回数组。sort 排序不一定是**稳定的**。默认排序顺序是根据字符串Unicode码点。

```javascript
var arr2 = ["banana", "apple", "pear", "orange"];
arr2.sort();
console.log(arr2);
# ["apple", "banner", "orange", "pear"]

//思考sort中的参数
var arr3 = [-1, -20, 7, 50];
arr3.sort();
console.log(arr3); //结果是否是预计结果,如何解决
# [-1,-20,50,7]

//sort传递的函数对象(解决sort排序的错误)
arr3.sort(function(a, b) { return a - b; }); //对于数字类型，大于0则交换，冒泡排序
//arr3.sort(function (a,b) {return a>b;});//对于布尔类型，true则交换，冒泡排序
# [-20,-1,7,50]
```

#### 数组原型方法（合并、切分和连接-非破坏性）

+ **Array.prototype.concat(arr1?,arr2?,...)**

**concat()** 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```javascript
var arr4 = ["banana", "apple"];
var arr5 = ["pear", "orange"];
var newArray = arr4.concat(arr5);
console.log(newArray, arr4, arr5);
/*
["banana", "apple", "pear", "orange"]
["banana", "apple"] 
["pear", "orange"]
*/
```

+ **Array.prototype.slice(begin?,end?)**  注意参数的正负，注意不要和splice 混淆了 

**slice()** 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且**原始数组不会被修改**。

```javascript
//Array.prototype.slice(begin?,end?)注意：不要和splice弄混了
var arr6 = [1, 2, 3, 4, 5];
var newArray = arr6.slice(2, 4);
console.log(newArray, arr6);// [3,4] [1,2,3,4,5]
var newArray2 = arr6.slice(2);
console.log(newArray2, arr6);// [3,4,5] [1,2,3,4,5]
```

+ **Array.prototype.join(separator?)**  注意返回的类型 

**join()** 方法将一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）的所有元素连接成一个字符串并返回这个字符串。

```javascript
//Array.prototype.join(separator?)
var arr7 = [3, 4, 5];
var joinReturn = arr7.join("--"); //返回了个什么类型？
console.log(joinReturn, arr7);// 3--4--5 [3,4,5]
console.log(typeof joinReturn);// string
//注意：稀疏数组调用join
console.log([3, , , , , , 5].join("*"));// 3******5
```

#### 数组原型方法（值的查找-非破坏性）

+ **Array.prototype.indexOf(searchValue,startIndex?)**

**indexOf()**方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回**-1**。

```javascript
var arr8 = [1, 3, 5, 5, 7, 9, 5];
console.log(arr8.indexOf(5)); //输出几？
console.log(arr8.indexOf(5, 3)); //输出几？
console.log(arr8.indexOf(5, 5)); //输出几？
/*
2
3
6
*/
```

+ **Array.prototype.lastIndexOf(searchElement,startIndex?)**  注意方向和起始点

**lastIndexOf()** 方法返回指定元素（也即有效的 `JavaScript` 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 `fromIndex` 处开始。

```javascript
console.log(arr8.lastIndexOf(5)); //输出几？
console.log(arr8.lastIndexOf(5, 3)); //输出几？
console.log(arr8.lastIndexOf(5, 5)); //输出几？
/*
6
3
3
*/
```

#### 数组原型方法（迭代-非破坏性-检测方法）

+ **Array.prototype.forEach(callback,thisValue?)**

**forEach()** 方法对数组的每个元素执行一次提供的函数。

```javascript
var arr1 = [2, 5, 8];
arr1.forEach(function(a) {
    if (a > 3) {
        console.log(a, "大于3");
    } else {
        console.log(a, "不大于3");
    }
});
console.log(arr1);
/*
2 "不大于3"
5 "大于3"
8 "大于3"
[2, 5, 8]
*/
```

+ **Array.prototype.every(callback,thisValue?)** 若有不满足的，立即返回`false` 不再后续迭代`every()` 方法测试数组的所有元素是否都通过了指定函数的测试。

```javascript
var arr2 = [2, 5, 8]; //[2,4,6]
var returnValue = arr2.every(function(a) { 
  //判断数组元素是否都是偶数，若有不满足的将不再进行后续判断
   //console.log(a);//打开此行，查看是否会输出8，为什么？
    return a % 2 === 0;
});
console.log(returnValue);
/*
2
5 5此时不满足则不再往后继续执行
false
*/
```

+ **Array.prototype.some(callback,thisValue?)** 若有满足的，立即返回`true`，不再后续迭代

**some()** 方法测试数组中的某些元素是否通过由提供的函数实现的测试。

```javascript
var arr2 = [2, 5, 8]; //[2,4,6]
var returnValue = arr2.some(function(a) { 
  //判断数组元素是否都是偶数，若有不满足的将不再进行后续判断
    //console.log(a);//打开此行，查看输出了哪些数，为什么？
    return a % 2 === 0;
});
console.log(returnValue);
/*
2 已经满足 不再继续执行
true
*/
```

#### 数组原型方法（迭代-非破坏性-转换方法）

+ **Array.prototype.map(callback,thisValue?)**

**map()** 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```javascript
var arr2 = [1, 3, 5, 7, 9];
var newArray = arr2.map(function(a) {
    return a * a;
});
console.log(newArray, arr2);
/*
[1,9,25,49,81] [1,3,5,7,9]
*/
```

+ **Array.prototype.filter(callback,thisValue?)**

**filter()** 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```javascript
var arr2 = [1, 3, 5, 7, 9];
var newArray = arr2.filter(function(a) { //产生新数组，新数组的元素是返回为true的那些元素
    return (a > 2 && a < 8) ? true : false;
});
console.log(newArray, arr2);
/*
[3,5,7] [1,3,5,7,9]
*/
```

#### 数组原型方法（迭代-非破坏性-归约方法）

+ **Array.prototype.reduce(element,initialValue?)**

**reduce()** 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

```javascript
function printArgs(prev, cur, i) {
    console.log("prev", prev, ",cur:", cur, ",i:", i);
    return prev + cur;
}
var arr4 = ["a", "b", "c", "d"];
console.log(arr4.reduce(printArgs));
console.log(arr4.reduce(printArgs, "x"));
/*
prev a ,cur: b ,i: 1
prev ab ,cur: c ,i: 2
prev abc ,cur: d ,i: 3
abcd
prev x ,cur: a ,i: 0
prev xa ,cur: b ,i: 1
prev xab ,cur: c ,i: 2
prev xabc ,cur: d ,i: 3
xabcd
*/
```

如果没有后面的参数，那么是从1开始的，如果有后面的参数那么是从0开始的

+ **Array.prototype.reduceRight(callback,initialValue?)**

**reduceRight()** 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

```javascript
function printArgs(prev, cur, i) {
    console.log("prev", prev, ",cur:", cur, ",i:", i);
    return prev + cur;
}
var arr4 = ["a", "b", "c", "d"];
console.log(arr4.reduceRight(printArgs));
console.log(arr4.reduceRight(printArgs, "x"));
/*
prev d ,cur: c ,i: 2
prev dc ,cur: b ,i: 1
prev dcb ,cur: a ,i: 0
dcba
prev x ,cur: d ,i: 3
prev xd ,cur: c ,i: 2
prev xdc ,cur: b ,i: 1
prev xdcb ,cur: a ,i: 0
xdcba
*/
```