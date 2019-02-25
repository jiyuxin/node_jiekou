const fs = require('fs')
const path = require('path')
dbPath = path.join(__dirname, './db.json')
//find
exports.find = function (cb) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return cb(err, data)
    }
    cb(null, data)
  })
}

//save
exports.save = function (student, cb) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return cb(err)
    }
    students = JSON.parse(data).students
    student.id = parseInt(students[students.length - 1].id) + 1 
    students.push(student)
    str = JSON.stringify({students: students})
    fs.writeFile(dbPath, str, function (err) {
      if (err) {
        return cb(err)
      }
      cb(null)
    })
  })
}
//updataById
exports.updataById = function (id, cb) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return cb(err)
    }
    var stuArr = JSON.parse(data).students
    var curStu = stuArr.find(function (item) {
      return id == item.id
    })
    cb(null, curStu)
  })
}

//updata
exports.updata = function (student, cb) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return cb(err)
    }
    var stuArr = JSON.parse(data).students
    student.id = parseInt(student.id)
    var stu = stuArr.find(function (item) {
      return student.id === item.id
    })
    for (var key in student) {
      stu[key] = student[key]
    }
    var stuStr = JSON.stringify({students: stuArr})
    fs.writeFile(dbPath, stuStr, function (err) {
      if (err) {
        return cb(err)
      }
      cb(null)
    })
  })
}

//delete
exports.delete = function (id, cb) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return cb(err)
    }
    id = parseInt(id)
    var students = JSON.parse(data).students
    var index = students.findIndex(function (item) {
      return id === item.id
    })
    students.splice(index, 1)
    var stuStr = JSON.stringify({students: students})
    fs.writeFile(dbPath, stuStr, function (err) {
      if (err) {
        return cb(err)
      }
      cb(err)
    })
  })
}
