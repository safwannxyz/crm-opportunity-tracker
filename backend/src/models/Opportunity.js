const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    requirement: {
      type: String,
      required: true,
    },
    estimatedValue: {
      type: Number,
      default: 0,
    },
    stage: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
      default: "New",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    nextFollowUpDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Opportunity", OpportunitySchema);
