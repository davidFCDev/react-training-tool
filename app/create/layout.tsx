import LayoutWrapper from "@/components/common/LayoutWrapper";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
