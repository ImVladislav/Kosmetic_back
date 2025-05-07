const fs = require("fs");
const path = require("path");
const mailer = require("../helpers/mailer"); // шлях до нового mailer
const { ctrlWrapper } = require("../helpers");

const sendEmail = async (paths, req, res) => {
  const { title, text, to, subject } = req.body;

  const imagesHtml = paths
    .map((image) => `<img src='cid:${image.cid}'">`)
    .join("");

  try {
    const result = await mailer({
      to,
      subject,
      html: `
        <body style="text-align: center; background-color: #fff; color:#000;">
          <h3>${title}</h3>
          <pre>${text}</pre>
          <div>${imagesHtml}</div>
          <a href="https://beautyblossom.com.ua/">Перейти на сайт</a>
          <p>Відправлено з сайту Beauty Blossom</p>
        </body>
      `,
      attachments: paths,
    });

    deleteOldImages();

    return res.json({
      message: "Email is sent, please check the inbox",
      success: true,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({
      message: "Error occurred while sending the email",
      success: false,
    });
  }
};

const deleteOldImages = () => {
  const directory = "/var/public/uploads";
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
        console.log(`Deleted file: ${file}`);
      });
    }
  });
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
};
