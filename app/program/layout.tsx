import LayoutWrapper from "@/components/common/LayoutWrapper";

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
