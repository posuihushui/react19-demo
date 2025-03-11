# what's optimistic update ui

## definition

update ui just assumes the api call will succeed and updates the client's ui immediately before the request comletes, rather than waiting for confirmation from the server. if the request eventually fails, it will roll back to the previous state.

## when to use

### 适合使用的场景

1、需要快速响应的场景，每次交互都需要服务端响应导致体验不佳的。

- 应用消息发送的功能，例如微信
- 点赞、切换开关

2、需要及时反馈的

- 拖拽操作
- 文档协作

3、网络延时明显

- 网络不稳定或者延时高

### 不适合的场景

1、安全性要求高的操作

- 转账、付款等操作
- 账户删除等

2、操作过程高度依赖服务端

- 机票、酒店预订

### 使用乐观更新的影响因素

主要用户体验： 操作失败回滚会对用户造成多大的困惑

## 手动实现 optimistic 逻辑

见`src/pages/page1.tsx`

## `useOptimistic`

## meta data

ui=render(state)

Action

async state mutation

### useActionState

useActionState 接收一个 action 函数，返回一个 wrapped Action fn，。

`const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);`

```js
const [error, submitAction, isPending] = useActionState(
  async (previousState, newName) => {
    const error = await updateName(newName);
    if (error) {
      // You can return any result of the action.
      // Here, we return only the error.
      return error;
    }

    // handle success
    return null;
  },
  null
);
```

### useOptimistic

### startTransition

用户更新状态

### <form> actions

### useOptimistic

### async state

`use`
