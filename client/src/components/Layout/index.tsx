import React, { ReactNode } from "react";
import { Header } from "../index"
import { LayoutProps } from "./type"

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="mx-auto max-w-[872px] w-full my-3">footer</footer>
    </>
  );
};
