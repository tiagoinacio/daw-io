import * as React from "react";

interface Button {
  children: React.ReactNode;
}

export default (props: Button) => <button>{props.children}</button>;
