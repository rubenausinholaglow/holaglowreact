import { Container } from 'designSystem/Layouts/Layouts';

export default function DermaStepBar({
  steps,
  step,
}: {
  steps: number;
  step: number;
}) {
  const stepWidth = `${(100 / steps) * step}%`;

  return (
    <Container className="px-0 md:px-4 md:pt-12">
      <div className="md:w-1/2 md:pr-8">
        <ul className="flex bg-derma-primary500/20 h-[4px] w-full rounded-full mb-6">
          <li
            className="h-[4px] rounded-full bg-derma-primary transition-all"
            style={{ width: stepWidth }}
          />
        </ul>
      </div>
    </Container>
  );
}
