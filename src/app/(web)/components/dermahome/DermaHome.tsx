import DermaLayout from '../layout/DermaLayout';
import DermaBottomBar from './DermaBottomBar';
import HeroDerma from './HeroDerma';
import HomeBlocksDerma from './HomeBlocksDerma';

export default function DermaHome() {
  return (
    <DermaLayout>
      <HeroDerma />
      <HomeBlocksDerma />
      <DermaBottomBar />
    </DermaLayout>
  );
}
