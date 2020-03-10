const express = require("express");

const Posts = require("../data/db.js");

const router = express.Router();

// #1
router.post("/", (req, res) => {
	Posts.insert(req.body)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "Error adding the post"
			});
		});
});

// #2
router.post("/:id/comments", (req, res) => {
    Posts.insertComment(req.body)
        .then(comment => {
            res.status(201).json(comment);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "error"
            });
        });
});

// #3
router.get("/", (req, res) => {
	Posts.find(req.query)
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the posts"
			});
		});
});

// #4
router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                messange: "error"
            });
        });
});

// #5
router.get("/:id/comments", (req, res) => {
	Posts.findPostComments(req.params.id)
		.then(comments => {
			res.status(200).json(comments);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "error"
			});
		});
});


// #6
router.delete("/:id", (req, res) => {
	Posts.remove(req.params.id)
		.then(count => {
			if (count > 0) {
				res.status(200).json({message: `post #${req.params.id} has been deleted`});
			} else {
				res.status(404).json({ message: "The post could not be found" });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "Error removing the hub"
			});
		});
});


// #7
router.put("/:id", (req, res) => {
	const changes = req.body;
	Posts.update(req.params.id, changes)
		.then(post => {
			if (post) {
				res.status(200).json(changes);
			} else {
				res.status(404).json({ message: "The post could not be found" });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "Error updating the post"
			});
		});
});


module.exports = router;