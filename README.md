<p align="center">
  <a href="https://github.com/LeulAria/react-role-based-router">
    <img width="200" src="https://raw.githubusercontent.com/LeulAria/react-rolebased-router/main/assets/logo.png">
  </a>
</p>

<h1 align="center">react rolebased router</h1>

<p align="center">
  <img src="https://img.shields.io/bundlephobia/minzip/react-rolebased-router?style=flat-square" alt="package size" />
  <img src="https://img.shields.io/npm/v/react-rolebased-router?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/jsdelivr/npm/hm/react-rolebased-router?style=flat-square" alt="downloads per month" />
</p>

## Usage

```shell

npm i react-rolebased-router

yarn add react-rolebased-router

```

Here is a quick example to get you started, **it's all you need**:

```tsx
import * as React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import ReactRoleAccessRouter from "react-rolebased-router";
import { RouterConfig } from "react-rolebased-router/lib/types";

const routes: RouterConfig[] = [
  {
    path: "/",
    exact: true,
    redirect: [
      {
        page: "/dashboard",
        permissions: ["admin"],
      }
    ],
    exact: true,
    fallback: <div>Loading...</div>,
  },
  {
    path: "/home",
    component: lazy(() => import("./pages/Home")),
    exact: true,
    fallback: <div>Loading...</div>,
    private: true,
    permissions: ["super-admin", "admin"]
  },
  ...
  {
    path: "/*",
    component: lazy(() => import("./pages/NotFound")),
    exact: false,
    fallback: <div>Loading...</div>,
  },
]

const App = () => {
  return (
    </BrowserRouter>
      <ReactRoleAccessRouter
        routes={routes}
        userAuthRoles={userRoles}
        loginRedirectPath={"/login"}
        isUserAuthenticated={loggedIn}
      />
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

See Demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bold-beaver-4lrq6)

🤔 Wana make it awesome, contribute, create an issue and more  are welcome.

2021.
