# google-function-resource

__(Currently under development)__

A mostly RESTful single-resource handler for [Google Cloud HTTP Functions](https://cloud.google.com/functions/docs/writing/http).

Dependencies:

* [Google Datastore](https://cloud.google.com/datastore/) to store resource data (via [gstore-node](https://github.com/sebelga/gstore-node))

## Expected Usage

To handle a resource called "Todo", create a new Google HTTP Function called "todos" with the following code:

```javascript
const resource = require('google-function-resource')('Todo'); // <-- name your resource here
resource.schema = {
  title: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    excludeFromIndexes: true
  }
};

exports.handleRequest = function (req, res) {
  resource.manage(req, res);
};
```

As a result, the following endpoints will become available:

* `POST /todos` - creates a new Todo
* `PUT /todos/1` - updates Todo ID=1
* `GET /todos/1` - shows Todo ID=1
* `GET /todos` - shows a list of Todos
* `DELETE /todos/1` - deletes Todo ID=1

## Naming Conventions

The resource name is used as the datastore "kind", and it's recommended to be in singular, capitalized form (__Todo__).

The resource path is the name of the function (as enforced by Google), and it's recommended to be in plural, lowercase form (__todos__).

__This is a work in progress.__
