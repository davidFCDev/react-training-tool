import LayoutWrapper from "@/components/common/LayoutWrapper";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
