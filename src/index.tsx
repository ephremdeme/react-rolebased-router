import React from "react";
import { Switch } from "react-router-dom";
import { RouterConfig } from "./types";
import SubRoute from "./SubRoute";

interface IProps {
  routes: RouterConfig[];
  userAuthRoles: string[];
  loginRedirectPath: string;
  isUserAuthenticated: boolean;
}

const Router: React.FC<IProps> = ({
  routes,
  userAuthRoles,
  loginRedirectPath,
  isUserAuthenticated,
}) => {
  return (
    <Switch>
      {routes &&
        routes.map((route: any) => (
          <SubRoute
            key={route.path}
            userAuthRoles={userAuthRoles}
            loginRedirectPath={loginRedirectPath}
            isUserAuthenticated={isUserAuthenticated}
            {...route}
          />
        ))}
    </Switch>
  );
};

export default Router;
