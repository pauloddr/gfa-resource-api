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
const GoogleFunctionResource = require('google-function-resource')

const Tasks = new GoogleFunctionResource('Task')

// Define the schema.
Tasks.schema.field('title')
Tasks.schema.field('description')

exports.handleRequest = function (req, res) {
  Tasks.manage(req, res)
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

Finally, make sure the __entry point__ is correct. In the example above, it should be `handleRequest`. You can change it to your liking, just make sure they're the same value.

Click __Save__ to deploy your new function.

Then, assuming you named your function "tasks", the following endpoints will be served:

* `POST /tasks`
* `GET|HEAD /tasks`
* `GET|HEAD /tasks/:id`
* `GET /tasks/schema`
* `PUT|PATCH /tasks/:id`
* `DELETE /tasks/:id`
* `OPTIONS /tasks`

Read more about how each endpoint works in the next section.

## Actions

For the next sections, keep in mind that the resource path is determined by the name of your function. So when this document says:

* `POST /tasks`

It assumes that the function is named "tasks". If you named your function "notes", the endpoint will be instead:

* `POST /notes`

### Create Resource

* `POST /tasks`

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
  "description": "description of my new task"
}
```

</td></tr>
</table>

### List Resources

* `GET /tasks`

Returns a list of resources with pagination. Default page size is 20.

<table>
<tr><th>Request Query Parameters</th><th>Response (200)</th></tr>
<tr><td>

* `/tasks`
  * first 20 resources
* `/tasks?limit=10`
  * first 10 resources
* `/tasks?start=NextPageKey000123`
  * first 20 resources
  * starting from key "NextPageKey000123"

</td><td>

__Body:__

```javascript
[
  {"id": "1", ...},
  {"id": "2", ...},
  ...
]
```

__Headers:__

* `X-Page-Size`: `20`
* `X-Next-Page-Cursor`: `"NextPageKey000123"`

</td></tr>
</table>

The `X-Next-Page-Cursor` header will be absent if there are no more entries to fetch.

(Filters and sorting are not yet supported.)

### Show Resource

* `GET /tasks/:id`

Returns data of a single resource.

<table>
<tr><th>Request URI</th><th>Response (200)</th></tr>
<tr><td>

`/tasks/12345`

</td><td>

```javascript
{
  "id": "12345",
  "title": "My Task",
  "description": "description of task"
}
```

</td></tr>
</table>

### Update Resource

* `PUT /tasks/:id`
* `PATCH /tasks/:id`

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

* `DELETE /tasks/:id`

Removes a resource.

<table>
<tr><th>Request Body</th><th>Response (204)</th></tr>
<tr><td>(empty)</td><td></td></tr>
</table>

### Resource Schema

* `GET /tasks/schema`

Returns the resource schema. Useful for building automated forms.

<table>
<tr><th>Request Body</th><th>Response (200)</th></tr>
<tr><td>(empty)</td><td>

```javascript
{
  "fields": [
    {"name": "title", "type": "string", "required": "true"},
    {"name": "description", "type": "string", "length": 2000}
  ]
}
```

</td></tr>
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
    namespace: undefined,

    // Default page size when listing resources.
    limit: 20
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

  // Customize CORS headers here.
  cors: {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'origin, content-type, accept',

    // Better secure your API by allowing only specific domains.
    'Access-Control-Allow-Origin': '*',

    // Make sure you keep the exposed headers below
    //   or pagination may fail on the client side.
    'Access-Control-Expose-Headers': 'x-next-page-cursor, x-page-size'
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
