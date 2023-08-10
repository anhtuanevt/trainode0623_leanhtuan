const categorySevices = require('../services/category_service')
const {validationResult} = require('express-validator');
const untils = require('../views/backend/helper/untils');

module.exports = {
    // show all list of category
    list: async (req, res, next) => {
        try {
            let sorting = { name: 1 };
            let keyword = req.query.keyword || '';
            let paramStatus = req.params.status;

            let condition = paramStatus === 'all' ? {} : { status: paramStatus };
            let items = [];

            if (keyword === '') {
                items = await categorySevices.getItems('', condition, sorting);
            } else {
                items = await categorySevices.getItems(keyword, condition, sorting);
                const urlWithoutKeyword = req.originalUrl.split('?')[0];
                return res.redirect(urlWithoutKeyword);
            }

            res.render(`backend/page/category/list`, {
                items,
                filterStatus: await untils.filterStatus(paramStatus),
                paramStatus,
                keyword
            });
        } catch (err) {
            console.log(err);
        }
    },


    // show add / edit form
    getForm: async (req, res, next) => {
        const id = req.params.id || '';
        const item = await categorySevices.getItemByID(id);
        const formTitle = id ? 'Edit - Form' : 'Add - Form';
        
        res.render(`backend/page/category/form`,
            {
                formTitle: formTitle,
                item
            })
    },

    //add - edit new record
    updateForm: async (req, res, next) => {
        let data = req.body;
        let id = data.id;
        
        const result = validationResult(req);
        try {
            if (result.isEmpty()) {
                if (id ) {
                    
                    await categorySevices.updateDataById(id,data);
                } else {
                    await categorySevices.saveItem(data);
                }
                return res.redirect('/admin/category/all')
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/admin/category/item/form')
        }
    },

    deleteByID: async (req, res, next) => {
        const {id} = req.params
        console.log("id la " + id);
        
        await categorySevices.deleteItem(id)
        await req.flash('success', "Xoa thanh cong", false);
        // return res.redirect('/admin/category')
        res.send(true)
    },
}
