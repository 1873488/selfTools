import chalk from "chalk";
import path from "path";
import fs from "fs";
import { reactTemplate } from "./template.js";

const log = message => console.log(chalk.green(message));
const successLog = message => console.log(chalk.blue(message));
const errorLog = error => console.log(chalk.red(error));
const compName = process.argv.slice(2)[0];
const main = () => {
  if (!compName || !compName.length) {
    errorLog("组件名称不能为空");
    return;
  }
  // 判断首字母是否大写
  if (!/^[A-Z]/.test(compName)) {
    errorLog("组件名称必须以大写字母开头");
    return;
  }
  log(`判断是否存在 ${compName} 组件...`);

  const targetPath = path.resolve(path.dirname('.'), `src/components/${compName}`);
  if (fs.existsSync(targetPath)) {
    errorLog(`${compName}组件已存在，请重新输入组件名称`);
    return;
  }
  try {
    fs.mkdirSync(targetPath, { recursive: true });
    fs.writeFileSync(path.resolve(targetPath, `index.tsx`), reactTemplate(compName));
    fs.writeFileSync(path.resolve(targetPath, `index.module.less`), "");
    successLog(`${compName}组件创建成功`);
    process.exit(0);
  } catch (error) {
    errorLog(`创建失败: ${error.message}`);
    process.exit(1);
  }
};
log("正在生成组件...");
main()
