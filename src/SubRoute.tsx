import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";

interface IProps {
  userAuthRoles: string[];
  loginRedirectPath: string;
  isUserAuthenticated: boolean;
  [route: string]: any;
}

const SubRoute: React.FC<IProps> = ({
  userAuthRoles,
  loginRedirectPath,
  isUserAuthenticated,
  ...route
}) => {
  // checks if user is permitted from permission arr to usersRole arr
  const isPermitted = (permissions: string[]) =>
    permissions.some((permission) => userAuthRoles.indexOf(permission)!==-1);

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) => {
          // check if redirect first
          if (route.redirect) {
            // loop through redirectes to check the permittability
            for (let redirect of route.redirect) {
              // check if redirect is for protected
              if (redirect.protected) {
                // if user authenticated
                if (isUserAuthenticated) {
                  return <Redirect to={redirect.page} />;
                } // if user not auth then redirect to specified fallback redirect
                else if (redirect.fallbackRedirect) {
                  return <Redirect to={redirect.fallbackRedirect} />;
                } // else redirect to login redirect
                else {
                  return <Redirect to={redirect.page} />;
                }
              }
              // check if redirect with permissions
              if (redirect.permissions) {
                // check if user is permitted
                if (isPermitted(redirect.permissions)) {
                  return <Redirect to={redirect.page} />;
                } // if user not permitted then redirect to specified fallback redirect
                else if (redirect.fallbackRedirect) {
                  return <Redirect to={redirect.fallbackRedirect} />;
                } // else redirect to login redirect
                else {
                  return <Redirect to={loginRedirectPath} />;
                }
              }
              // neter protected nor permitted then just redirect
              else {
                if (redirect.page) {
                  return <Redirect to={redirect.page} />;
                }
              }
            }
          }
          if (route.protected) {
            if (isUserAuthenticated) {
              if (route.component) {
                return <route.component {...props} routes={route.routes} />;
              }
            } else if (route.fallbackRouter) {
              return <Redirect to={route.fallbackRouter} />;
            } else {
              return <Redirect to={loginRedirectPath} />;
            }
          }
          if (route.permissions) {
            if (isPermitted(route.permissions)) {
              if (route.component) {
                return <route.component {...props} routes={route.routes} />;
              }
            } else if (route.fallbackRouter) {
              return <Redirect to={route.fallbackRouter} />;
            } else {
              return <Redirect to={loginRedirectPath} />;
            }
          } else {
            if (route.component) {
              return <route.component {...props} routes={route.routes} />;
            }
          }
        }}
      />
    </Suspense>
  );
};

export default SubRoute;
