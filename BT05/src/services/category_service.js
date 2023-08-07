const categoryModel = require('../models/category_model')

module.exports = {
    saveItem: async (id, data) => {
        console.log(id);
        
        if (data && id) {
            return await categoryModel.findByIdAndUpdate(id, data, { new: true });
        } else {
            return await categoryModel.create(data);
        }
  },

    getItems: async () => {
        return await categoryModel.find({});
    },

    getItem: async (id) => {
        let item = {
            name: '',
            ordering: 0,
            status: 'novalue'
        }
        try {
            if (id) {
                item = await categoryModel.findById(id).exec();
                console.log("item is ", item);
            }
        } catch (err) {
            console.log(err);
        }
        return item;
    },

    deleteItem: async (id) => {
        return await categoryModel.findByIdAndRemove(id)
    }
}
