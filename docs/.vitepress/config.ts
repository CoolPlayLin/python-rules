import { defineConfig, type DefaultTheme } from "vitepress";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";

const description = async () => {
  try {
    return await fetch("https://v1.hitokoto.cn")
      .then((res) => res.json())
      .then((data) => data.hitokoto);
  } catch (error) {
    console.error("Unable to fetch description, use default value instead");
    return "一蓑烟雨任平生";
  }
};

export default defineConfig({
  title: "编程猫海龟星球",
  description: await description(),
  head: [
    ["link", { rel: "icon", href: "/turtleEditor.svg" }],
    ["link", { rel: "stylesheet", href: "/styles/font.css" }],
  ],
  themeConfig: {
    logo: "/favicon.svg",
    nav: nav(),
    sidebar: {
      "/article/": { base: "/article/", items: sidebarArticle() },
      "/policy/": { base: "/policy/", items: sidebarPolicy() },
    },
    footer: {
      message: "Released under the Attribution 4.0 International.",
      copyright: "Copyright © 2023-present author",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "群规",
      link: "/policy/",
    },
    {
      text: "文章",
      link: "/article/",
    },
  ];
}

function sidebarPolicy(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "主群规",
      items: [
        {
          text: "效力公告",
          link: "/",
        },
        {
          text: "编程猫 Python 海龟星球群规",
          link: "charter",
        },
      ],
    },
    {
      text: "条例",
      items: [
        {
          text: "广告限制条例",
          link: "advertisement",
        },
        {
          text: "机器人保护条例",
          link: "botProtection",
        },
        {
          text: "Python代码临时管理规定(试行)",
          link: "codePolicy",
        },
      ],
    },
    {
      text: "机器人用户协议",
      items: [
        {
          text: "FISH BOT用户协议",
          link: "botAgreements/FISH-20240206",
        },
        {
          text: "听风bot 用户协议",
          link: "botAgreements/TingFeng-20240216.md"
        }
      ],
    },
    {
      text: "执行命令",
      base: "/policy/executiveOrders/",
      items: [
        { text: "执行命令条例", link: "executiveOrder" },
        ...sortByDateAndNumber(
          readdirSync(resolve("docs", "policy", "executiveOrders")).filter(
            (value) => value !== "executiveOrder.md"
          ),
          [".md"]
        ).map((dir) => {
          return {
            text: dir.replace(".md", ""),
            link: dir,
          };
        }),
      ],
    },
  ];
}

function sidebarArticle(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "文章",
      items: readdirSync(resolve("docs", "article")).map((dir) => {
        return {
          text: dir === "index.md" ? "首页" : dir.replace(".md", ""),
          link: dir,
        };
      }),
    },
  ];
}

function sortByDateAndNumber(arr: string[], removeValues: string[]) {
  for (let removeValue of removeValues) {
    arr = arr.map((value) => value.replace(removeValue, ""));
  }
  return arr.sort((preValue, currentValue) => {
    const preParts = preValue.split("-");
    const preDate = Number(preParts[0]);
    const preNumber = Number(preParts[1]);

    const currentParts = currentValue.split("-");
    const currentDate = Number(currentParts[0]);
    const currentNumber = Number(currentParts[1]);

    if (preDate !== currentDate) {
      // 如果年份不同，按年份降序排列
      return currentDate - preDate;
    } else {
      // 如果年份相同，按数字升序排列
      return currentNumber - preNumber;
    }
  });
}
