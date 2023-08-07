const mainModel = require('../models/item_models')
    
module.exports = {
    saveItem: async (data) => {
        let result = ''
        result = await mainModel.create(data)
    },



    getItems: async (id) => {
        let result = ''
        if (id) {
            result =  await mainModel.findById(id);
        } else {
            result = await mainModel.find({});
        }
        return result;
    },

    deleteItem: async (id) => {
        return mainModel.findByIdAndRemove(id)
    }
}