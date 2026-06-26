# visitChina

赴华服务平台 — 面向泰国客户的中国留学、游学、签证等业务

## 目录结构

```
visitChina/
├── index.html                  # 门户首页（服务导航 + 院校入口 + 社会证明）
├── schools/                    # 各院校招生页
│   └── dlut.html               # 大连理工大学 2026 国际本科招生（三语）
├── css/
│   └── style.css               # 全局样式（门户 + 院校页共享）
├── js/
│   └── main.js                 # 全局脚本（语言切换 / 费用计算器 / 分析追踪）
├── assets/                     # 图片等静态资源
├── docs/                       # 内部文档（.gitignore 排除）
│   ├── 内部资料_顾问备查.html     # 商业策略/利润点/话术/官方信息
│   ├── 启动准备清单.html         # 业务启动68项清单（含 localStorage 持久化）
│   └── 网站部署指南.html         # EdgeOne 部署操作手册
├── .gitignore
└── README.md
```

## 网站部署

- **Git仓库**: GitHub → visitChina (https://github.com/YapMor/visitChina)
- **托管平台**: 腾讯云 EdgeOne Pages
- **加速区域**: 全球（泰国学生访问需要海外节点）
- **自动部署**: git push 后 EdgeOne 自动拉取部署
- **免费额度**: 每月 500 次构建、无限请求

## 日常更新

```bash
cd /Users/mor/WorkBuddy/visitChina
git add . && git commit -m "更新内容" && git push
# EdgeOne 1-2分钟后自动更新
```

## SEO & 追踪

- GA4 分析脚本已内置（`js/main.js`），替换 `G-XXXXXXXXXX` 为实际 ID 即可激活
- Meta Pixel 已内置，替换 `YOUR_PIXEL_ID` 为实际 ID 即可激活
- 所有页面含 Open Graph 标签 + 结构化数据（JSON-LD）
- 门户首页含 `<meta name="description">` 泰文 + 中文关键词

## 重要提醒

- `docs/` 目录已在 .gitignore 中排除
- 绝不在对外页面中包含官方联系方式
- 内部资料含利润点和话术，仅供顾问备查
- 泰文内容建议由 native Thai speaker 校对后再正式上线
