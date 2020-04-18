---
title: Append
---

Concatenates two strings and returns the concatenated value.

Input
```liquid
{{ "/my/fancy/url" | Append: ".html" }}
```

Output
```text
/my/fancy/url.html
```

`Append` can also be used with variables:

Input
```liquid
{% assign filename = "/index.html" %}
{{ "website.com" | Append: filename }}
```

Output
```text

website.com/index.html
```
