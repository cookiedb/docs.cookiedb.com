# Selecting documents

Perhaps the most complicated part of every database is the querying of
documents. CookieDB tries to make this as easy as possible by making everything
an option instead of text incantation.

A basic selection only uses a <em>selector</em> second argument, which takes in
an arbitrary [expression](/docs/getting-started/expressions). If the expression
evaluates to a truthy value for the document, it will be in the result. A value
of "" (empty string) selects all documents.

It looks like the following:

```bash
curl -X POST http://localhost:8777/select/table_name \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"       \
  -H "Content-Type: application/json"                \
  -d '{"where": "eq($name, \"CookieFan37\")"}'
```

```typescript
await cookieDB.select("table_name", "eq($name, 'CookieFan37')");
```

<em>select</em> syntax :

```typescript
dbName.select(tableName, selector, options);
```

| function               | type    |                                   |
| ---------------------- | ------- | --------------------------------- |
| tableName:             | string, | existing table name               |
| [selector](#selector): | string, | expression defining the selection |
| [options](#options):   | string  | options regarding the output      |

<a id='options'></a>There are a lot of options you can pass to customize the
output of your query:

- <em> [returns](#formating)</em> - format the returns object(s)
- <em> [maxResults](#maxresults)</em> - Limit the number of results to a certain
  value (default: all)
- <em> [expandKeys](#foreign)</em> - Automatically join foreign keys with the
  objects they link to (default: false)
- <em> [order](#order)</em> \* (no sorting by default)
  - <em>by</em>- An arbitrary [expression](/docs/getting-started/expressions).
    Must result in a number or string.
  - <em>descending</em> - Whether to return the results in descending order

Here is an example of a more complex query using these options:

```bash
curl -X POST http://localhost:8777/select/table_name             \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"                   \
  -H "Content-Type: application/json"                            \
  -d '{"where": "eq($name, \"CookieFan37\")", "max_results": 5}'
```

```typescript
await cookieDB.select("table_name", "eq($name, 'CookieFan37')", {
  maxResults: 5,
  expandKeys: true,
});
```

Data used in the following

```typescript
const personsData: {}[] = [
  { firstName: "Luc", lastName: "Skywalker", age: 54, address: null },
  { firstName: "Elon", lastName: "Musk", age: 45, address: null },
  { firstName: "George", lastName: "Washington", age: 102, address: null },
  { firstName: "George", lastName: "Clooney", age: 87, address: null },
];
const locationsData = [
  { city: "Tatooine", state: "Milky Way" },
  { city: "San Francisco", state: "California" },
];
```

<details open><summary>

# <a id='selector'>Selector</a>

</summary>

## Select all document

```typescript
result = await cookieDB.select("person", "");

[{
    firstName: "Luc",
    lastName: "Skywalker",
    age: 54,
    address: null,
    key: "c2446bb9-48ba-4c59-ae71-ce0253dae1d2"
  },
  .........
    {
    firstName: "George",
    lastName: "Clooney",
    age: 87,
    address: null,
    key: "2c52afd7-806b-48d3-a910-d970b32f3268"
  }]
```

> Note : CookieDB adds the property <em>key</em> to the original
> <em>Schema</em>. This property contains a unique id identifying the document.

> Note : the document's schema must not include a property name <em>key</em> as
> it is added when inserting the document in the DB
> ([createTable](/docs/basic-api/create-table)). The <em>key</em> property is
> readonly.

### Using a selector expression

Using the "select" second argument to refine a selection is powerful.

#### A selector can be as simple as :

```typescript
result = await cookieDB.select("person", "eq($firstName, 'George')");
```

#### Or more complex :

```typescript
result = await cookieDB.select(
  "person",
"or( \
                                   and(\
                                       eq($firstName, 'George'), \
                                       gt($age, 100)), \
                                   not(eq($firstName, 'Luc')))",
);
```

returns Musk, Washington, Clooney.

#### Mathematique operator are also provided

```typescript
result = await cookieDB.select("person", "lt(subtract($age, 20), 26 )");
```

returns Musk

CookieDB provide a bunch of logical and mathematical operators. see
[expression](/docs/getting-started/expressions)

</details>

<details open><summary>

# <a id='formating'>Formating the Results</a>

</summary>

CookieDB offers a powerful way to format the object(s) returned setting the
third argument with the <em>return</em> option.

This option allows you to define the properties sent in response objects. It's
also possible to apply mathematical functions to the values of these parameters,
server side, before returning them.

## Selects the document's properties to return

Like SQL select, you can specify the returned properties for the selected
documents.

> With Cookie DB "$propertyName" stand for 'the value of the property in the
> document'. In the example below '<em>firstName: "$firstName"</em>' means : the
> property 'firstName' of the returned object will contain the value of the
> property 'firstName' of the selected document.

```typescript
result = await cookieDB.select("person", "", {
  return: { firstName: "$firstName", age: "$age" },
});
```

returns

```typescript
[
  { firstName: "Luc", age: 54, key: "e6567c8f-b8f7-4315-bb3e-251714551f8f" },
  { firstName: "Elon", age: 45, key: "f3300cff-a027-4d5f-b385-65eef92eef9b" },
  {
    firstName: "George",
    age: 102,
    key: "93435fea-3c59-4c72-b39d-8127b395560c",
  },
  { firstName: "George", age: 87, key: "543a990f-3622-4744-a325-6a6c88925014" },
];
```

> Important: The document's <em>key</em> is always added to the result

## Using operators to compose the properties to return

Using operator

```typescript
result = await cookieDB.select("person", "eq($firstName, 'Luc')", {
  return: { age: "add($age,1)", firstName: "$firstName" },
});
```

returns :

```typescript
[{ age: 55, firstName: "Luc", key: "2d0cb5f8-10f3-4beb-a337-976407ab4bcd" }];
```

## Naming returned properties

A returned property name is not related to an existing document property. ie.
the document property <em>age</em> can be returned with the <em>bla</em>
property : {bla: '$age'};

```typescript
result = await cookieDB.select("person", "", {
  return: { fullName: "join(to_upper($lastName),' ',$lastName)" },
});
```

retuns :

```typescript
[
  {
    fullName: "SKYWALKER Skywalker",
    key: "8ea34f28-1e35-4fda-8e49-ceb9d99a2c43",
  },
  { fullName: "MUSK Musk", key: "2d4f2593-76cf-41a8-a9d3-457478bd6f2d" },
  {
    fullName: "WASHINGTON Washington",
    key: "faa52065-d2d6-456e-b233-b627ff18e163",
  },
  { fullName: "CLOONEY Clooney", key: "7a41abee-3dec-4229-ae74-1e3efae64076" },
];
```

## datetime operators

As datetime are stored as unix milliseconds CookieDB offers a full set of date
and time related functions : year, month, hour,... see
[expression](/docs/getting-started/expressions).

```typescript
result = await cookieDB.select("person", "", {
  return: {
    firstName: "$firstName",
    birthdate: "subtract(year(current_time()), $age)",
  },
});
```

returns :

```typescript
[
  {
    firstName: "Luc",
    birthdate: 1969,
    key: "209d1a80-0043-425e-b433-12101927e372",
  },
  {
    firstName: "Elon",
    birthdate: 1978,
    key: "941e14e6-8a8c-475f-8fc7-940f2811358d",
  },
  {
    firstName: "George",
    birthdate: 1921,
    key: "bb2c255f-7722-4b32-bc29-295964ec0835",
  },
  {
    firstName: "George",
    birthdate: 1936,
    key: "7d2cb854-5e37-48e0-aa68-ef7ff8c3d46a",
  },
];
```

</details>

<details>
<summary>

# <a id='foreign'>Expend <em>foreing_key</em> with <em>expandKeys </em>option</a>

</summary>

The <em>expandKeys</em> option is related to properties with type
<em>foreign_key</em>. A <em>foreign_key</em> type document property contains
null or the key of an other document.

When <em>expandKeys</em> is absent or set to <em>false</em> CoockiDB returns the
value of the foreign_key property.

When <em>expandKeys</em> is set to <em>true</em> CoockiDB returns the content of
the document pointed by the <em>foreign_key</em> instead of the key. This
process is recursive.

```typescript
const personKeys: Document[] = await cookieDB.select("person", "");
const locationKeys: Document[] = await cookieDB.select("location", "");
```

- links location to person address

```typescript
await cookieDB.update("person", personKeys[0].key, {
  address: locationKeys[0].key,
});
```

- request document expansion

```typescript
result = await cookieDB.select("person", "eq($firstName, 'Luc')", {
  expandKeys: true,
});
```

- returns

```typescript
[{
  firstName: "Luc",
  lastName: "Skywalker",
  age: 54,
  address: {
    city: "Tatooine",
    state: "Milky Way",
    key: "3bb12d9f-58ac-4f1e-b45c-99051b60262d",
  },
  key: "78706873-0059-4d20-b3e2-0669ccf31acd",
}];
```

accessing extended data :

```typescript
console.log(result[0].address.city) >
  Tatooine;
```

</details>

<details open><summary>

# <a id='maxresults'>Limit results size with <em>maxResults </em>option</a>

</summary>
Limits the number of  output records when selecting.
If not present returns all selected records.

```typescript
result = await cookieDB.select("person", "", {
  maxResults: 2,
  return: { name: "$lastName" },
});
```

returns:

```typescript
[
  { name: "Skywalker", key: "a847443e-6e9a-40c5-96b6-e58680801f8b" },
  { name: "Musk", key: "9418dae9-96c9-4faf-8d34-a76792202f97" },
];
```

</details>

<details open><summary>

# <a id='order'>Orders results with <em>order </em>option</a>

</summary>
Ordering results of a <em>select</em> use an object with two properties :

- by: the name of the result's property to use for sorting
- descending : an optional boolean specifying the sort order. (default is
  descending)

descending (default)

```typescript
result = await cookieDB.select("person", "", {
  order: { by: "$age" },
  return: { name: "$lastName", age: "$age" },
});
```

```typescript
[
  {
    "name": "Washington",
    age: 102,
    key: "6d5078f3-ed13-4055-ac21-6c869bf5a603",
  },
  { "name": "Clooney", age: 87, key: "442aa679-4afe-4321-96b1-b605b6902adb" },
  { "name": "Skywalker", age: 54, key: "a1fb5bfe-346f-411f-8d7c-9867d22c28ca" },
  { "name": "Musk", age: 45, key: "3538a801-7774-4f06-9ad8-3d10abced886" },
];
```

ascending

```typescript
result = await cookieDB.select("person", "", {
  order: { by: "$age", descending: true },
  return: { name: "$lastName", age: "$age" },
});
```

```typescript
[
  { "name": "Musk", age: 45, key: "b957216e-1063-4194-bf4f-7488525e500d" },
  { "name": "Skywalker", age: 54, key: "1fce537b-e08a-476c-b4ea-5499274a2208" },
  { "name": "Clooney", age: 87, key: "7b7b798b-ceba-4cc3-972e-fe22e4b73816" },
  {
    "name": "Washington",
    age: 102,
    key: "21cf41a7-ef53-4802-8dde-a9b8bda9374d",
  },
];
```

> Important: The sorting property must be an output object property, not a
> property of the document.

```typescript
result = await cookieDB.select("person", "", {
  return: {
    name: "$lastName",
    birthdate: "subtract(year(current_time()), $age)",
  },
  order: { by: "$birthdate", descending: true },
});
```

```typescript
[
  {
    name: "Washington",
    birthdate: 1921,
    key: "0db2e66e-2f57-416a-b4d5-ac2f882296d3",
  },
  {
    name: "Clooney",
    birthdate: 1936,
    key: "281e0dfb-83e7-40e0-90c7-3f0fbcd5364a",
  },
  {
    name: "Skywalker",
    birthdate: 1969,
    key: "d202c979-847f-4a74-be6c-132aea221576",
  },
  {
    name: "Musk",
    birthdate: 1978,
    key: "eedc8cb1-1aa5-4535-8fd9-3031b5ddaf9c",
  },
];
```

\* Providing the order option disables some optimizations when querying the
database with the "Max Results" setting. Use sparingly.
</detail>
