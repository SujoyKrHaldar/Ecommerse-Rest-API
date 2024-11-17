import express from "express";

const router = express.Router();

router.get("/api/v1", (req, res) =>
  res.status(200).json({ sucess: true, message: "Welcome" })
);
router.get("*", (req, res) =>
  res.status(404).json({ sucess: false, message: "Route not found" })
);

export default router;
