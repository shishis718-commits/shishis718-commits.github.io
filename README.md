# 纸上星球｜个人档案馆

这是一个部署在 GitHub Pages 的静态个人网站。

## 四大板块

- 首页：四个板块入口与网站介绍
- 日常生活：日记、照片墙、视频、睡眠记录（daily.html）
- 书影音：书籍、电影、剧集、长篇感想（culture.html）
- 同人档案：作品、作者、关系、分级、阅读状态（fanworks.html）
- 兴趣收藏：角色、音乐、游戏、链接与灵感（interests.html）

## 网站地址

<https://shishis718-commits.github.io/>

## 发布内容

目前网站没有登录式 CMS 后台。你可以在 GitHub 中编辑对应的 HTML 页面并提交到 main 分支，GitHub Pages 会自动重新发布。详细步骤请看 [发布指南](发布指南.html)。

### 发布照片

将图片上传到 assets/uploads/，然后在 daily.html 的照片墙中添加：

```html
<figure class="photo-item">
  <img src="assets/uploads/your-photo.jpg" alt="照片描述">
  <figcaption>2026.11.13 · 照片说明</figcaption>
</figure>
```

建议图片使用 JPG、PNG 或 WebP，并控制文件大小。大型视频请使用外部视频平台嵌入或链接。

## 修改样式

- 全站布局与颜色：assets/css/style.css

## 隐私提醒

仓库和网站是公开的。不要发布密码、真实住址、证件信息、私人聊天或其他不希望公开的内容。
