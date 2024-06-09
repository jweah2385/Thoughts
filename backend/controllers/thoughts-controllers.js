const HttpError = require('../models/http-error');
const thoughts = require('../models/thoughts');
const { default: mongoose } = require('mongoose');

const getThoughts = async (req, res, next) => {
    let allThoughts;
    try {
        allThoughts = thoughts.find({});
    } catch (err) {
        const error = new HttpError(
            "Fetching thoughts failded, please try again later.", 500
        );
        return next(error);
    }
    res.json({thoughts: (await allThoughts).map(allThoughts => allThoughts.toObject({ getters: true}))});
}

const createThoughts = async (req, res, next) => {
    const {description, name, date } = req.body;

    let existingThought;

    try {
        existingThought = await thoughts.findOne({ description: description });
        if (existingThought) {
            const error = new HttpError(
                "Thought already exists", 422
            )
            return next(error);
        }
    } catch (err) {
        const error = new HttpError(
            "Something went wrong try again.", 500
        );
        return next(error)
    }
    const createdThoughts = new thoughts({
        description,
        name,
        date
    })

    try {
        await createdThoughts.save();
    } catch (err) {
        const error = new HttpError(
            'Creating thoughts failed, please try again', 500
        )
        return next(error);
    }
    res.status(201).json({simpleCards: createdThoughts.toObject({getters: true})})
}

exports.getThoughts = getThoughts;
exports.createThoughts = createThoughts;