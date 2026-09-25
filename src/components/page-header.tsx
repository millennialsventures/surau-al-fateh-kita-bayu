import type { ReactNode } from "react";

import { Container } from "./container";
import { SectionHeading } from "./section-heading";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

/** Consistent masthead for every inner page. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-hairline bg-brand-50">
      <div className="pattern-geo">
        <Container className="py-14 sm:py-20">
          <SectionHeading eyebrow={eyebrow} title={title} description={description}>
            {children}
          </SectionHeading>
        </Container>
      </div>
    </div>
  );
}
