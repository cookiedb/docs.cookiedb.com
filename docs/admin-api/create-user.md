# Creating a user

Creating a user is quite simple. Please note that this requires an admin token:

```bash
curl -X POST http://localhost:8777/create_user \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"          \
  -d '[{"username": "cookie_user"}]'
```

```typescript
await cookieDB.createUser({
  username: "cookie_user",
  token: "some_strong_and_rng_token",
  admin: true,
});
```
