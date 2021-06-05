/* eslint-disable semi */
const { Router } = require('express');
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const router = Router();

// get board based on id for a user
router.get('/:id', async (req, res, next) => {
    const _id = req.params.id;
    try {
        const board = await Board.findOne({ _id });
        if (!board) return res.status(404).send();
        res.send(board);
    } catch (error) {
        next(error);
    }
});

// get lists based on boardId
router.get('/:id/lists', async (req, res, next) => {
    const _id = req.params.id;
    try {
        const board = await Board.findOne({ _id });
        if (!board) return res.status(404).send();
        const lists = await List.find({ boardId: _id });
        res.send(lists);
    } catch (error) {
        next(error);
    }
});

// get cards based on boardId
router.get('/:id/cards', async (req, res, next) => {
    const _id = req.params.id;
    try {
        const board = await Board.findOne({ _id });
        if (!board) return res.status(404).send();
        const cards = await Card.find({ boardId: _id });
        res.send(cards);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
