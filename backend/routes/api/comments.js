const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

// Hey GitHub Copilot, welcome to our comments API!

/**
 * GET /api/comments
 * Retrieves all comments from the database
 * @route GET /api/comments
 * @returns {Object[]} Array of comment objects
 * @returns {Object} 500 - Error response if database operation fails
 * @example
 * // Success response:
 * // [
 * //   { "_id": "...", "content": "Great post!", "author": "...", "createdAt": "..." },
 * //   { "_id": "...", "content": "Thanks for sharing", "author": "...", "createdAt": "..." }
 * // ]
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

/**
 * DELETE /api/comments/:commentId
 * Deletes a specific comment by its ID
 * @route DELETE /api/comments/:commentId
 * @param {string} req.params.commentId - The unique identifier of the comment to delete
 * @returns {Object} 200 - Success response with no content
 * @returns {Object} 404 - Comment not found
 * @returns {Object} 500 - Server error if database operation fails
 * @example
 * // DELETE /api/comments/507f1f77bcf86cd799439011
 * // Response: 200 OK (no content)
 */
router.delete("/:commentId", async (req, res, next) => {
  try {
    await Comment.findByIdAndRemove(req.params.commentId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
