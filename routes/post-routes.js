var express = require('express');
var router = express.Router();

let Post = require('../models/post-model')
let User = require('../models/user-model')
let Comment = require('../models/comment-model')


// /api/posts
router.get('/', function (req, res, next) {

    // we're in express land !! ()
    Post.find({ owner: req.user._id }).then((posts) => {
        res.json(posts)
    })
});


// /api/posts/o1i72367458523dasdztr
router.get('/:id', function (req, res, next) {

    Post.findById(req.params.id).then((post) => {

        Comment.find({ post: post._id }).then((comments) => {

            // this can probably be done in a simpler/cleaner way -- please research
            let p = { ...post._doc }
            p.comments = comments
            res.json(p)

        })

    })
});

// post /api/posts/new-post
router.post('/new-post', (req, res, next) => {

    console.log('I am here.')

    // { postname: 'Cups', description: '4 white cups' }
    Post.create({
        imgUrl: req.body.imgUrl,
        location: req.body.location,
        description: req.body.description,
        postname: req.body.postname,
        owner: req.user._id,
        categories: req.body.categories,
        likes: req.user._id,
        expireDate: req.body.expireDate,

    })
        .then(response => {
            console.log('I am here. 1')
            // { _id: '1283t2iu3t427g', title: 'Abc', description: 'Whatever' }
            // res.json(response);
            res.json({ response })
        })
    // .catch(err => {
    //     //console.log('I am here. 2', err)
    //     res.json(JSON.stringify(err.message));
    // })
});

//PUT
router.put("/posts/:id", (req, res, next) => {
    const { imgUrl,
        location,
        description,
        postname,
        owner,
        categories,
        likes,
        expireDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Post.findByIdAndUpdate(req.params.id, {
        imgUrl,
        location,
        description,
        postname,
        owner,
        categories,
        likes,
        expireDate
    })
        .then(() => {
            res.json({
                message: `Post data with ${req.params.id} has been updated successfully.`
            });
        })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;