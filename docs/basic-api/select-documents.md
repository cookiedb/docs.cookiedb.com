# Selecting documents

Perhaps the most complicated part of every database is the querying of
documents. CookieDB tries to make this as easy as possible by making everything
an option instead of text incantation.

A basic selection only uses the "where" option, which takes in an arbitrary
[expression](/docs/getting-started/expressions). If the expression evaluates to
a truthy value for the document, it will be in the result.

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

There are a lot of additional options you can pass to customize your query:

- Max Results - Limit the number of results to a certain value (default: -1)
- Expand Keys - Automatically join foreign keys with the objects they link to
  (default: false)
- Order\* (not on by default)
  - By - An arbitrary [expression](/docs/getting-started/expressions). Must
    result in a number or string.
  - Descending - Whether to return the results in descending order

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

\* Providing the order option disables some optimizations when querying the
database with the "Max Results" setting. Use sparingly.
