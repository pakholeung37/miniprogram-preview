var express = require("express");
var router = express.Router();
const ci = require("miniprogram-ci");
const config = require("../../project.config");
const path = require("path");
const shelljs = require("shelljs");
const chokidar = require("chokidar");

let latestImageName;
let needUpdate = true;
let lock;
const makeQrCode = async () => {
  console.log("Qrcode is making...");
  const project = new ci.Project(config.miniProgram);
  const imagePath = path.resolve(__dirname, "../../public/images");
  latestImageName = `qrCode${Date.now()}`;
  // 妈的 直接删掉imagesm, 略有阻塞, 但是问题不大
  shelljs.rm("-rf", path.resolve(__dirname, "../../public/images/*"));
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
    throw e;
  }
};

let timer;
console.log("start watching " + config.miniProgram.projectPath);
chokidar
  .watch(config.miniProgram.projectPath)
  .on("change", async (event, path) => {
    console.log("files changes");
    if (lock) return;
    lock = true;
    await makeQrCode();
    // 定时25分钟构造一次, 防止开发码过期
    clearTimeout(timer);
    const buildAgain = () => {
      console.log("build me a qrcode!");
      makeQrCode();
      timer = setTimeout(buildAgain, 25 * 60000);
    };

    timer = setTimeout(buildAgain, 25 * 60000);
    lock = false;
  });

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
