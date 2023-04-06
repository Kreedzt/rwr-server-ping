# RWR 服务器状态查询

![license](https://badgen.net/github/license/Kreedzt/rwr-server-ping)
![latest release](https://badgen.net/github/release/Kreedzt/rwr-server-ping)
![commits count](https://badgen.net/github/commits/Kreedzt/rwr-server-ping)
![last commit](https://badgen.net/github/last-commit/Kreedzt/rwr-server-ping)

该工具通过调用 rwr 官方服务器查询地址, 可快速查询服务器状态信息

[English](README_en.md) | 简体中文

## 快速上手

去 [Release](https://github.com/Kreedzt/rwr-server-ping/releases) 页面下载最新的构建包, 双击使用即可

当前应用包含如下功能:

-   [x] 延迟检测
-   [x] 一键加入服务器 / 复制启动命令
-   [x] 收藏夹

针对 `Windows 7` 用户, 请去 [官网](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section) 下载 `webview2` 运行时 

## 开发

该项目是基于 [tauri](https://tauri.app/) 进行创建的项目, 同时依赖以下 2 个语言环境:

-   [Nodejs](https://nodejs.org/en/)
-   [Rust](https://www.rust-lang.org/)

在安装好环境后, 本项目依赖 `pnpm` 进行前端包管理

1. 安装 `pnpm`

```bash
npm i -g pnpm
```

2. 使用 `pnpm` 安装前端依赖包

```bash
pnpm i
```

3. 启动开发环境

```
pnpm tauri dev
```

## 构建

参阅 [tauri](https://tauri.app/zh/v1/guides/building/) 文档, 使用如下命令构建:

```bash
pnpm tauri build
```

## 协议

-   [GPLv3](https://opensource.org/licenses/GPL-3.0)
