# Editing a table

Sometimes there are moments where you created a table only to realize you messed
up the naming or want to add a new column to the schema. CookieDB makes this
trivial. You may include any combination of a new name, a new schema, or an
alias.

```bash
curl -X POST http://localhost:8777/create/table_name  \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"        \
  -H "Content-Type: application/json"                 \
  -d '{"name": "new_table_name"}'
```

```typescript
await cookieDB.editTable("table_name", {
  name: "new_table_name",
  schema: {
    name: "string",
    age: "number",
    is_cool: "boolean",
  },
  alias: {
    name: "$name",
    age: "$age",
    is_cool: "gt($age, 10)",
  },
});
```
