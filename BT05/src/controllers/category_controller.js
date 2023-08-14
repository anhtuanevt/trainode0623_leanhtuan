const categorySevices           = require('../services/category_service')
const { validationResult } = require('express-validator');


const untils = require('../helper/untils');
const systemConfig = require('./../configs/system')

const collection = "category"  
const pathCollectionPage        = `backend/page/${collection}`;
const linkPrefix = `/${systemConfig.prefixAdmin}/${collection}`;



module.exports = {
    // show all list of category
    list: async (req, res, next) => {
    try {
        let sorting = { name: 1 };
        let keyword = req.query.keyword || '';
        let paramStatus = req.params.status;

        let condition = paramStatus === 'all' ? {} : { status: paramStatus };
        let items = [];
        items = await categorySevices.getItems(keyword, condition, sorting);

        res.render(`${pathCollectionPage}/list`, {
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
        
        res.render(`${pathCollectionPage}/form`,
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
                return res.redirect(`${linkPrefix}/all`)
            }
        } catch (error) {
            console.log(error);
            return res.redirect(`${linkPrefix}/action/form`)
        }
    },

    deleteByID: async (req, res, next) => {
        const {id} = req.params
        
        await categorySevices.deleteItem(id)
        await req.flash('success', "Xoa thanh cong", false);
        res.send(true)
    },

    changeStatus: async (req, res, next) => {
        const { id, status } = req.params;
        let currentStatus = (status == 'active') ? 'inactive': 'active'
        res.redirect(`${linkPrefix}/all`)
    },

    changeMultipleStatus: async (req, res, next) => {
        let currentStatus = req.params;
        console.log(currentStatus)
    }
}
