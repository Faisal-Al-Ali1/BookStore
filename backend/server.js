const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bookRoutes = require("./Routes/bookRoutes");

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/", bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
