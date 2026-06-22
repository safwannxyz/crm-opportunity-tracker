const Opportunity = require("../models/Opportunity");

// @desc    Get all opportunities (only user's own)
// @route   GET /api/opportunities
// @access  Private
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

// @desc    Get single opportunity (with ownership check)
// @route   GET /api/opportunities/:id
// @access  Private
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // OWNERSHIP CHECK - user can only view their own opportunities
    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to view this opportunity",
      });
    }

    const populatedOpportunity = await Opportunity.findById(
      req.params.id,
    ).populate("owner", "name email");

    res.json(populatedOpportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an opportunity
// @route   POST /api/opportunities
// @access  Private
const createOpportunity = async (req, res) => {
  try {
    const {
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    } = req.body;

    // Check required fields
    if (!customerName || !requirement) {
      return res.status(400).json({
        message: "Customer name and requirement are required",
      });
    }

    // Create opportunity - owner comes from JWT (req.user.id)
    const opportunity = await Opportunity.create({
      owner: req.user.id,
      customerName,
      contactName,
      contactEmail,
      contactPhone,
      requirement,
      estimatedValue,
      stage,
      priority,
      nextFollowUpDate,
      notes,
    });

    // Get the created opportunity with owner details
    const populatedOpportunity = await Opportunity.findById(
      opportunity._id,
    ).populate("owner", "name email");

    res.status(201).json(populatedOpportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an opportunity
// @route   PUT /api/opportunities/:id
// @access  Private (Owner only)
const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check ownership - IMPORTANT!
    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this opportunity",
      });
    }

    // Update fields - FIXED: handles empty values properly
    if (req.body.customerName !== undefined) {
      opportunity.customerName = req.body.customerName;
    }
    if (req.body.contactName !== undefined) {
      opportunity.contactName = req.body.contactName;
    }
    if (req.body.contactEmail !== undefined) {
      opportunity.contactEmail = req.body.contactEmail;
    }
    if (req.body.contactPhone !== undefined) {
      opportunity.contactPhone = req.body.contactPhone;
    }
    if (req.body.requirement !== undefined) {
      opportunity.requirement = req.body.requirement;
    }
    if (req.body.estimatedValue !== undefined) {
      opportunity.estimatedValue = req.body.estimatedValue;
    }
    if (req.body.stage !== undefined) {
      opportunity.stage = req.body.stage;
    }
    if (req.body.priority !== undefined) {
      opportunity.priority = req.body.priority;
    }
    if (req.body.nextFollowUpDate !== undefined) {
      opportunity.nextFollowUpDate = req.body.nextFollowUpDate;
    }
    if (req.body.notes !== undefined) {
      opportunity.notes = req.body.notes;
    }

    const updatedOpportunity = await opportunity.save();

    // Get updated opportunity with owner details
    const populatedOpportunity = await Opportunity.findById(
      updatedOpportunity._id,
    ).populate("owner", "name email");

    res.json(populatedOpportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private (Owner only)
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check ownership - IMPORTANT!
    if (opportunity.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this opportunity",
      });
    }

    await opportunity.deleteOne();
    res.json({ message: "Opportunity removed successfully" });
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
