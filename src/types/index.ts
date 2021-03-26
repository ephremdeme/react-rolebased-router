import { ComponentType, LazyExoticComponent, ReactNode } from "react";

export interface RouterRedirect {
  page: string;
  permissions?: string[];
  protected?: boolean;
  fallbackRedirect?: string;
}

export interface RouterConfig {
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  routes?: RouterConfig[];
  redirect?: RouterRedirect[];
  private?: boolean;
  permissions?: string[];
  fallbackRedirect?: string;
}
