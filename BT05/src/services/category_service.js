const mongoose              = require('mongoose');
const categoryModel         = require('../models/category_model')

module.exports = {
    saveItem: async (data) => {
        return await categoryModel.create(data);
    },

    updateDataById: async (id, newData) =>{
        try {
            return await categoryModel.findByIdAndUpdate(id, newData, { new: true });
        } catch (error) {
            console.error('Error updating document:', error);
        }
    },

    changeStatus: async (id, status) =>{
        try {
            return await categoryModel.findByIdAndUpdate(id, {status} )
        } catch (error) {
            console.error('Error updating document:', error);
        }
    },

    changeMultipleStatus: async (id, status) => {
        try {
            const filter = { _id: { $in: id } }; 
            const update = { $set: { status: status } };
    
            const result = await categoryModel.updateMany(filter, update).exec();
            console.log('Updated documents:', filter, result);
        } catch (error) {
            console.error('Error updating documents:', error);
        }
    },

      deleteMulti: async (id) => {
        try {
            const filter = { _id: { $in: id } }; 
            const result = await categoryModel.remove(filter).exec();
            console.log('Updated documents:', filter, result);
        } catch (error) {
            console.error('Error updating documents:', error);
        }
    },
    

    changeOrdering: async (id, ordering) =>{
        try {
            return await categoryModel.findByIdAndUpdate(id, {ordering} )
        } catch (error) {
            console.error('Error updating document:', error);
        }
    },

    getItems: async (keyword, condition, sorting, currentPage, itemsPerPage) => {
        let query = categoryModel.find();
        const startIndex = (currentPage - 1) * itemsPerPage;

        if (keyword) {
            query = query.find({ name: { $regex: keyword, $options: 'i' } });
        }

        if (condition.status !== 'all') {
            query = query.find(condition);
        }

        if (sorting) {
            query = query.sort(sorting);
        }

        if (currentPage) {
            query = query.find().skip(startIndex)
            .limit(itemsPerPage);
        }
        const totalItems = await categoryModel.countDocuments(query.getQuery()); 

        const result = await query.exec();
        return {
            totalItems: totalItems,
            items: result
        };
    },



    getItemByID: async (id) => {
        let item = {
            _id: '',
            name: '',
            ordering: 0,
            status: 'novalue'
        }
        try {
            if (id) {
                item = await categoryModel.findById(id).exec();
            }
        } catch (err) {
            console.log(err);
        }
        return item;
    },

    countStatus: async (value) => {
        let condition = (value == 'all') ? {} : {status: value}
        try {
            return await categoryModel.countDocuments(condition);
        } catch (err) {
            console.error(err);
        }
    },

    deleteItem: async (id) => {
        try {
            return await categoryModel.findByIdAndRemove(id)
        } catch (error) {
            console.log(error);
        }
    },

}
