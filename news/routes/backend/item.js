const { name } = require('ejs');
var express = require('express');
var router = express.Router();
let data = [];
const fs = require('fs');
const filePath = "/Users/adminhr/Desktop/trainode0623_leanhtuan/news/mockup-data.json";


// get data
router.get(('/(:name)?'), function (req, res, next) {
  let data = []
  const { name } = req.params;
  try {
    let result = fs.readFileSync(filePath, 'utf8')
    data = JSON.parse(result)
  } catch (error) {
    console.log(error);
  }
  if (name) {
    data = data.find(item => item.name == name);
  }
    res.send(data);
});

// add 
router.post('/', function (req, res, next) {
  const {name,age} = req.body;
  try {
    let result = fs.readFileSync(filePath, 'utf8')
    data = JSON.parse(result)
    data.push({ name, age })
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')  
  } catch (error) {
    console.log(error)
  }
  res.send({name, age})
});


router.post(('/edit'), function (req, res, next) {
  const { name, age } = req.body
  try {
    let result = fs.readFileSync(filePath, 'utf8')
    data = JSON.parse(result)
    data.forEach(item => {
    if (item.name == name) {
      item.age = age;
    }
  })
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
  } catch (error) {
    console.log(error);
  }
  
  res.send({data})
});


// delete
router.delete(('/'), function (req, res, next) {
  const { name, age } = req.body
  let newData= []
  try {
    let result = fs.readFileSync(filePath, 'utf8')
    data = JSON.parse(result)
    newData = data.filter(item => item.name !== name)
    fs.writeFileSync(filePath, JSON.stringify(newData), 'utf8') 
  } catch (error) {
    console.log(error);
  }
  
  res.send({newData})
});



module.exports = router;
