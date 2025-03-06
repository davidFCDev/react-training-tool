import React from "react";

interface SectionProps {
  children: React.ReactNode;
  props?: string;
}
const LayoutWrapper = ({ children, props }: SectionProps) => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:pb-6 md:pt-0">
      <div className={`${props} inline-block text-center justify-center`}>
        {children}
      </div>
    </section>
  );
};

export default LayoutWrapper;
