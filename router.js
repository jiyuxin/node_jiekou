const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const students = require('./student')

router.get('/students', function (req, res) {
  students.find(function (err, data) {
    if (err) {
      return res.state(500).send('404 not found')
    }
    res.render('index.html', {
      frites: ['apple', 'blanana'],
      students: JSON.parse(data).students
    })
  })
})

router.get('/students/new', function (req, res) {
  res.render('new.html')
})

router.post('/students', function (req, res) {
  students.save(req.body, function (err) {
    if (err) {
      return res.state(500).send('404 not found')
    }
    res.redirect('/students')
  })
})

router.get('/students/edit', function (req, res) {
  students.updataById(req.query.id, function (err, data) {
    if (err) {
      return res.state(500).send('404 not found')
    }
    res.render('edit.html', {
      students: data
    })
  })
})

router.post('/students/edit', function (req, res) {
  students.updata(req.body, function (err) {
    if (err) {
      return res.state(500).send('404 not found')
    }
    res.redirect('/students')
  })
})

router.get('/students/delete', function (req, res) {
  students.delete(req.query.id, function (err) {
    if (err) {
      return res.state(500).send('404 not found')
    }
    res.redirect('/students')
  })
})

router.get('/jiekou', function (req, res) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return res.state(500).send('404 not found')
    }
    var students = JSON.parse(data).students
    res.status(200).json({
      success: true,
      students: students
    })
  })
})

router.get('/test', function (req, res) {
  res.render('test.html')
})
















module.exports = router