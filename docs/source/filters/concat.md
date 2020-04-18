---
title: concat
---

Concatenates (joins together) multiple arrays. The resulting array contains all the items from the input arrays.

Input
```liquid
{% assign fruits = "apples, oranges, peaches" | Split: ", " %}
{% assign vegetables = "carrots, turnips, potatoes" | Split: ", " %}

{% assign everything = fruits | concat: vegetables %}

{% for item in everything %}
- {{ item }}
{% endfor %}
```

Output
```text
- apples
- oranges
- peaches
- carrots
- turnips
- potatoes
```

You can string together `concat` filters to join more than two arrays:

Input
```liquid
{% assign furniture = "chairs, tables, shelves" | Split: ", " %}

{% assign everything = fruits | concat: vegetables | concat: furniture %}

{% for item in everything %}
- {{ item }}
{% endfor %}
```

Output
```text
- apples
- oranges
- peaches
- carrots
- turnips
- potatoes
- chairs
- tables
- shelves
```
