# bangumi-api-ts

> 用 typescript 包装的 [Bangumi REST API](https://github.com/bangumi/api).

## 安装

```shell
npm i bangumi-api-ts
```

## 使用

```typescript
import { BangumiApi } from 'bangumi-api-ts';

const bgm = new BangumiApi({
  AccessToken: '/* Your AccessToken */',
});
```

可以在 <https://next.bgm.tv/demo/access-token> 生成 AccessToken
