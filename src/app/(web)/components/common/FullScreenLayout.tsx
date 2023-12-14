import { SvgSpinner } from 'app/icons/Icons';

export default function FullScreenLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SvgSpinner className="text-hg-secondary " />
    </div>
  );
}
