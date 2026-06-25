# visitChina

赴华服务平台 — 面向泰国客户的中国留学、游学、签证等业务

## 目录结构

```
visitChina/
├── index.html              # 网站首页（推送到GitHub → EdgeOne自动部署）
├── docs/                   # 内部文档（.gitignore排除，不上传GitHub）
│   ├── 内部资料_顾问备查.html   # 商业策略/利润点/话术/官方信息
│   ├── 启动准备清单.html         # 业务启动68项清单
│   └── 网站部署指南.html         # EdgeOne部署操作手册
├── .gitignore
└── README.md
```

## 网站部署

- **Git仓库**: GitHub → visitChina (https://github.com/YapMor/visitChina)
- **托管平台**: 腾讯云 EdgeOne Pages
- **加速区域**: 全球（泰国学生访问需要海外节点）
- **自动部署**: git push 后 EdgeOne 自动拉取部署

## 日常更新

```bash
# 修改 index.html 后
cd /Users/mor/WorkBuddy/visitChina
git add . && git commit -m "更新内容" && git push
# EdgeOne 1-2分钟后自动更新
```

## 重要提醒

- `docs/` 目录已在 .gitignore 中排除，内部文档不会被推送到GitHub
- 绝不在 index.html 中包含官方联系方式（电话/邮箱/官网URL）
- 内部资料含利润点和话术，仅供顾问备查
