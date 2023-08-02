var express = require('express');
var router = express.Router();
const itemServices = require('../../services/item_services')

// get all 
router.get('/(:id)?', async (req, res, next) => {
  const { id } = req.params;
  let result = await itemServices.getItems(id);
  res.send(result)
})

router.post('/(:id)?', async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  let result = await itemServices.saveItem(id, data);
  res.send(result)
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  let result = await itemServices.deleteItem(id);
  res.send(result)
})

module.exports = router;
