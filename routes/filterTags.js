const Routes = require("express");
const router = new Routes();
const multer = require("multer");
const path = require("path");

const filterTagController = require("../controllers/filterTagController");

const upload = multer({ dest: "uploads/" });

router.post(
  "/import",
  upload.single("file"),
  filterTagController.importFilterTagFromExcel
);

module.exports = router;
