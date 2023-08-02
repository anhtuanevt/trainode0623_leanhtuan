const mainModel = require('../models/item_models')
    
module.exports = {
    saveItem: async (id, data) => {
        let results = ''
        if (id) {
            results = await mainModel.findByIdAndUpdate(id, data)
        } else {
            results = await mainModel.create(data);
        }
        return results
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