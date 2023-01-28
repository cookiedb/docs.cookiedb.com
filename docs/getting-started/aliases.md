# Aliases

Aliases are simply just JSON objects where every key is an
[expression](/docs/getting-started/expressions). They are used to generate new
documents from existing documents.

```json
{
  "username": "add($username, 'W')",
  "profile": {
    "description": "coalesce($description, 'No description provided')",
    "age": "add($age, 1)",
    "loves_cookies": "gt_eq($age, 1)",
    "best_friend": "$best_friend"
  },
  "joined_at": "$joined_at"
}
```

As you can see, they can be nested objects. They are used all over the place in
CookieDB, from [selecting documents](/docs/basic-api/select-documents) to
[editing tables](/docs/basic-api/edit-table).
