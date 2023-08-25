
module.exports = {
    filterStatus: async ( paramStatus, services) => {
        let filterStatus = [
            { name: "All", value: "all", count: 0 , link: "all", class: "btn-default" },
            { name: "Active", value: "active", count: 0, link: "active", class: "btn-default" },
            { name: "InActive", value: "inactive", count: 0, link: "inactive", class: "btn-default" }
        ];
        try {
            for (item of filterStatus) {
                let countStatus = await services.countStatus(item.value)
                item.count = countStatus;
                // check current status 
                if (paramStatus == item.value) {
                    item.class = "btn-success";
                }
                if (paramStatus == undefined) {
                    filterStatus[0].class = "btn-success";
                } 
            }
            return filterStatus;
            } catch (err) {
                console.log(err);
            }
        },
    }