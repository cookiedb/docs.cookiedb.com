# Getting metadata

In CookieDB all tables have certain metadata attributes that may be useful. We
can easily query metadata for certain tables as follows. If the table does not
exist, it will error.

```bash
curl -X POST http://localhost:8777/meta/table_name \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```typescript
await cookieDB.metaTable("table_name");
```

Sometimes we want to query what tables exist, or just query metadata for the
entire database. This can be done quite easily as well.

```bash
curl -X POST http://localhost:8777/meta        \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```typescript
await cookieDB.meta();
```
