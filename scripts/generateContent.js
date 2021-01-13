const fs = require("fs");
const path = require("path");

/** demos 首页模板文件路径 */
const indexTemplatePath = path.join(__dirname, "../index-template.html");
/** 要插入目录的占位符 */
const contentPlaceholder = "{%目录%}";
/** 要遍历的 demo 文件夹路径 */
const demosDir = "./demos";
/** 生成的首页文件名 */
const indexFileName = "index.html";

/**
 * 生成 demos 目录索引
 */
function generateContent() {
  const sections = getSectionsTitle();

  const indexFileContentStr = fs.readFileSync(indexTemplatePath, "utf-8");
  const replacedFileContent = indexFileContentStr.replace(
    contentPlaceholder,
    sections
      .map((title) => `<li><a href="./${title}">${title}</a></li>`)
      .join("\n")
  );
  fs.writeFileSync(path.join(demosDir, indexFileName), replacedFileContent, {
    encoding: "utf-8",
  });
}

/**
 * 获取 demos 文件名称列表
 */
function getSectionsTitle() {
  return fs.readdirSync(demosDir).filter((title) => title !== indexFileName);
}

generateContent();
