import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <div className="site-page-enter w-full grow">{children}</div>;
}
