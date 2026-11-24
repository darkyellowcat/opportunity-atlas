# 首次推送与 Pages 发布

在仓库根目录执行以下命令，确认当前分支为 `main`、`origin` 指向你的目标仓库，并查看将纳入首次提交的文件。

```sh
git branch --show-current
git remote -v
git add --dry-run .
```

以下步骤适用于空的远程仓库。运行 `git ls-remote --heads origin`，成功且没有输出表示远端还没有分支。如果列出了已有分支，先核对远端提交历史。

```sh
git add .
git diff --cached --stat
git commit -m "发布机会路标静态站点"
git push -u origin main
```

## 启用 GitHub Pages

1. 推送完成后，在 GitHub 仓库打开 **Settings → Pages**。
2. 在 **Build and deployment** 下选择 **Deploy from a branch**，选 `main` 和 `/(root)`，点击 **Save**。站点入口 `index.html` 位于仓库根目录。
3. 部署完成后点击 **Visit site**，从活动索引打开一条详情，确认首页和详情页都可访问。

GitHub Free 支持从公开仓库发布。其他套餐和发布源选项见 [GitHub Pages 官方指南](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
