import { text } from 'express';
import { isValidObjectId } from 'mongoose';

const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');


// route handler function to create product --
export const createProduct = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data).length < 1) return res.status(400).send({ status: false, message: 'Please provie all required details to launch a product' });

        const { title, price, description, category, imgURL, sellerId } = data;

        // checking all required fields --
        if (!title) return res.status(400).send({ stauts: false, message: 'Please enter product title to launch a product' });
        if (!price) return res.status(400).send({ stauts: false, message: 'Please enter product price to launch a product' });
        if (!category) return res.status(400).send({ stauts: false, message: 'Please select product category to launch a product' });

        // validating all fields data --

        // storing product's data on database -- 
        const productCreated = await productModel.create(data);
        res.status(201).send({ sataus: true, data: productCreated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};


// route handler function to get products by title name -- 
export const searchProductByName = async function (req, res) {
    try {
        const { searchText, page, sortBy } = req.params;

        // if page number is not provided then assuming as first page --
        if (!page) page = 0;

        // getting sort field data --
        if (!sortBy) sortBy = 'lowToHigh';
        let sortNo = -1;
        if (sortBy === 'lowToHight') sortNo = 1;

        // searching products by making a db call --
        const products = await productModel.find({ title: { $regex: `/${searchText}/`, $options: i } }).sort({ price: sortNo }).skip(page * 20).limit(20);

        // if no products found with search text --
        if (products.length === 0 && page === 0) return res.status(404).send({ status: false, message: 'No product found with this title' });
        if (products.length === 0 && page > 1) return res.status(404).send({ status: false, message: 'No more results found with this title' });

        // sending response after 
        res.status(200).send({ stutus: true, data: products });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};


// route handler function to get products by category -- 
export const searchProductByCategory = async function (req, res) {
    try {
        const { category, minPrice, maxPrice, sortBy, page } = req.params;

        // if page number is not provided then assuming as first page --
        if (!page) page = 0;

        // if price range not given then assuming minimum and maximum price --
        if (!minPrice) minPrice = -Infinity;
        if (!maxPrice) maxPrice = Infinity;

        // getting sort field data --
        if (!sortBy) sortBy = 'lowToHigh';
        let sortNo = -1;
        if (sortBy === 'lowToHight') sortNo = 1;

        // searching products by making a db call --
        const products = await productModel.find({ category: category, $price: { $gte: minPrice, $lte: maxPrice } }).sort({ price: sortNo }).skip(page * 20).limit(20);

        // if no products found with search text --
        if (products.length === 0 && page === 0) return res.status(404).send({ status: false, message: 'No product found with this title' });
        if (products.length === 0 && page > 1) return res.status(404).send({ status: false, message: 'No more results found with this title' });

        // sending response after 
        res.status(200).send({ stutus: true, data: products });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};