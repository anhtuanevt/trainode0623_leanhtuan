const mongoose              = require('mongoose');
const categoryModel         = require('../models/category_model')

module.exports = {
    saveItem: async (data) => {
        return await categoryModel.create(data);
    },

    updateDataById: async (id, newData) =>{
        try {
            const idToUpdate = mongoose.Types.ObjectId(id);
            return await categoryModel.findByIdAndUpdate(idToUpdate, newData, { new: true });
            console.log('Updated document:');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    },

    // getItems: async (keyword, condition, sorting) => {
    //     let result = '';

    //     if (keyword) {
    //         if (condition.status === 'all') {
    //             result = await categoryModel.find({ name: { $regex: keyword, $options: 'i' } });
    //         } else {
    //             result = await categoryModel.find({
    //                 name: { $regex: keyword, $options: 'i' },
    //                 ...condition
    //             });
    //         }
    //     } else {
    //         // filter
    //         if (condition.status === 'all') {
    //             result = await categoryModel.find({});
    //         } else {
    //             result = await categoryModel.find(condition );
    //         }
    //     }

    //     if (sorting) {
    //         result = await result.find.sort(sorting)
    //     }
        
    //     return result;
    // },

    getItems: async (keyword, condition, sorting) => {
        let query = categoryModel.find();

        if (keyword) {
            query = query.find({ name: { $regex: keyword, $options: 'i' } });
        }

        if (condition.status !== 'all') {
            query = query.find(condition);
        }

        if (sorting) {
            query = query.sort(sorting);
        }

        let result = await query.exec();

        return result;
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

    pagination: async () => {
        // page setting
        const page = req.query.page || 1; 
        const itemsPerPage = 3; 

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;

        const totalItems = await categoryModel.countDocuments(); 
        const totalPages = Math.ceil(totalItems / itemsPerPage); 

        const items = await categoryModel.find().skip(startIndex)
            .limit(itemsPerPage);
        
        return {
            endIndex: endIndex,
            items: items,
            totalPages: totalPages
        };
    }


}
