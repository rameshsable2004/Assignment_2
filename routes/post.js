
const express = require('express')
const router = express.Router()

//Data is stored in the form of local Object
let store = {
    posts: [

    ]
};




//Create new Post
router.post('/', (req, res) => {
    const post = req.body;
    console.log(post);
    //get incremented postID
    let postId = getNewId(store.posts);
    post.postId = postId;
    store.posts.push(post);
    res.json(post);
});

//Get All Posts
router.get('/', (req, res) => {
    res.json(store.posts);
});


//Update post by PostId
router.put('/:postId', (req, res) => {

    const postId = req.params.postId;
    const newpost = req.body;


    let post = store.posts.find(post => post.postId == postId);
    if (!post) {
        res.status(404).send('post not found');
    }

    // Remove item from the posts array
    for (let i = 0; i < store.posts.length; i++) {
        let post = store.posts[i]
        if (post.postId == postId) {
            newpost.postId = postId;
            newpost.comments = post.comments;
            store.posts[i] = newpost;
        }
    }

    res.json(newpost);
});

//Get post by postId
router.get('/:postId', (req, res) => {

    const postId = req.params.postId;
    let post = store.posts.find(post => post.postId == postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('post not found');
    }
});


//Delete Post by postId
router.delete('/:postId', (req, res) => {

    const postId = req.params.postId;

    let post = store.posts.find(post => post.postId == postId);
    if (!post) {
        res.status(404).send('post not found');
    }

    store.posts = store.posts.filter(i => {
        if (i.postId != postId) {
            return true;
        }
        return false;
    });
    res.json(store.posts);
});

//Adding comments to post
router.post('/:postId/comments', (req, res) => {
    const postId = req.params.postId;
    let post = store.posts.find(post => post.postId == postId);

    if (!post) {
        res.status(404).send('post not found');
    }

    //Adding comment one by one

    let commentArray = req.body;

    commentArray.forEach(element => {
        const comment = {};
        comment['commentId'] = post['comments'] ? post['comments'][post['comments'].length - 1].commentId + 1 : 1;
        comment['text'] = element.text;

        post['comments'] = post['comments'] ? post['comments'] : [];
        post['comments'].push(comment);

    });

    store.posts.map(b => {
        if (b.postId === post.postId) {
            return post;
        }
        return b;
    });
    res.json(post);
});



//Get comments for Post by postId
router.get('/:postId/comments', (req, res) => {

    const postId = req.params.postId;
    let post = store.posts.find(post => post.postId == postId);
    if (post) {
        res.json(post.comments);
    } else {
        res.status(404).send('post not found');
    }
});


//Update comment by Post ID and comments Id

router.put('/:postId/comments/:commentId', (req, res) => {
    let newText = req.body.text;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    let post = store.posts.find(post => post.postId == postId);
    if (!post) {
        res.status(404).send('post not found');
    }
    let existingComments = post['comments'];

    existingComments.map(com => {
        if (com.commentId == commentId) {
            com.text = newText;
            return com;
        }
        return com;
    });


    store.posts.map(b => {
        if (b.postId === postId) {
            b['comments'] = existingComments;
            post['comments'] = existingComments;
            return b;
        }
        return b;
    });
    res.json(post);
});



//Delete comment by Post ID and Comment Id

router.delete('/:postId/comments/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    let post = store.posts.find(post => post.postId == postId);
    if (!post) {
        res.status(404).send('post not found');
    }

    var filterdComments = post['comments'].filter(com => {
        if (com.commentId != commentId) {
            return true;
        }
        return false;
    });

    post['comments'] = filterdComments;
    store.posts.map(b => {
        if (b.postId === post.postId) {
            return post;
        }
        return b;
    });
    res.json(post);
});

//Genereting primary key for post, incrementing by 1
const getNewId = (posts) => {

    if (posts.length > 0) {
        return posts[posts.length - 1].postId + 1
    } else {
        return 1
    }
}


module.exports = router