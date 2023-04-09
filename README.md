# bangumi-api-ts

> 用 typescript 包装的 [Bangumi REST API](https://github.com/bangumi/api).

## 安装

```shell
npm i bangumi-api-ts
```

## 使用

```typescript
import { BangumiApi } from 'bangumi-api-ts';

const {
  calendar, // 每日放送
  characters, // 角色
  collections, // 收藏
  episodes, // 章节
  getMe, // 当前 Access Token 对应的用户信息
  indices, // 目录
  persons, // 人物
  revisions, // 编辑历史
  search, // 搜索
  subjects, // 条目
  users, // 用户
} = new BangumiApi({
  AccessToken: '/* Your AccessToken */',
});
```

可以在 <https://next.bgm.tv/demo/access-token> 生成 AccessToken
