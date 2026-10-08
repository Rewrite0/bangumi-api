# bangumi-api-ts

> 用 TypeScript 封装的 [Bangumi REST API](https://github.com/bangumi/api) 客户端。

## 特点

- **类型安全**：基于 Bangumi OpenAPI 类型定义 API 参数和响应结果。
- **按模块引入**：按照 API 领域拆分为 `subjects`、`characters`、`collections`、`episodes`、`indices`、`persons`、`revisions` 和 `users` 等入口。
- **原生 ESM**：使用现代 ESM 导出，适合浏览器、Node.js、Deno、Bun 等支持 ESM 的环境。
- **支持 Tree Shaking**：包声明了 `sideEffects: false`，未使用的 API 模块和导出可以被支持 Tree Shaking 的打包器移除。
- **Fetch 优先**：默认使用运行时提供的 `globalThis.fetch`，也可以通过适配器接入任意 HTTP 客户端。

## 安装

```shell
npm i bangumi-api-ts
```

## 快速开始

```typescript
import { configure } from 'bangumi-api-ts';
import { getSubjectById } from 'bangumi-api-ts/subjects';

// 配置 accessToken (如果需要)
configure({
  accessToken: 'your-access-token',
});

// 使用 API
const subject = await getSubjectById(123456);
console.log(subject);
```

可以在 <https://next.bgm.tv/demo/access-token> 生成 AccessToken。

默认适配器使用运行时的 `globalThis.fetch`。现代浏览器、Node.js 18+、Deno 和 Bun 通常都可以直接使用；不提供 Fetch API 的运行时可以配置自定义适配器。

## API 入口

根入口提供通用配置和请求方法：

```typescript
import { configure, fetchApi, fetchResponse } from 'bangumi-api-ts';
```

具体的 Bangumi API 按领域通过子路径引入：

```typescript
import { getSubjectById } from 'bangumi-api-ts/subjects';
import { getUserByUsernameOrUid } from 'bangumi-api-ts/users';
```

可用的 API 子路径包括：

- `bangumi-api-ts/characters`
- `bangumi-api-ts/collections`
- `bangumi-api-ts/episodes`
- `bangumi-api-ts/indices`
- `bangumi-api-ts/persons`
- `bangumi-api-ts/revisions`
- `bangumi-api-ts/subjects`
- `bangumi-api-ts/users`

每个 API 子路径都会同时导出对应的请求函数、请求参数类型和响应类型。解码后的成功响应类型统一使用 `*Response` 后缀，列表响应使用复数资源名，单个资源响应使用单数资源名；关联资源使用 `*Related*Response` 命名。类型由 Bangumi OpenAPI 定义生成并在客户端方法中使用，可以直接用于约束请求参数和业务数据：

```typescript
import { getSubjects } from 'bangumi-api-ts/subjects';
import type { SubjectsParams, SubjectsResponse } from 'bangumi-api-ts/subjects';

const params: SubjectsParams = {
  type: 2,
  page: 1,
  pageSize: 20,
};

const subjects: SubjectsResponse = await getSubjects(params);
```

### Enum 导出

项目同时导出了常用枚举对应的运行时常量。它们使用 `as const` 对象实现，既可以在运行时作为参数值使用，也可以通过同名的 TypeScript 类型获得联合类型约束：

```typescript
import { getSubjects, SubjectType } from 'bangumi-api-ts/subjects';
import type { SubjectsParams } from 'bangumi-api-ts/subjects';

const params: SubjectsParams = {
  type: SubjectType.Anime,
  page: 1,
  pageSize: 20,
};

await getSubjects(params);
```

这些常量和类型均从对应的 API 子路径导出；需要类型而不需要运行时值时，建议使用 `import type`，以避免产生不必要的运行时导入。

## 自定义 HTTP 客户端

支持通过适配器模式使用自定义的 HTTP 客户端。`RequestAdapter` 是一个函数类型，接收请求信息并返回标准的 `Response`，而不是需要实现 `.request()` 方法的 class：

```typescript
import { configure } from 'bangumi-api-ts';
import type { RequestAdapter } from 'bangumi-api-ts/adapters';

const requestAdapter: RequestAdapter = async ({ url, method, headers, data }) => {
  const response = await yourHttpClient({
    url,
    method,
    headers,
    data,
  });

  if (!response.ok) {
    throw response;
  }

  return response;
};

configure({
  requestAdapter,
  accessToken: 'your-access-token',
});
```

## License

MIT
