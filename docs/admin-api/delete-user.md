# Deleting a user

Deleting a user is quite simple. Please note that this requires an admin token:

```bash
curl -X POST http://localhost:8777/delete_user/cookie_user \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```typescript
await cookieDB.deleteUser("cookie_user");
```
