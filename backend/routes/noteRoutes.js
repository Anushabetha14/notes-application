const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote
} = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

/*
|--------------------------------------------------------------------------
| Notes Routes (Protected)
|--------------------------------------------------------------------------
| All routes below require JWT authentication
*/

// Create a new note
router.post("/", authMiddleware, createNote);

// Get all notes of logged-in user
router.get("/", authMiddleware, getNotes);

// Update a note
router.put("/:id", authMiddleware, updateNote);

// Delete a note
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
