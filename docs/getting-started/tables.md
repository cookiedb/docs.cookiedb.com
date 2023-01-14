# Tables

One can think of tables in CookieDB much like tables in SQL or collections in
MongoDB. They are at heart just a way to group of bunch of
[documents](/docs/getting-started/documents) together.

One advantage of CookieDB over a document database like MongoDB is that it has
support for true and proper schemas. A table schema is a way to enforce a
certain pattern on the documents a table contains. For example, if I wrote the
following schema for the table "users":

```json
{
  "username": "string",
  "age": "number"
}
```

I would be guarenteeing at the database level that all documents I insert will
match this exact shape. To define schemas a little more systematically, they are
a recursive object in which the keys are the keys that the documents should have
and the values are keywords that contain some rule to be enforced on those keys.
CookieDB currently has support for the following keywords:

- Types
  - `string` - Enforces this value is text
  - `number` - Enforces this value is a number (integer or floating point)
  - `boolean` - Enforces this value is a boolean (true or false)
  - `foreign_key` - Enforces this value is a foreign key (a string representing
    a link to another document)
- Rules
  - `nullable` - Allows this key to be of the specified value OR null
  - `unique` - Enforces that this value is unique among the whole table

For a more comprehensive example of a schema. Let's see a more complete user
example:

```json
{
  "username": "unique string",
  "profile": {
    "description": "nullable string",
    "age": "number",
    "loves_cookies": "boolean",
    "best_friend": "nullable foreign_key"
  },
  "joined_at": "number"
}
```

I would like to note a design choice here. There is no `date` type. This is
intentional. Dates should really be represented as a unix timestamp (in
numerical form). Unix timestamps do not suffer from timezones. Unix timestamps
do not need to worry about leap seconds. Please just use unix timestamps.
