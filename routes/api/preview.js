var express = require("express");
var router = express.Router();
const ci = require("miniprogram-ci");
const config = require("../../project.config");
const path = require("path");

let latestImageName
const makeQrCode = async() => {
  const project = new ci.Project(config.miniProgram);
  const imagePath = path.resolve(__dirname, "../../public/images");
  latestImageName = `qrCode${Date.now()}`
  try {
    const previewResult = await ci.preview({
      project,
      desc: "hello", // 此备注将显示在“小程序助手”开发版列表中
      setting: {
        es6: true,
        es7: true,
        minify: true,
      },
      qrcodeFormat: "image",
      qrcodeOutputDest: path.resolve(imagePath, `./${latestImageName}.jpg`),
      onProgressUpdate: () => {},
    });
    console.log(previewResult);
  } catch (e) {
    throw e
  }
}
setInterval(makeQrCode, 60000 * 3)

router.get("/", async (req, res, next) => {

  res.set({
    "Content-Type": "application/json",
  });
  res.json({
    name: `${latestImageName}.jpg`,
    type: "jpeg",
    des: `/images/${latestImageName}.jpg`,
  });
});

module.exports = router;
