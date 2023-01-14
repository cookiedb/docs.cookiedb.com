# Dropping a table

In CookieDB, dropping a table can be simply done by the name of the table. This
will throw an error if the table does not exist.

```bash
curl -X POST http://localhost:8777/drop/table_name \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```typescript
await cookieDB.dropTable("table_name");
```
