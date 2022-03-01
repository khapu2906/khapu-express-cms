# spy-84-cms

---
## Introduction

Be developed with core include express, sequelize, handlebars-express. You can use this CMS in the easy way

---

## Structure

```
Your project
| app
|_ _http
|_ _ controllers
|_ _ middware 
|_ models
|_ providers
|_ _ index.js
| bootstrap
|_ index.js
| configs
|_ app.js
|_ cache.js
|_ database.js
|_ index.js
|_ route.js
|_ view.js
| database
|_ migrations
|_ seeders
| public
|_ storage
| resource
|_ views
|_ _ layout
|_ _ _ main.uniform
| routes
|_ api.js
|_ web.js
| .env
| server.js
```
---

## Install
```

npm i spy-84-cms

```

---
## Usage

* Helper:

  ```
  spy help

  ```
    **or**
  ```
  npx spy prepare

  
* Generate structure by:

  ```
  spy prepare
  spy prepare:model --name=<required> //Be used to generate a model  
  spy prepare:controller --name=<required> //Be used to generate a controller  

  ```
    **or**
  ```
  npx spy prepare

  ```

* Run by
  ```
  spy go

  ```
    **or**
  ```
  npx spy go

  ```
  **or**
  ```
  node server.js

  ```

