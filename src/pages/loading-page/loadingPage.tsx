import { LoadingIndicator } from '#/components/loadingIndicator';

export const LoadingPage: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center h-screen overflow-hidden bg-violet-brand">

      <div className="flex absolute h-full">
        <LoadingIndicator className="w-16 h-16 fill-violet-700" />
      </div>

    </section>
  );
};

export default LoadingPage;
