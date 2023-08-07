var express = require('express');
var router = express.Router();
const itemServices = require('../../services/item_services')

// get all 
// router.get('/(:id)?', async (req, res, next) => {
//   const { id } = req.params;
//   let result = await itemServices.getItems(id);
//   res.send(result)
// })

router.post('/addform', async (req, res, next) => {
  await itemServices.saveItem(req.body)

  res.redirect('back')
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  let result = await itemServices.deleteItem(id);
  res.send(result)
})

module.exports = router;
