const mainServices           = require('../services/article_service')
const { validationResult } = require('express-validator');


const untils = require('../helper/untils');
const systemConfig = require('../configs/system')

const collection = "article"  
const pathCollectionPage        = `backend/page/${collection}`;
const linkPrefix = `/${systemConfig.prefixAdmin}/${collection}`;


module.exports = {
    // postImage: async (req, res, next) => {
    //     upload.single('image')(req, res, function (err) {
    //         if (err) {
    //             return res.status(400).send('Upload failed.');
    //         }

    //         if (!req.file) {
    //             return res.status(400).send('No file uploaded.');
    //         }

    //         console.log('Uploaded file:', req.file);
    //     })
    // },
    
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
        // res.flash('success', '-----info----');
        res.render(`${pathCollectionPage}/list`, {
            items,
            filterStatus: await untils.filterStatus(paramStatus, mainServices),
            paramStatus,
            keyword,
            currentPage,
            totalPages
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
        try {
            if (result.isEmpty()) {
                if (id) {
                    
                    await mainServices.updateDataById(id,data);
                } else {
                    if (!req.file) {
                        return res.status(400).send('No file uploaded.');
                    }
                    console.log('File uploaded!');
                    await mainServices.saveItem(data);
                }
                return res.redirect(`${linkPrefix}/status/all`)
            } else {
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
        await req.flash('success', "Xoa thanh cong", false);
        res.send(true)
    },

    changeStatus: async (req, res, next) => {
        const { id, status } = req.params;
        let currentStatus = (status == 'active') ? 'inactive': 'active'
        await mainServices.changeStatus(id, currentStatus)
        res.send({
            data: 'success',
            id,
            currentStatus
        })
    },

    changeMultipleStatus: async (req, res, next) => {
        let currentStatus = req.params.status;
        console.log(typeof (req.body));
        let cid = req.body.cid
        await mainServices.changeMultipleStatus(cid, currentStatus);
        res.send({})
    },

    deleteMulti: async (req, res, next) => {
        let cid = req.body
        if (cid.length !== 0) {
            await mainServices.deleteMulti(cid);
        }
    },

    changeOrdering: async (req, res, next) => {
        let {id, ordering} = req.params;
        await mainServices.changeOrdering(id, ordering)
        res.send({
            data: 'success',
            id,
            ordering
        })
    }
}
