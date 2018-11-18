### JavaScript简介

网页主要由三部分组成：**结构（Structure）、表现（Presentation）和行为（Behavior）**，其中JavaScript主要就是展现行为的高级程序语言。

#### JavaScript的定义

JavaScript是一种基于**对象**和**事件**驱动（行为，一个动作可以触发一个效果）并具有安全性能的**脚本语言**。

**脚本语言和编译类语言**

+ 脚本语言：解释执行的程序语言，具有特定的解析器。


+ 编译类语言：程序执行前必须提前编译成计算机能识别的二进制机器码。

**解析器：浏览器或node**

+ 浏览器是程序的解析器，运行平台。


+ 浏览器能够识别JS代码，并翻译成机器语言并执行。

#### JavaScript的特点

+ JavaScript是一种直译式脚本语言
  + 在宿主（浏览器、Node）中解释执行（非编译语言，不是在执行前提前编译可执行文件或字节码）


+ JavaScript是一种弱类型、动态类型语言
  + 写程序时不用给变量指定特定的数据类型（动态类型）
  + 可以动态的更改变量的类型（弱类型）


+ JavaScript语言的特点
  + ES5没有块作用域、函数式编程、闭包、基于原型链的继承方式、动态添加属性等
  + 借鉴了Java的语法、Self原型继承、Python的正则等

### JavaScript基本用法

#### HTML文件内部 JavaScript 代码

+ 嵌入HTML中。在HTML中嵌入`<script type="text/javascript"></script>`


+ 可以嵌入到HTML中的任何位置，一般规定将JS程序写到head内部和body后面。不多大部分情况都是`<body>`之后

```html
<!DOCTYPE html>
<html>
<head>
	<title>First JS Project!</title>
	<meta charset="utf-8"/>
	<script src="js/demo.js">//引入外部文件时，中间不能添加任何内容
	</script>
	<script type="text/javascript">
		console.log("abc");//在开发者工具中的console进行观看，一般来进行调试
		document.write('<p>Hello Js!</p>');//用Js控制HTML标签，将内容显示在html中。
	</script>
</head>
<body>
</body>
</html>
```

#### 外部JavaScript文件

将JS代码写到独立的`.js`文件中,通过指定src属性，通过相对路径。

注意：

+ 外部的`.js`文件中不用出现`<script type="text/javascript"></script>`直接写JS代码


+ 引入外部的JS的script中不能再写代码。`<script type="text/javascript"src="xx.js"></script>`

