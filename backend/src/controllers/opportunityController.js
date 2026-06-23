const Opportunity = require("../models/Opportunity");

// Get all opportunities (only user's own)
const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ owner: req.user.id })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single opportunity (with ownership check)
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check if user owns this opportunity
    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create opportunity
const createOpportunity = async (req, res) => {
  try {
    const { customerName, requirement } = req.body;

    // Check required fields
    if (!customerName || !requirement) {
      return res.status(400).json({
        message: "Customer name and requirement are required",
      });
    }

    // Create opportunity with owner from JWT
    const opportunity = await Opportunity.create({
      owner: req.user.id,
      ...req.body,
    });

    const populated = await Opportunity.findById(opportunity._id).populate(
      "owner",
      "name email",
    );

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update opportunity (owner only)
const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check ownership
    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update and return new data
    const updated = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate("owner", "name email");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete opportunity (owner only)
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check ownership
    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await opportunity.deleteOne();
    res.json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
