const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, course } = req.body;

  const existing = await Student.findOne({ email });

  if (existing) {
    return res.json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = new Student({
    name,
    email,
    password: hashedPassword,
    course
  });

  await student.save();

  res.json({ message: "Registered Successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (!student) {
    return res.json({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    return res.json({ message: "Wrong Password" });
  }

  const token = jwt.sign(
    { id: student._id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  const student = await Student.findById(req.studentId);
  res.json(student);
});

router.put("/update-course", authMiddleware, async (req, res) => {
  const student = await Student.findById(req.studentId);
  student.course = req.body.course;
  await student.save();

  res.json({ message: "Course Updated" });
});

router.put("/update-password", authMiddleware, async (req, res) => {
  const student = await Student.findById(req.studentId);

  const match = await bcrypt.compare(
    req.body.oldPassword,
    student.password
  );

  if (!match) {
    return res.json({ message: "Old password wrong" });
  }

  student.password = await bcrypt.hash(req.body.newPassword, 10);

  await student.save();

  res.json({ message: "Password Updated" });
});

module.exports = router;