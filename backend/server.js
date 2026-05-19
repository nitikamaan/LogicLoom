const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const complaintRoutes = require(
  "./routes/complaintRoutes"
);

const authRoutes = require(
  "./routes/authRoutes"
);

const aiRoutes = require(
  "./routes/aiRoutes"
);

const errorMiddleware = require(
  "./middleware/errorMiddleware"
);

const app = express();


// DATABASE CONNECTION
connectDB();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use(
  "/api/complaints",
  complaintRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send(
    "AI Complaint Backend Running"
  );
});


// ERROR HANDLER
app.use(errorMiddleware);


// PORT
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});