---
title: Prepend
---

在字符串开头添加另一个字符串。

输入
```liquid
{{ "apples, oranges, and bananas" | Prepend: "Some fruit: " }}
```

输出
```text
Some fruit: apples, oranges, and bananas
```

`Prepend` 也可以用于变量。

输入
```liquid
{% assign url = "example.com" %}
{{ "/index.html" | Prepend: url }}
```

输出
```text

example.com/index.html
```
