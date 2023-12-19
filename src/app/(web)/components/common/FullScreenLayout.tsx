import { SvgSpinner } from 'app/icons/Icons';

export default function FullScreenLoading() {
  return (
    <div className="absolute flex inset-0 justify-center items-center">
      <SvgSpinner className="text-hg-secondary " />
    </div>
  );
}
