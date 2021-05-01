const classes       = require('./mock/classes.json')
const teachers      = require('./mock/teachers.json')
const students      = require('./mock/students.json')
const degrees       = require('./mock/degrees.json')
const matters       = require('./mock/matters.json')
const relationships = require('./mock/relationships.json')

module.exports = function() {
  return {
    classes,
    teachers,
    students,
    degrees,
    matters,
    relationships,
  }
}
