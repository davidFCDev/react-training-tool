import Image from "next/image";

interface CreateFormContainerProps {
  title: string;
  colorTitle: string;
  subtitle: string;
  form: React.ReactNode;
  image?: string;
}

const CreateFormContainer = ({
  title,
  colorTitle,
  subtitle,
  form,
  image,
}: CreateFormContainerProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6  mx-auto flex flex-col">
        <div className="title flex items-center justify-center gap-3">
          {image && <Image alt="Training" height={60} src={image} width={60} />}
          <h1>
            <span className="text-success">{colorTitle}</span> {title}
          </h1>
        </div>
        <p className="subtitle">{subtitle}</p>
      </div>

      {form}
    </div>
  );
};

export default CreateFormContainer;
