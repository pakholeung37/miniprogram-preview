const projectConfig = require("../../project.config")

function getTemplateData(extraData) {
  return {
    ...projectConfig,
    ...extraData
  }
}

module.exports = {
  getTemplateData
}