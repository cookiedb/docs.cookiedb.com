# Documents

Documents are simply just JSON objects. Let's look at an example of a document:

```json
{
  "username": "CookieFan37",
  "profile": {
    "description": null,
    "age": 2,
    "loves_cookies": true,
    "best_friend": "3b851830-4a4d-4550-a235-4fefd278c567"
  },
  "joined_at": 1673724963
}
```

As you can see, they can be nested objects. There are a few limitations that
you should be aware of:

- Documents cannot have a top-level key by the name of "key". This is reserved
  for storing the document key.
- Documents cannot have keys with a "." in them. This is because the "." is the
  seperator chosen for nested objects in
  [expressions](/docs/getting-started/expressions).
- Documents cannot have arrays in them. This is a design decision to force users
  like you to normalize data. Please just normalize data, denormalization is an
  awful bug-ridden paradigm.
