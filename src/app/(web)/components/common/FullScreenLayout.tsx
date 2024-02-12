import { SvgSpinner } from 'app/icons/Icons';

export default function FullScreenLoading({
  isDerma = false,
}: {
  isDerma?: boolean;
}) {
  const classes = isDerma ? 'text-derma-primary' : 'text-hg-secondary';

  return (
    <div className="absolute flex inset-0 justify-center items-center">
      <SvgSpinner className={classes} />
    </div>
  );
}
