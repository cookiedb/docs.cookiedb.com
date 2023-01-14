# Insert a document

In CookieDB, inserting a document into a table simply requires a table name and
a document. This will throw an error if the document doesn't match the schema.
This will result in a string representing the document's key.

```bash
curl -X POST http://localhost:8777/insert/table_name \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"       \
  -H "Content-Type: application/json"                \
  -d '{"name": "CookieFan37", "is_cool": true}'
```

```typescript
await cookieDB.insert("table_name", {
  name: "CookieFan37",
  is_cool: true,
});
```

We can also bulk insert more than one document into a table. This is
signficantly more efficient than inserting each one individually. This will
result in an array of strings representing the keys of each document.

```bash
curl -X POST http://localhost:8777/insert/table_name     \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"           \
  -H "Content-Type: application/json"                    \
  -d '[{"name": "CookieFan37"}, {"name": "CookieHater"}]'
```

```typescript
await cookieDB.insert("table_name", [
  {
    name: "CookieFan37",
    is_cool: true,
  },
  {
    name: "CookieHater01",
    is_cool: false,
  },
]);
```
