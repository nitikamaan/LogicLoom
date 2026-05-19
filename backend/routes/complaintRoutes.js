const express = require("express");
const router = express.Router();
const axios = require("axios");

const { body, validationResult } = require("express-validator");

const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/authMiddleware");

// ======================================================
// 1. ADD COMPLAINT + AI INTEGRATION
// ======================================================
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

      // ================= AI CALL =================
      let aiData = {
        priority: "Low",
        department: "General",
        summary: "No summary available",
        response: "We will look into your complaint soon.",
      };

      try {
        const aiRes = await axios.post(
          "https://syncbasebackend.onrender.com/api/ai/analyze",
          {
            description: req.body.description,
          }
        );

        aiData = aiRes.data;
      } catch (aiError) {
        console.log("AI Error:", aiError.message);
      }

      // ================= SAVE COMPLAINT =================
      const complaint = new Complaint({
        ...req.body,

        priority: aiData.priority,
        department: aiData.department,
        aiSummary: aiData.summary,
        autoResponse: aiData.response,
      });

      await complaint.save();

      res.status(201).json({
        success: true,
        message: "Complaint stored successfully",
        data: complaint,
      });

    } catch (error) {
      console.log("Server Error:", error.message);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// ======================================================
// 2. GET ALL COMPLAINTS
// ======================================================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      createdAt: -1,
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

// ======================================================
// 3. UPDATE STATUS
// ======================================================
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

// ======================================================
// 4. DELETE COMPLAINT
// ======================================================
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

// ======================================================
// 5. SEARCH BY LOCATION
// ======================================================
router.get("/search/location", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      location: {
        $regex: req.query.location,
        $options: "i",
      },
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

// ======================================================
// 6. FILTER BY CATEGORY
// ======================================================
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