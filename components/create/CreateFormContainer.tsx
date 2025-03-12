interface CreateFormContainerProps {
  title: string;
  colorTitle: string;
  subtitle: string;
  form: React.ReactNode;
}

const CreateFormContainer = ({
  title,
  colorTitle,
  subtitle,
  form,
}: CreateFormContainerProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6  mx-auto flex flex-col">
        <h1 className="title">
          <span className="text-success">{colorTitle}</span> {title}
        </h1>
        <p className="subtitle">{subtitle}</p>
      </div>

      {form}
    </div>
  );
};

export default CreateFormContainer;
