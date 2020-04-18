---
title: uniq
---

移除数组中的重复元素。

输入
```liquid
{% assign my_array = "ants, bugs, bees, bugs, ants" | Split: ", " %}
{{ my_array | uniq | join: ", " }}
```

输出
```text

ants, bugs, bees```
