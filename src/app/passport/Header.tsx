import Image from 'next/image';

export default function Header() {
  return (
    <header className='w-full bg-hg-100'>
      <div className='m-4 bg-gradient-to-r from-hg-500  to-hg-200 to-70% p-[1px]'>
        <div className='bg-hg-100 p-4 flex flex-col items-center'>
          <p className='tracking-[10px] mt-32 mb-4'>BEAUTY</p>
          <Image className='mb-28' src='/images/passport/passport.svg' height='32' width='240' alt='Passport' />
          <Image src='/images/holaglow.svg' height='24' width='115' alt='Holaglow' />
        </div>
      </div>
    </header>
  );
}
