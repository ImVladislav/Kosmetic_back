const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.post("/sendemail", upload, async (req, res) => {
  try {
    const paths = req.files.map((file, index) => ({
      filename: file.filename,
      path: file.path,
      cid: `image-${Date.now()}-${index}@nodemailer.com`,
    }));

    await sendEmail(paths, req, res);
  } catch (error) {
    res.status(500).send("Error occurred while sending the email");
  }
});

module.exports = router;
