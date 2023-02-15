# Expressions

Expressions are the main bread and butter of CookieDB. At the most basic level,
expressions are a tiny programming language built into CookieDB that takes in
some input and results in some output.

Let's look at a small example:

```
eq($name, "CookieFan37")
```

Let's look at a more complex example:

```
and(starts_with($name, "Cookie"), gt($age, 10), not(eq($description, null)))
```

Let's break down this syntax.

All expressions are run against a document of some sort. If we want our
expression to result in a value based on the document (which we most likely do),
we can use the "$" syntax to insert the value of that key into the expression.
Let's take the following document as an example and see what we can use the $
syntax for:

```json
{
  "name": "CookieFan37",
  "favorite": {
    "color": "blue",
    "number": 3
  }
}
```

The following $ syntax is valid:

- `$name` -> "CookieFan37"
- `$favorite.color` -> "blue"
- `$favorite.number` -> 3

The following syntax is invalid:

- `$blue` - There is no key by the name blue
- `$favorite` - There is a key by the name favorite, but it's an object and not
  a literal value

Inside expressions, we can also define constant literals. These can be the
following:

- numbers (i.e. `10`, `-23`, `3.213`)
- strings (i.e. `"CookieFan37"`, `'CookieHater'`)
- booleans (i.e. `true`, `false`)
- null (i.e. `null`)

The last part of the syntax are the functions. Functions follow the syntax of
`some_name(some_input, maybe_another_input)`. There are a lot of functions:

- `and`
  - Takes in any number of inputs and does logical and on them
  - ex: `and(true, true, true)`
- `or`
  - Takes in any number of inputs and does logical or on them
  - ex: `or(false, true, true)`
- `starts_with`
  - Returns true if a string starts with another string. Returns false if it
    does not.
  - ex: `starts_with('cookie', 'co')`
- `ends_with`
  - Returns true if a string ends with another string. Returns false if it does
    not.
  - ex: `ends_with('cookie', 'ie')`
- `to_lower`
  - Takes one input string and makes it lowercase
  - ex: `eq(to_lower('cOOKIE'), 'cookie')`
- `to_upper`
  - Takes one input string and makes it uppercase
  - ex: `eq(to_upper('Cookie'), 'COOKIE')`
- `gt`
  - Takes two numbers and checks if the left is greater than the right
  - ex: `gt(10, 5)`
- `lt`
  - Takes two numbers and checks if the left is less than the right
  - ex: `lt(5,10)`
- `eq`
  - Takes two values of any types and checks if they are equal
  - `eq(true, true)`
- `gt_or_eq`
  - Takes two numbers and checks if the left is greater than or equal to the
    right
  - ex: `gt_or_eq(12, 11)`
- `lt_or_eq`
  - Takes two numbers and checks if the left is less than or equal to the right
  - ex: `lt_or_eq(11, 12)`
- `subtract`
  - Takes two numbers and subtracts the right from the left
  - ex: `eq(subtract(10, 5), 5)`
- `divide`
  - Takes two numbers and divides the right from the left. If the right is zero,
    this will return null
  - ex: `eq(divide(10, 5), 2)`
- `add`
  - Takes any amount of numbers and adds them together. It also works as a
    concat function for strings.
  - ex: `eq(add(1, 2, 3), 6)`
- `multiply`
  - Takes any amount of numbers and multiplies them together
  - ex: `eq(multiply(1, 2, 3), 6)`
- `current_time`
  - Returns the current time in Unix milliseconds
  - ex: `eq(current_time(), 1668304518135)`*
- `to_date_string`
  - Takes in unix milliseconds and returns a string representation
  - ex: `eq(to_date_string(1668304518135), 'Sun, 13 Nov 2022 01:55:18 GMT')`
- `year`
  - Takes in unix milliseconds and returns the UTC year
  - ex: `eq(year(1668304518135), 2022)`
- `month`
  - Takes in unix milliseconds and returns the UTC month (0-11)
  - ex: `eq(month(1668304518135), 10)`
- `hour`
  - Takes in unix milliseconds and returns the UTC hour (0-23)
  - ex: `eq(hour(1668304518135), 1)`
- `minute`
  - Takes in unix milliseconds and returns the UTC minute (0-59)
  - ex: `eq(minute(1668304518135), 55)`
- `second`
  - Takes in unix milliseconds and returns the UTC minute (0-59)
  - ex: `eq(second(1668304518135), 18)`
- `day_of_week`
  - Takes in unix milliseconds and returns the UTC day of week (0-6)
  - ex: `eq(day_of_week(1668304518135), 0)`
- `day_of_month`
  - Takes in unix milliseconds and returns the UTC day of month (1-31)
  - ex: `eq(day_of_month(1668304518135), 13)`
- `if_else`
  - Takes in a boolean expression, and two results. If the boolean expression is
    true, it will take the first child, otherwise it will take the second child
  - ex: `if_else(true, true, false)`
- `not`
  - Takes in one value, it will return false if given a truthy value, else it
    will return true
  - ex: `not(false)`
- `in_range`
  - Takes in an input number, a minimum, and a maximum number. It will return
    true if the input is in the range, otherwise it will return false.
  - ex: `in_range(5, 0, 10)`
- `coalesce`
  - Takes in any number of inputs and returns the first non-null one
  - ex: `coalesce(null, true, 'hi')`
- `abs`
  - Takes in a number and returns the absolute value
  - ex: `eq(abs(-5), 5)`
- `asin`
  - Takes in a number and returns the arcsine
  - ex: `eq(asin(0), 0)`
- `acos`
  - Takes in a number and returns the arccosine
  - ex: `eq(acos(1), 0)`
- `atan`
  - Takes in a number and returns the arctangent
  - ex: `eq(atan(0), 0)`
- `atan2`
  - Takes in a number and returns the arctan2 (NOTE: the arguments are y, x and
    not x, y)
  - ex: `eq(atan(1, 1), divide(pi(), 4))`*
- `average`
  - Takes in any number of numeric children and returns the average
  - ex: `eq(average(0, 5, 10), 5)`
- `ceil`
  - Takes in a numeric value and returns the ceiling
  - ex: `eq(ceil(5.1), 6)`
- `floor`
  - Takes in a numeric value and returns the floor
  - ex: `eq(floor(5.1), 5)`
- `round`
  - Takes in a numeric value and returns the value rounded
  - ex: `eq(round(5.1), 5)`
- `sin`
  - Takes in an angle in radians and returns the sine
  - ex: `eq(sin(0), 0)`
- `cos`
  - Takes in an angle in radians and returns the cosine
  - ex: `eq(cos(0), 1)`
- `tan`
  - Takes in an angle in radians and returns the tangent
  - ex: `eq(tan(0), 0)`
- `sec`
  - Takes in an angle in radians and returns the secant, returns null instead of
    throwing
  - ex: `eq(sec(0), 1)`
- `csc`
  - Takes in an angle in radians and returns the cosecant, returns null instead
    of throwing
  - ex: `eq(csc(0), null)`
- `cot`
  - Takes in an angle in radians and returns the cotangent, returns null instead
    of throwing
  - ex: `eq(cot(0), null)`
- `degrees`
  - Takes in an angle in radians and returns the degrees
  - ex: `eq(degrees(pi()), 180)` `radians`
  - Takes in an angle in radians and returns the degrees
  - ex: `eq(radians(180), pi())`
- `exp`
  - Takes in some value and returns e to the power of that value
  - ex: `eq(exp(0),1)`
- `power`
  - Takes in value for base and exponent and computes the power
  - ex: `eq(power(2, 4), power(4, 2))`
- `log`
  - Takes in a value for input and base and computes the logarithm
  - ex: `eq(log(256, 2), 8)`
- `max`
  - Takes in any amount of elements and returns the maximum value
  - ex: `eq(max(1, 5, -40, 1000), 1000)`
- `min`
  - Takes in any amount of elements and returns the minimum value
  - ex: `eq(min(1, 5, -40, 1000), -40)`
- `pi`
  - Returns the value of pi
  - ex: `eq(pi(), 3.141592653589793)`
- `random`
  - Returns a random value from 0 to 1
  - ex: `eq(random(), 0.42637976796743104)`*
- `sign`
  - Returns the sign of the number. If positive 1, if negative -1, otherwise 0
  - ex: `eq(sign(-3), -1)`
- `sqrt`
  - Takes in a number and returns the square root
  - ex: `eq(sqrt(4), 2)`

If you've looked through the whole list and can't find something that matches
your usecase, please let us know by
[opening an issue](https://github.com/cookiedb/CookieDB/issues/new) on the
github!

\* May not work as described due to technicalities
