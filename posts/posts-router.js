const express = require("express");

const Posts = require("../data/db.js");

const router = express.Router();

// #1
router.post("/", (req, res) => {
	if (req.body.title.length === 0 || req.body.contents.length === 0) {
		res.status(400).json({
			errorMessage: "Please provide title and contents for the post."
		});
	} else {
		Posts.insert(req.body)
			.then(added => {
				Posts.findById(added.id)
					.then(post => {
						res.status(201).json(post);
					})
					.catch(error => {
						res.status(500).json({
							message:
								"There was an error while saving the post to the database",
							error: error
						});
					});
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					message: "There was an error while saving the post to the database"
				});
			});
	}
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
		.then(post => {
			res.status(200).json(post);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "error"
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
			res.status(500).json({ message: "error" });
		});
});

// #6
router.delete("/:id", (req, res) => {
	//find by id, nest delete
	Posts.findById(req.params.id)
		.then(post => {
			Posts.remove(req.params.id)
				.then(count => {
					if (count > 0) {
						res.status(200).json(post);
					} else {
						res.status(404).json({
							message: "The post with the specified ID does not exist."
						});
					}
				})
				.catch(error => {
					console.log(error);
					res.status(500).json({
						message: "The post could not be removed"
					});
				});
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				message: "error fetching post"
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
