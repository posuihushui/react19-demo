> https://react.dev/blog/2024/12/05/react-19

fetch server statue

use(<Promise>)

## features

### React compiler

Auto wrap components state,like memo,useMemo,useCallback

### Server components

reduce lance, reduce request waterfall, move request near the data source.

### Actions

> By convention, functions that use async transitions are called "Actions".

use server is for sever action. There is no directive for Server Components.

### Document Meta

write header tag in render funciton, which is auto injected into header tag.

### Enhanced Hooks

use
not a hook,but a api.
can use a server status, or a context

```jsx
// must wrapped in a suspense component
const ProductList = () => {
  const products = use(fetchProducts());
  return (
    <ul>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};

const Products = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  );
};
```

useFormStatus()

Acts as a context consumer for the nearest parent <form> element, and provides you information about the current status of that form.

`const { pending, data, method, action } = useFormStatus()`;

useFormState()

`const [ state, formAction] = useFormState(fn, initialState, permalink?)`;

fn: the submit api

useOptimistic()

`const [optimisticState, updateOptimisticFn] = useOptimistic(state,  updateFn)`

useTransaction()
可中断的渲染，优先级。例如：click tab 非常快，可理解为中间的某个 change 是可以中断的。

```js
const tabList = ["tab1", "tab2", "tab3"];
const [tab, setTab] = useState(tabList[0]);
const [isPending, startTransiction] = useTransiction;

const handleTabChange = (targeTab) => {
  startTransiction(() => {
    setTab(targeTab);
  });
};
```

useOptimistic updateFn must wrap in a transaction

### Ref as props

no longer need for React.forwardRef

### Asset Loading

### Web Components
