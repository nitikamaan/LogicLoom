const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/authMiddleware");

// ================= ADD COMPLAINT (WITH VALIDATION) =================
router.post(
  "/",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: errors.array(),
        });
      }

      const complaint = new Complaint(req.body);
      await complaint.save();

      res.status(201).json({
        success: true,
        message: "Complaint stored successfully",
        data: complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// ================= GET ALL =================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ================= UPDATE STATUS =================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ================= DELETE =================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ================= SEARCH BY LOCATION =================
router.get("/search/location", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      location: { $regex: req.query.location, $options: "i" },
    });

    res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ================= FILTER CATEGORY =================
router.get("/category/filter", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      category: req.query.category,
    });

    res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;