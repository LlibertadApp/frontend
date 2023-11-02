import { LoadingIndicator } from '#/components/loadingIndicator';

export const LoadingPage: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center h-screen overflow-hidden bg-gray-100">
      <div className="z-10 w-5/6 p-4 md:w-1/2 shadow-3xl rounded-xl">
        <div className="container mx-auto">
          <div className="flex items-center justify-center my-20">
            <img
              src="assets/logos/fenix.png"
              alt="fenix"
              className="object-cover h-auto mr-4 rounded w-28"
            />
            <img
              src="assets/logos/lla.svg"
              alt="lla"
              className="object-cover h-auto rounded w-50"
            />
          </div>
        </div>
      </div>

      <div className="flex absolute h-full">
        <LoadingIndicator className="w-16 h-16 fill-violet-700" />
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 h-screen bg-violet-brand"
        style={{
          clipPath: 'polygon(0 90%, 100% 80%, 100% 100%, 0% 100%)',
        }}
      />
    </section>
  );
};

export default LoadingPage;
