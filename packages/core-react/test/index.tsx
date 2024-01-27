import {
  Queries,
  RenderOptions,
  queries,
  render as defaultRender,
} from "@testing-library/react";

import * as React from "react";

export const render = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: React.ReactElement,
  options?: RenderOptions<Q, Container, BaseElement>,
) => defaultRender(ui, { ...options });

export { act, cleanup, fireEvent, screen } from "@testing-library/react";
export { getSampleVideo } from "../../core/test";
