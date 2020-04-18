---
title: Append
---

连接两个字符串并返回结果。

输入
```liquid
{{ "/my/fancy/url" | Append: ".html" }}
```

输出
```text
/my/fancy/url.html
```

也可以用于变量。

输入
```liquid
{% assign filename = "/index.html" %}
{{ "website.com" | Append: filename }}
```

输出
```text

website.com/index.html
```
