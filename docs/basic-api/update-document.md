# Update a document

In CookieDB, updating a document can be done via a document key, table, and a
partial document. This will throw if the document doesn't exist, if the document
isn't a part of the specified table, or if the table doesn't exist.

```bash
curl -X POST http://localhost:8777/update/table_name/document_key \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"                    \
  -H "Content-Type: application/json"                             \
  -d '{"name": "HugeCookieFan37"}'
```

```typescript
await cookieDB.update("table_name", "document_key", {
  name: "HugeCookieFan37",
});
```
