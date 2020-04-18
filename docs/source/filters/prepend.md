---
title: Prepend
---

Adds the specified string to the beginning of another string.

Input
```liquid
{{ "apples, oranges, and bananas" | Prepend: "Some fruit: " }}
```

Output
```text
Some fruit: apples, oranges, and bananas
```

`Prepend` can also be used with variables:

Input
```liquid
{% assign url = "example.com" %}
{{ "/index.html" | Prepend: url }}
```

Output
```text

example.com/index.html
```
