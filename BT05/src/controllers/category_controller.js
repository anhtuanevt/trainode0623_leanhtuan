const mainServices           = require('../services/category_service')
const { validationResult } = require('express-validator');


const untils = require('../helper/untils');
const systemConfig = require('./../configs/system')

const collection = "category"  
const pathCollectionPage        = `backend/page/${collection}`;
const linkPrefix = `/${systemConfig.prefixAdmin}/${collection}`;
const notification = require('../configs/notify')

module.exports = {
    // show all list of category
    list: async (req, res, next) => {
    try {
        const sorting = { createdAt: -1 };
        let keyword = req.query.keyword || '';
        let paramStatus = req.params.status;
        let currentPage = req.query.page == undefined ? 1 :req.query.page
        const itemsPerPage = 5; 

        let condition = (paramStatus === 'all')  || (paramStatus === undefined)? {} : { status: paramStatus };
        
        let {items, totalItems } = await mainServices.getItems(keyword, condition, sorting, currentPage, itemsPerPage);
        let  totalPages = Math.ceil(totalItems / itemsPerPage);
        const message = "Hello, World!";
        res.render(`${pathCollectionPage}/list`, {
            items,
            filterStatus: await untils.filterStatus(paramStatus, mainServices),
            paramStatus,
            keyword,
            currentPage,
            totalPages,
            message
        });
    } catch (err) {
        console.log(err);
    }
},


    // show add / edit form
    getForm: async (req, res, next) => {
        const id = req.params.id || '';
        const item = await mainServices.getItemByID(id);
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
        data.isShowHome = (data.isShowHome !== true) ? false : data.isShowHome;
        try {
            if (result.isEmpty()) {
                if (id) {
                    await mainServices.updateDataById(id,data);
                } else {
                    await mainServices.saveItem(data);
                }
                return res.redirect(`${linkPrefix}/status/all`)
            } else {
                await req.flash(notification.notification_type, notification.MSG_UPDATE_FORM, false)
                return res.redirect(`${linkPrefix}/form`)
            }
        } catch (error) {
            console.log(error);
            return res.redirect(`${linkPrefix}/form`)
        }
    },

    deleteByID: async (req, res, next) => {
        const {id} = req.params
        
        await mainServices.deleteItem(id)
        await req.flash(notification.notification_type, notification.MSG_DELETE_ITEM, false)
        res.send(true)
    },

    changeStatus: async (req, res, next) => {
        const { id, status } = req.params;
        let currentStatus = (status == 'active') ? 'inactive': 'active'
        await mainServices.changeStatus(id, currentStatus)
        const flashMsg = {
            type: notification.notification_type,
            msg: notification.MSG_CHANGE_STATUS
        }
        res.send({
            data: 'success',
            id,
            currentStatus,
            flashMsg
        })
    },

    changeMultipleStatus: async (req, res, next) => {
        let currentStatus = req.params.status;
        let cid = req.body.cid
        await req.flash(notification.notification_type, `${notification.MSG_CHANGE_MULTI_STATUS} cho ${cid.split(',').length} phần tử`, false)
        await mainServices.changeMultipleStatus(JSON.parse(cid), currentStatus);
        await res.send({})
    },

    deleteMulti: async (req, res, next) => {
        let cid = req.body.cid
        if (cid.length !== 0) {
            await req.flash(notification.notification_type, `${notification.MSG_CHANGE_MULTI_STATUS} cho ${cid.split(',').length} phần tử`, false)
            await mainServices.deleteMulti(cid);
            await res.send({})
        }
    },

    changeOrdering: async (req, res, next) => {
        let {id, ordering} = req.params;
        await mainServices.changeOrdering(id, ordering)
        const flashMsg = {
            type: notification.notification_type,
            msg: notification.MSG_CHANGE_ORDERING
        }
        res.send({
            data: 'success',
            id,
            ordering,
            flashMsg
        })
    }
}
