import { Divider } from "@nextui-org/divider";

interface InfoCardProps {
  title: string;
  content: string;
}

const InfoCard = ({ title, content }: InfoCardProps) => (
  <div className="p-4 rounded-lg shadow-md bg-content1">
    <h3 className="text-lg font-bold uppercase text-left mb-3 text-gray-200">
      {title}
    </h3>
    <Divider />
    <pre className="whitespace-pre-wrap text-sm mt-3 text-gray-300">
      {content}
    </pre>
  </div>
);

export default InfoCard;
