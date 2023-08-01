This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Initial Setup

First, install dependencies and create `husky` hooks:

```bash
yarn
yarn setup
```

Now you have `.env` file in working directory
Fill missing values according to the comments before running the project

## After pulling new changes

Don't forget to run

```bash
yarn
```

to keep packages installed and migrations updated.

Also track changes in the `example.env` to keep it synced with your local `.env`

## Getting Started

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Redux with SSR

You can use redux on server side to pass preloaded state.
To do it you will need to call `initializeStore` in `getServerSideProps` method of the page and preform necessary state updates. When this is done you need to pass state of created store to `internal.initialReduxState` property.


```typescript
import { initializeStore } from '@/redux/store';
import { withPageSettings } from '@/utils';

export const getServerSideProps = withPageSettings(
  { ... },
  async () => {
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;
    await dispatch(loadItems({ page: 0, limit: 20 })).unwrap();

    const initialReduxState = reduxStore.getState();
    return {
      props: {
        internal: {
          initialReduxState,
        },
      },
    };
  },
);
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!