'use strict'

class Schema {
  constructor (resource) {
    this.resource = resource
    this.fields = {}
    this.versioned = false
    this.version = null
    this.frozen = false
  }

  field (/* version (if versioned), name, options */) {
    if (this.frozen) {
      throw new TypeError('Schema is frozen and cannot be changed')
    }
    var name, options, version
    if (this.versioned) {
      [version, name, options] = arguments
    } else {
      [name, options] = arguments
    }
    if (!name) {
      throw new TypeError('Field name is required')
    }
    if (!options) {
      options = {}
    }
    if (this.versioned && !version) {
      throw new TypeError('Field version is required')
    }
    this.fields[name] = options
  }

  freeze () {
    this.frozen = true
  }
}

module.exports = Schema
