import { InfoCardProps } from "@/types";

const InfoCard = ({ title, content }: InfoCardProps) => (
  <div className="p-4 max-w-52 w-full">
    <h3 className="text-lg font-bold uppercase text-left mb-3 text-success">
      {title}
    </h3>
    <pre className="whitespace-pre-wrap text-sm mt-3 text-zinc-300">
      {content}
    </pre>
  </div>
);

export default InfoCard;
