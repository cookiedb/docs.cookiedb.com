# Regenerating tokens

Regenerating a token for a user is quite simple. Please note that this requires
an admin token:

```bash
curl -X POST http://localhost:8777/regenerate_token/cookie_user \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```typescript
await cookieDB.regenerateToken("cookie_user");
```
