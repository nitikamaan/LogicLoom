const Complaint = require(
  "../models/Complaint"
);


// ADD COMPLAINT
exports.addComplaint = async (
  req,
  res
) => {

  try {

    const complaint =
      new Complaint(req.body);

    await complaint.save();

    res.json({
      message:
        "Complaint Added Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// GET ALL COMPLAINTS
exports.getComplaints =
  async (req, res) => {

    try {

      const complaints =
        await Complaint.find().sort({
          createdAt: -1,
        });

      res.json(complaints);

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
  };


// UPDATE STATUS
exports.updateComplaint =
  async (req, res) => {

    try {

      const updatedComplaint =
        await Complaint.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updatedComplaint);

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
  };


// DELETE COMPLAINT
exports.deleteComplaint =
  async (req, res) => {

    try {

      await Complaint.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Complaint Deleted Successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
  };


// SEARCH BY LOCATION
exports.searchByLocation =
  async (req, res) => {

    try {

      const complaints =
        await Complaint.find({
          location: {
            $regex:
              req.query.location,
            $options: "i",
          },
        });

      res.json(complaints);

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
  };


// FILTER CATEGORY
exports.filterCategory =
  async (req, res) => {

    try {

      const complaints =
        await Complaint.find({
          category:
            req.query.category,
        });

      res.json(complaints);

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
      });
    }
  };