const express = require('express');
const router = express.Router();
const User = require("../../models/user");
const MainCategory = require('../../models/mainCategory');
const Item = require('../../models/item');
const Feed = require('../../models/feedBack');

const dashboardController = {};

dashboardController.getAll = async (req, res, next) => {
    try {

        const Users = await User.count();
        const Items = await Item.count();
        const OpenFeeds= await Feed.count({isActive: false});
        const ActiveFeeds= await Feed.count({isActive: true});

        res.status(200).send({ users: Users, items: Items, openFeeds: OpenFeeds,activeFeeds:ActiveFeeds });

    } catch (err) {
        console.log(err);
        next(e);
    }
}

dashboardController.createFeed = async (req, res, next) => {
    try {
        const {message} = req.body.feedDto;
        const newFeed = new Feed({
            message,
            createdBy: '62eee53a4f83fe6c8d2cdea6'
        })
        newFeed.save().then(doc => {
            res.status(200).send({ message: 'Saved successfully' });
        }).catch(err => {
            res.status(500).send({error: err})
        })

    } catch (err) {
        console.log(err);
        next(e);
    }
}

dashboardController.getAllFeeds = async (req, res, next) => {
    try {
        
        Feed.find({}).populate({
            path: 'createdBy',
            model: 'user'
        }).then(doc => {
            res.status(200).send({ Feeds: doc });
        }).catch(err => {
            res.status(500).send({error: err})
        })

    } catch (err) {
        console.log(err);
        next(e);
    }
}

dashboardController.openFeeds = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id);
        Feed.updateOne({_id: id}, {isActive: false}, { upsert: true }).then(doc => {
            // console.log(doc);
            res.status(200).send({ modifiedCount: doc.modifiedCount });
        }).catch(err => {
            res.status(500).send({error: err})
        })

    } catch (err) {
        console.log(err);
        next(e);
    }
}
module.exports = dashboardController;