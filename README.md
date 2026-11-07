# Feature-level SMOTE 

## 公开访问 / Public access

- **科研主页 / Research website:** [https://liudan518.github.io/Feature-level-SMOTE/](https://liudan518.github.io/Feature-level-SMOTE/)
- **论文 PDF 全文 / Full-text PDF（约 22 MB）:** [https://liudan518.github.io/Feature-level-SMOTE/Feature-level%20SMOTE.pdf](https://liudan518.github.io/Feature-level-SMOTE/Feature-level%20SMOTE.pdf)
- **DOI 原文 / Publisher DOI:** [https://doi.org/10.1016/j.eswa.2023.122023](https://doi.org/10.1016/j.eswa.2023.122023)
- **部署记录 / Deployment history:** [GitHub Actions](https://github.com/liudan518/Feature-level-SMOTE/actions)

论文：*Feature-level SMOTE: Augmenting Fault Samples in the Learnable Feature Space for Imbalanced Fault Diagnosis of Gas Turbines*  
期刊：*Expert Systems with Applications*, 238 (2024), 122023  
DOI：https://doi.org/10.1016/j.eswa.2023.122023

网页和论文 PDF 均可公开访问，无需登录。The website and PDF are publicly accessible without signing in.

本项目通过 GitHub Pages 发布；更新 `main` 分支后会自动构建并部署。
The site is hosted on GitHub Pages and redeploys automatically when `main` is updated.

## 如何使用

1. 解压整个 ZIP，保持内部文件夹结构不变。
2. 双击 `index.html`，在现代浏览器中打开；网页主体、插图和文献引用均可离线使用。
3. 右上角选择 **中文 / English / Русский / Français / العربية**，支持语言偏好保存；阿拉伯语自动切换至从右到左排版。
4. 点击正文论文图或实验数据图，即可放大；按 `Esc` 或点击关闭按钮退出。
5. `Read PDF / 阅读 PDF` 可打开本地配套论文，`DOI` 按钮需网络连接。
6. 若部署到服务器，将整个文件夹上传到静态托管平台，首页为 `index.html`，无需编译和后端服务。

## 文件结构

- `index.html` — 主页面，包含响应式 CSS 和科研内容。
- `assets/site.js` — 五语切换、图件查看和 BibTeX 复制等交互逻辑。
- `assets/i18n.js` — 104 组正文翻译和 91 组常用界面词条（每组覆盖五种语言；英语直接沿用原网页正文）。
- `images/` — 原始科研插图和各类实验结果数据表（不更改实验数据）。
- `Feature-level SMOTE.pdf` — 用户提供的论文 PDF。
- `previews/` — 桌面和移动端预览图。

## 设计与内容说明

页面采用海军蓝与青蓝科研科技风，标题、段落、卡片、图注及图件尺寸进行了统一调整。正文两端对齐，图片按原始比例缩放；科研图表、数值、公式及 BibTeX 沿用上传网站的内容。阿拉伯语采用 RTL 排版，数学公式、统计数字及技术图表保留符合科学阅读习惯的方向。

本网站保留了原论文文本论证与实验指标，包括 SMC 平均平衡准确率 90.38%、KNN 平均值 90.21% 和正常类召回率的权衡。新增俄语、法语和阿拉伯语等内容属于编辑翻译，国际正式发布前建议由相关领域母语学者校对。图表内部的原始英文为原论文图件的一部分，没有进行图片覆盖或重新翻译。

测试参考：Chromium 桌面 1440 × 930 和手机 390 × 844，五种语言均无整页横向溢出；语言切换、图片弹窗及 BibTeX 复制通过基本交互测试。图表图片设置为延迟加载，滚动到视口后才实际读取。
