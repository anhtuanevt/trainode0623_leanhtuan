const categorySevices = require('../services/category_service')

module.exports = {
    // show all list of category
    list: async (req, res, next) => {
        let items = await categorySevices.getItems();
        res.render(`backend/page/category/list`, { items })
    },

    // show add / edit form
    getForm: async (req, res, next) => {
        const id = req.params.id || '';
        const item = await categorySevices.getItem(id);
        const formTitle = id ? 'Edit - Form' : 'Add - Form';
        
        res.render(`backend/page/category/form`,
            {
                formTitle: formTitle,
                item
            })
    },

    updateForm: async (req, res, next) => {
        const data = req.body;
        const id = req.params.id || ''; 
        console.log(`${JSON.stringify(data)} + hhhh  + ${JSON.stringify(req.params)}`);
        await categorySevices.saveItem(data);
        await res.redirect('/admin/category')
    },

    deleteByID: async (req, res, next) => {
        const {id} = req.params
        console.log("id la " + id);
        
        await categorySevices.deleteItem(id)
        await req.flash('success', "Xoa thanh cong", false);
        await res.redirect('/admin/category')
    },
}
