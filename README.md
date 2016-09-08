# Kog

An extremely opinionated javascript web framework.

**The Zen of Kog.**
*There should be one-- and preferably only one --obvious way to do it.*
*Boilerplate should be abstracted.*
*Builds should be abstracted.*
*Things not required to create your app should be abstracted.*
*Development tools should be implicit.*
*Modules, components and container creation should be automated.*
*Builds are too slow for development.*
*The W3C standard is correct. Lets only use that.*
*More time should be spent on your app than setup.*

Server:
Express is the best backend framework.
Mongoose is the best ORM.

Client:
React is the best frontend framework.
Redux is even better.

Routes:
React-Router is amazing.  Isomorphic javascript will help.

Development:
Webpack is the best for react.
Babel is the closest to the W3C standard.
Browser Sync is the best, because of multi-device reloading.

Testing:
Mocha.






Commands:
Run Production Server:
```
NODE_ENV=production npm run start
```
Use this and not start:prod because it actually sets the NODE_ENV=production
and some of the files rely on process.env.NODE_ENV (debug)

Run Development Server
```
npm run start
```


**Why I chose to make this:**
If you look at a lot of the leading web-frameworks, they often say that their frameworks
are *"unopinionated"*.  This is good in some circumstanced, but makes it difficult
to know which way is the *best* way.  In my opinion, this is the best way.

***TODO:***
Abstract the boilerplate through middleware and subclassing.
Add a configuration file to add control over certain features.
Create a CLI to start a project, create react components, and create server models,
and to run the server.
