---
title: Rstrip
---

Removes all whitespace (tabs, spaces, and newlines) from the right side of a string. It does not affect spaces between words.

Input
```liquid
BEGIN{{ "          So much room for activities!          " | Rstrip }}END
```

Output
```text
BEGIN          So much room for activities!END
```
