# Delete a document

In CookieDB, deleting a document can be done via a document key and a table.
This will throw if the document doesn't exist, if the document isn't a part of
the specified table, or if the table doesn't exist.

```bash
curl -X POST http://localhost:8777/delete/table_name/document_key \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```typescript
await cookieDB.delete("table_name", "document_key");
```
