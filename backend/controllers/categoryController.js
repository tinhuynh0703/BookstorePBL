const Category = require('../models/categoryModel');

const getAllCategory = async (req, res) => {
    const categoryList = await Category.getAllCategory();
    res.status(200).json({
        categoryList : categoryList
    })
}

module.exports = {
    getAllCategory
}