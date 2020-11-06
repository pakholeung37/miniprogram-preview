var express = require("express");
var router = express.Router();
const ci = require("miniprogram-ci");
const config = require("../../project.config");
const path = require("path");
/* GET home page. */
router.get("/", async (req, res, next) => {
  const project = new ci.Project(config.miniProgram);
  const imagePath = path.resolve(__dirname, "../../public/images");
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
      qrcodeOutputDest: path.resolve(imagePath, "./qrCode.jpg"),
      onProgressUpdate: () => {},
    });
    console.log(previewResult);
  } catch (e) {
    res.sendStatus(500);
  }
  res.set({
    "Content-Type": "application/json",
  });
  res.json({
    name: "qrCode.jpg",
    type: "jpeg",
    des: "/images/qrCode.jpg",
  });
});

module.exports = router;
