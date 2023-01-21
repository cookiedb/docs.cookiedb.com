# Creating a table

In CookieDB all table creation is under the concept of "create if not exists".
You are able to use any table name you like, except for those prefixed and
suffixed by double underscores.

```bash
curl -X POST http://localhost:8777/create/table_name \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```typescript
await cookieDB.createTable("table_name");
```

If we want to add a schema (and we should), we can simple include a json body as
the schema.

```bash
curl -X POST http://localhost:8777/create/table_name  \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"  \
  -H "Content-Type: application/json"           \
  -d '{"name": "string", "is_cool": "boolean"}'
```

```typescript
await cookieDB.createTable("table_name", {
  name: "string",
  is_cool: "boolean",
});
```
