# Introduction

CookieDB is a fresh take on an old concept of the database. At its core, the
philosophy of CookieDB is simple. Here, we believe three things:

- Serverless has its place in modern architecture.*
- Storing and processing data should be very cheap.
- Developer experience is more important than maximal performance.

Given this philsophical stance, we set out to build the tool that we wished
existed. A lot of the core design of the database is unique because of it does
not rely on the precendence that has been set by a lot of modern database
solutions. There are no raw TCP sockets. There are no connection pools. There
are no overly-complicated ORMs.

Some stand out features:

- Built for serverless
- Libraries for all major languages
- Schema-full tables
- New take on a simple query language
- Completely open source

*Serverless is not perfect for every application. If you don't want to use
serverless, CookieDB still will work for you. However, in the cases were
serverless doesn't work, performance tends to be the limiting factor and you
should use something like Postgres.
