import app from "./app.js";
import connectDB from "./config/db.js";
import { disconnectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

connectDB();

try {
  const server = app.listen(PORT, () =>
    console.log(
      `Server running on ${NODE_ENV} mode at http://localhost:${PORT}`
    )
  );
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => console.log("HTTP server closed"));
  await disconnectDB();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => console.log("HTTP server closed"));
  await disconnectDB();
  process.exit(0);
});
