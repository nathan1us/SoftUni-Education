

# 03. Lab: Data Types and Variables

Problems for in-class lab for the [&quot;Technology Fundamentals &quot; course @ SoftUni](https://softuni.bg/modules/57/tech-module-4-0).
# 01. Concatenate Names

Receive two **names** as **string parameters** and a **delimiter**. Print the names **joined** by the delimiter.

### **Examples**

| **Input** | **Output** |
| --- | --- |
| &#39;John&#39;,&#39;Smith&#39;,&#39;->&#39; | John->Smith |
| &#39;Jan&#39;,&#39;White&#39;,&#39;\<->&#39; | Jan<->White |
| &#39;Linda&#39;,&#39;Terry&#39;,&#39;=>&#39; | Linda=>Terry |

# 02. Right Place

You will receive **3 parameters (string, char, string).**
First string will be a word with a **missing char** replaced with a underscore &#39; **\_**&#39;
You have to replace the character with the missing part (underscore) from the first string and **compare** the result with the second string. If they are equals you should print &quot; **Matched**&quot;, otherwise print &quot; **Not Matched**&quot;.

### Examples

| **Input** | **Output** |
| --- | --- |
| &#39;Str\_ng&#39;, &#39;I&#39;, &#39;Strong&#39; | Not Matched |
| &#39;Str\_ng&#39;, &#39;i&#39;, &#39;String&#39; | Matched |

# 03. Integer and Float

You will receive **3 numbers**. Your task is to find their **sum** and print it to the console with the addition
&quot; - {type of the number (integer or float)}&quot;:

### Examples

| **Input** | **Output** |
| --- | --- |
| 9, 100, 1.1 | 110.1 - Float |
| 100, 200, 303 | 603 - Integer |

# 04. Amazing Numbers

As **input** you will receive a **number**. Check and print if it is amazing or not into the following format: **&quot;{number} Amazing? {result}&quot;**. An amazing number is one that includes the **digit 9** the sum of its digits. Examples for amazing numbers are 1233 (1 + 2 + 3 + 3 = 9), 583472 (5 + 8 + 3 + 4 + 7 + 2 = 29)

### Examples

| **Input** | **Output** |
| --- | --- |
| 1233 | 1233 Amazing? True |
| 999 | 999 Amazing? False |

# 05. Gramophone

As **input** you will receive **3 parameters (strings)**

**First string** is the name of the band
**Second string** is the name of the album
**The third** is holding a song name from the album.

You have to find out how many **times** the plate will **rotate** the given song from the album.

The plate makes a full rotation every 2.5 seconds.
The song **duration in seconds** is calculate by the given formula: (Album name.length \* band name.lenght) \* song name.length / 2
As **output** you should print the following message:

 &quot;The plate was rotated { **rotation** } times.&quot;

Rotations should be **rounded up**.

### Examples

| **Input** | **Output** |
| --- | --- |
| &#39;Black Sabbath&#39;, &#39;Paranoid&#39;, &#39;War Pigs&#39; | The plate was rotated 167times. |

# 06. Fuel Money

Calculate how much money for fuel will be needed to drive а bus from one place to another.
When you consider this few things:

Calculate **the fuel** by knowing that **an empty bus** can pass **100** km **with** 7L diesel.
**One person** in that bus excluding the driver increases fuel consumption by **100 milliliters**.

The **money** is calculated by **multiplying** the **fuel price** with the **needed fuel** for the trip.

As **input** you will receive **3 parameters (****the distance **the bus must travel** , the passengers **in it and** the price **for** 1 liter of diesel****)**

As **output** you should print this message: &quot;Needed money for that trip is {neededMoney} lv&quot;

### Examples

| **Input** | **Output** |
| --- | --- |
| 260, 9, 2.49 | Needed money for that trip is 47.559lv. |
| 90, 14, 2.88 | Needed money for that trip is 22.176lv. |

# 07. Centuries to Minutes

Write program to receive a **number** of **centuries** and convert it to **years** , **days** , **hours** and **minutes**.

### **Examples**

| **Input** | **Output** |
| --- | --- |
| 1 | 1 centuries = 100 years = 36524 days = 876576 hours = 52594560 minutes |
| 5 | 5 centuries = 500 years = 182621 days = 4382904 hours = 262974240 minutes |

### **Hints**

- Use appropriate data type to fit the result after each data conversion.
- Assume that a year has 365.2422 days at average ([the Tropical year](https://en.wikipedia.org/wiki/Tropical_year)).

# 08. Special Numbers

A **number** is **special** when its **sum of digits is 5, 7 or 11**.

Write a program to receive a number **n** and for all numbers in the range **1…n** print the number and if it is specialor not ( **True** / **False** ).

### **Examples**

| **Input** | **Output** |
| --- | --- |
| 15 | 1 -> False<br/>2 -> False<br/>3 -> False<br/>4 -> False<br/>5 -> True<br/>6 -> False<br/>7 -> True<br/>8 -> False<br/>9 -> False<br/>10 -> False<br/>11 -> False<br/>12 -> False<br/>13 -> False<br/>14 -> True<br/>15 -> False |

# 09. Triples of Latin Letters

Write a program to receive a **number** n **and print all** triples **of the first** n small Latin letters, ordered alphabetically:

### **Examples**

| **Input** | **Output** |
| --- | --- |
| 3 | aaa<br/>aab<br/>aac<br/>aba<br/>abb<br/>abc<br/>aca<br/>acb<br/>acc<br/>baa<br/>bab<br/>bac<br/>bba<br/>bbb<br/>bbc<br/>bca<br/>bcb<br/>bcc<br/>caa<br/>cab<br/>cac<br/>cba<br/>cbb<br/>cbc<br/>cca<br/>ccb<br/>ccc |


The function **String.fromCharCode()** **gets the value in** decimal **and transforms it to a character from the** ASCII table.

