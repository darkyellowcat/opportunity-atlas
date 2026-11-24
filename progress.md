## 2026-11-24 - Task: 准备首次推送

### What was done

补齐静态站点的 Git 忽略规则和首次发布说明。已确认本地分支为 `main`，检查时 `origin` 尚无远程分支。

### Testing

- 用 `git check-ignore -v` 验证了 7 个巡查产物、Python 缓存及系统元数据路径，并用 `git add --dry-run .` 确认首页、39 个活动详情页、活动索引、维护工具及 GitHub 配置均可提交。
- 在 Windows 上用 README 中的 Python 命令启动预览。首页、静态活动索引和抽查的详情页均返回 HTTP 200，响应内容与磁盘文件一致。两份说明中的相对文件链接均可访问。
- 当前仓库没有 `scripts/verify.ps1`，本次使用上述针对性检查。

### Notes

- `.gitignore`：新增巡查输出、Python 缓存和操作系统元数据的忽略规则。
- `README.md`：增加本地预览命令、首次提交范围和发布指南入口。
- `docs/publishing.md`：记录面向空远端的首次推送步骤和 Pages 发布设置。
- `progress.md`：记录本次改动及验证结果。
- 本地回滚点为原始 README 的 Git 对象 `4c1239fafe2ca81e180c141fee3b0844a84dd4b1`。首次提交前可在根目录执行以下命令恢复原文，再移除本轮新增的 `.gitignore` 和 `docs/publishing.md`。

```powershell
py -3 -c "import pathlib, subprocess; pathlib.Path('README.md').write_bytes(subprocess.check_output(['git', 'cat-file', 'blob', '4c1239fafe2ca81e180c141fee3b0844a84dd4b1']))"
```
