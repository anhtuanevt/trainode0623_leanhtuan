const { count } = require('../models/category_model');
const categorySevices = require('../services/category_service')

module.exports = {
    filterStatus: async ( paramStatus) => {
        let filterStatus = [
            { name: "All", value: "all", count: 0 , link: "all", class: "btn-default" },
            { name: "Active", value: "active", count: 0, link: "active", class: "btn-default" },
            { name: "InActive", value: "inactive", count: 0, link: "inactive", class: "btn-default" }
        ];
        try {
            for (item of filterStatus) {
                let countStatus = await categorySevices.countStatus(item.value)
                item.count = countStatus;
                // check current status 
                if (paramStatus == item.value) {
                    item.class = "btn-success";
                }
            }
            return filterStatus;
            } catch (err) {
                console.log(err);
            }
        },
    }