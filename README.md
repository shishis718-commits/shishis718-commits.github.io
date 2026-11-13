# 纸上星球｜个人博客

「纸上星球」是一个用来收藏生活、书影音、同人作品、长篇随笔与兴趣爱好的个人档案馆。

## 启用网站

1. 打开仓库的 **Settings → Pages**。
2. 在 **Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。
3. 回到 **Actions**，查看 **Deploy GitHub Pages** 工作流。首次发布成功后，网站地址是 <https://shishis718-commits.github.io/>。

## 修改内容

- 首页和各个收藏分类的示例内容都在根目录的 index.html 中。
- 页面配色、字体、间距和手机适配在 assets/css/style.css 中。
- 主题切换逻辑在 assets/js/theme.js 中。
- 页面搜索逻辑在 assets/js/search.js 中。

直接编辑对应文件并提交到 main 分支，GitHub Actions 就会重新部署。

## 关于公开内容

这是公开仓库，GitHub Pages 发布的网站也会公开供互联网访问。不要上传密码、真实住址、证件信息、私人聊天或其他不想公开的内容。
