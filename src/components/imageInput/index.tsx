const ImageInput = ({
  id = 'dropzone-file',
  handleOnChange,
}: {
  id: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  capture?: undefined | 'user' | 'environment';
}) => {
  return (
    <input
      id={id}
      type="file"
      className="hidden"
      accept="image/*,application/pdf"
      onChange={handleOnChange}
    />
  );
};

export default ImageInput;
