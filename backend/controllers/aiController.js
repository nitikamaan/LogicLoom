exports.analyzeComplaint =
  async (req, res) => {

    try {

      const text =
        req.body.description.toLowerCase();

      let priority = "Low";

      let department =
        "General Department";

      if (
        text.includes("fire") ||
        text.includes("danger")
      ) {
        priority = "High";
      }

      if (
        text.includes("electricity")
      ) {
        department =
          "Electricity Department";

        priority = "High";
      }

      else if (
        text.includes("water")
      ) {
        department =
          "Water Department";
      }

      else if (
        text.includes("garbage")
      ) {
        department =
          "Sanitation Department";
      }

      else if (
        text.includes("road")
      ) {
        department =
          "Road Maintenance Department";
      }

      const summary =
        text.substring(0, 100);

      const response =
        "Your complaint has been successfully registered and forwarded to the concerned department.";

      res.json({
        priority,
        department,
        summary,
        response,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "AI Analysis Failed",
      });
    }
  };