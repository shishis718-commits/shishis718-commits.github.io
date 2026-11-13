# 纸上星球｜个人博客

这是「纸上星球」个人博客的 GitHub Pages 部署仓库。

博客源码完整保存在 `paper-planet-blog.tar.gz` 中，包含首页、生活手记、书影音、同人档案、长篇随笔、兴趣收藏、关于页、示例文章、配色主题、站内搜索和写作模板。

## 首次启用网站

1. 打开仓库的 **Settings → Pages**。
2. 在 **Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。
3. 回到 **Actions**，确认 **Deploy GitHub Pages** 工作流开始运行。
4. 工作流成功后，网站地址为：<https://shishis718-commits.github.io/>

## 本地预览与修改

1. 下载仓库中的 `paper-planet-blog.tar.gz` 并解压。
2. 打开解压目录里的 `preview.html`，可在浏览器中预览视觉样式。
3. 修改文章、页面或样式后，重新打包目录内容（保持 `index.html` 位于压缩包根目录），用新压缩包替换仓库里的 `paper-planet-blog.tar.gz`。
4. 提交后，GitHub Actions 会自动重新部署网站。

博客文章使用 Jekyll 的 `_posts` 目录与 Markdown 格式。建议文章文件名采用 `YYYY-MM-DD-title.md`。

> 注意：这是公开仓库。不要上传密码、真实住址、证件信息或私人聊天。GitHub Pages 发布的网站也会公开供互联网访问。
