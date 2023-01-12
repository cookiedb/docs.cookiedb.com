# Creating a database

The core concept of CookieDB is a "database". In alternatives, this is often
called a "instance" or an "database instance".

## Cloud hosting

If you are using the cloud managed hosting website, this is quite simple.

First, you must [create an account](https://cookiedb.com/signup). Currently, you
are able to create an account using a github, a gitlab, or a bitbucket account.

After this, we can simply click the "New Database" button which will take you to
[this page](https://cookiedb.com/app/new). You're done!

## Self hosting

Alternatively, you can host the database yourself. This is a little more
complicated, but the steps are still quite simple.

At the moment, CookieDB is not stable so there is no independant executable that
is provided. The first step is to install
[Deno](https://deno.land/manual/getting_started/installation), a new open-source
javascript runtime. CookieDB is currently built on it.

Next, you should just be able to run the following command. This will install
the executable and add it to your path.

```bash
deno install -Af -n cookie https://deno.land/x/cookiedb/cli.ts
```

Now, navigate to the directory you want and type:

```bash
cookie init ./my_first_cookie
```

This will create a new directory and will add a configuration file. You should
almost never need to touch them. It currently has the following settings.:

```javascript
{
  "port": 8777, // CookieDB http server port
  "log": false, // Log debug events into the console
  "users": {}, // The users and their access tokens
  "admins": [], // The administrative users
  "advanced": { // Performance tuning. Don't touch.
    "max_documents_per_chunk": 10000
  }
}
```

The next step is to create a user. In this example, the user is an adminstrator, but unless you have a niche usecase, this is not needed.

```
cookie create_user ./my_first_cookie --admin
```

Lastly, to start your server, run:

```bash
cookie start ./my_first_cookie
```

If you ever get lost, you can simply type `cookie help` to get your bearings.
