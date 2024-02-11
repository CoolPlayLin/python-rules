import { defineConfig, type DefaultTheme } from "vitepress";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";

const description = await fetch("https://v1.hitokoto.cn")
  .then((res) => res.json())
  .then((data) => data.hitokoto);

export default defineConfig({
  title: "编程猫海龟星球",
  description: description,

  themeConfig: {
    logo: "/favicon.svg",
    nav: nav(),
    sidebar: {
      "/article/": sidebarArticle(),
      "/policy/": sidebarPolicy(),
    },
    footer: {
      message: "Released under the Attribution 4.0 International.",
      copyright: "Copyright © 2023-present author",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "群规",
      link: "/policy/charter",
    },
    {
      text: "文章",
      link: "/article/index",
    },
  ];
}

function sidebarPolicy(): DefaultTheme.SidebarGroup[] {
  return [
    {
      text: "主群规",
      items: [
        {
          text: "编程猫 Python 海龟星球群规",
          link: "/policy/charter",
        },
      ],
    },
    {
      text: "条例",
      items: [
        {
          text: "广告限制条例",
          link: "/policy/advertisement",
        },
        {
          text: "机器人保护条例",
          link: "/policy/botProtection",
        },
        {
          text: "Python代码临时管理规定(试行)",
          link: "/policy/codePolicy",
        },
      ],
    },
    {
      text: "机器人用户协议",
      items: [
        {
          text: "FISH BOT用户协议",
          link: "/policy/botAgreements/FISH-20240206",
        },
      ],
    },
    {
      text: "执行命令",
      items: readdirSync(resolve("docs", "policy", "executiveOrders")).map(
        (dir) => {
          return {
            text: dir.replace(".md", ""),
            link: `/policy/executiveOrders/${dir}`,
          };
        }
      ),
    },
  ];
}

function sidebarArticle(): DefaultTheme.SidebarGroup[] {
  return [
    {
      text: "文章",
      items: readdirSync(resolve("docs", "article")).map((dir) => {
        return {
          text: dir === "index.md" ? "首页" : dir.replace(".md", ""),
          link: `/article/${dir}`,
        };
      }),
    },
  ];
}
