import LayoutWrapper from "@/components/common/LayoutWrapper";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
