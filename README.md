# google-function-resource

[![Build Status](https://semaphoreci.com/api/v1/pauloddr/google-function-resource/branches/master/shields_badge.svg)](https://semaphoreci.com/pauloddr/google-function-resource)
[![Test Coverage](https://lima.codeclimate.com/github/pauloddr/google-function-resource/badges/coverage.svg)](https://lima.codeclimate.com/github/pauloddr/google-function-resource/coverage)
[![Code Climate](https://lima.codeclimate.com/github/pauloddr/google-function-resource/badges/gpa.svg)](https://lima.codeclimate.com/github/pauloddr/google-function-resource)
[![npm version](https://badge.fury.io/js/google-function-resource.svg)](https://badge.fury.io/js/google-function-resource)

A simple resource management system for [Google Cloud HTTP Functions](https://cloud.google.com/functions/docs/writing/http).

It stores data in [Google Datastore](https://cloud.google.com/datastore/) using [gstore-node](https://github.com/sebelga/gstore-node).

## Usage

For a resource named "Task" for example, create a new Google HTTP Function to manage your resource with the following code:

```javascript
const tasks = require('google-function-resource')({
  name: 'Task',
  schema: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    createdOn: {
      type: 'datetime',
      write: false,
      excludeFromIndexes: true
    },
    modifiedOn: {
      type: 'datetime',
      write: false,
      excludeFromIndexes: true
    }
  }
})

exports.handleRequest = function (req, res) {
  tasks.manage(req, res)
}
```

Add the library to __package.json__:

```json
{
  "name": "your-function",
  "version": "0.0.1",
  "dependencies": {
    "google-function-resource": "0.2.0"
  }
}
```

Finally, make sure the __entry point__ is correct. In the example above, it should be `handleRequest`.

Then, assuming you named your function "tasks", the following endpoints will be served by your function:

* `POST /tasks`
* `GET /tasks`
* `GET /tasks/:id`
* `PUT|PATCH /tasks/:id`
* `DELETE /tasks/:id`
* `OPTIONS /tasks`

Read more about how each endpoint works in the next section.

## Actions

For the next sections, keep in mind that the resource endpoint is determined by the name of your function. So when this document says:

* `POST /resources`

And your function is named "tasks", then the correct endpoint will be:

* `POST /tasks`

### Create Resource

* `POST /resources`

This endpoint creates a new resource.

<table>
<tr><th>Request Body</th><th>Response (201)</th></tr>
<tr><td>

```javascript
{
  "title": "My New Task",
  "description": "description of my new task"
}
```

</td><td>

```javascript
{
  "id": "12345",
  "title": "My New Task",
  "description": "description of my new task",
  "createdOn": "..."
}
```

</td></tr>
</table>

### List Resources

* `GET /resources`

Returns a list of resources with pagination. Default page size is 20.

<table>
<tr><th>Request Query Parameters</th><th>Response (200)</th></tr>
<tr><td>

* `/resources`
  * first 20 resources
* `/resources?limit=10`
  * first 10 resources
* `/resources?start=NextPageKey000123`
  * first 20 resources
  * starting from key "NextPageKey000123"

</td><td>

Body:

```javascript
{
  [
    {"id": "1", ...},
    {"id": "2", ...},
    ...
  ]
}
```

Headers:

* `X-Next-Page-Cursor`: `"NextPageKey000123"`

</td></tr>
</table>

The `X-Next-Page-Cursor` header will be absent if there are no more entries to fetch.

(Filters and sorting are not yet supported.)

### Show Resource

* `GET /resources/:id`

Returns data of a single resource.

<table>
<tr><th>Request URI</th><th>Response (200)</th></tr>
<tr><td>

* `/resources/12345`

</td><td>

```javascript
{
  "id": "12345",
  "title": "My Task",
  "description": "description of task",
  "createdOn": "..."
}
```

</td></tr>
</table>

### Update Resource

* `PUT /resources/:id`
* `PATCH /resources/:id`

Updates data of a single resource.

Both `PUT` and `PATCH` methods behave the same way, and partial data can be provided.

<table>
<tr><th>Request Body</th><th>Response (200)</th></tr>
<tr><td>

```javascript
{
  "title": "My edited Task"
}
```

</td><td>

```javascript
{
  "id": "12345",
  "title": "My edited Task",
  // ... rest of fields
}
```

</td></tr>
</table>

### Destroy Resource

* `DELETE /resources/:id`

Removes a resource.

<table>
<tr><th>Request Body</th><th>Response (204)</th></tr>
<tr><td>(empty)</td><td>(empty)</td></tr>
</table>

## Configuration

Settings can be customized upon requiring the library, and have the following defaults:

```javascript
const tasks = require('google-function-resource')({

  // Resource name. Must be set!
  // It will be used as the entity name in Datastore.
  // Recommended format: singular, capitalized. Ex: "Task"
  name: null,

  // Datastore settings.
  datastore: {
    namespace: undefined
  },

  // You must provide the full schema.
  // This is just a working placeholder.
  schema: {
    name: {
      type: 'string',
      excludeFromIndexes: true
    },
    createdOn: {
      type: 'datetime',
      write: false,
      default: Gstore.defaultValues.NOW,
      excludeFromIndexes: true
    },
    modifiedOn: {
      type: 'datetime',
      write: false,
      excludeFromIndexes: true
    }
  },

  // Customize CORS headers here to anything you'd like.
  // Multiple headers are accepted.
  cors: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'origin, content-type, accept'
  }

})

exports.handleRequest = function (req, res) {
  tasks.manage(req, res)
}
```

If you want to customize Schema validators with your own functions, take a look at the [Gstore Schema documentation](https://sebelga.gitbooks.io/gstore-node/content/schema/).

## TODO/Wishlist

* Google reCAPTCHA support on resource creation and update.
* Support other data stores (like MySQL).

## License

MIT
