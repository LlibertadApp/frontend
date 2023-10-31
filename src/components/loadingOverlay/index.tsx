import { LoadingIndicator } from '../loadingIndicator';
import { useLoader } from '#/context/LoaderContext';

const LoadingOverlay = () => {
  const { loading } = useLoader();

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-50 flex flex-col items-center justify-center">
        <LoadingIndicator className="w-16 h-16 fill-violet-500 opacity-100" />
      </div>
    );
  }
};

export default LoadingOverlay;
