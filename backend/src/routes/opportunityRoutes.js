const express = require("express");
const router = express.Router();
const {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected (user must be logged in)
router
  .route("/")
  .get(protect, getOpportunities)
  .post(protect, createOpportunity);

router
  .route("/:id")
  .get(protect, getOpportunityById)
  .put(protect, updateOpportunity)
  .delete(protect, deleteOpportunity);

module.exports = router;
