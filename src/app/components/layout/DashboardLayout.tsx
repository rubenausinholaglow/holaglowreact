import { ClinicProfessional } from '@components/ClinicProfessional';
import ButtonMessage from '@components/ui/ButtonMessage';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrowSmallLeft } from 'icons/Icons';

export default function DashboardLayout({
  hideTopBar = false,
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  children,
}: {
  hideTopBar?: boolean;
  hideBackButton?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen h-100 pt-4 text-sm ('/images/dashboard/background/main_background.png')] bg-[#A96FE7] bg-bottom bg-contain bg-no-repeat">
      <Flex
        layout="col-center"
        className="min-h-screen h-100 text-hg-black text-sm overflow-hidden"
      >
        {!hideTopBar && (
          <Container>
            <Flex layout="row-left" className="w-full pb-8">
              {!hideBackButton && (
                <Button href="#" type="tertiary">
                  <Flex layout="row-left">
                    <SvgArrowSmallLeft
                      height={40}
                      width={40}
                      className="pr-2"
                    />
                    Volver
                  </Flex>
                </Button>
              )}

              {!hideContactButtons && <ButtonMessage />}

              {!hideProfessionalSelector && (
                <div className="ml-auto z-10">
                  <ClinicProfessional />
                </div>
              )}
            </Flex>
          </Container>
        )}
        {children}
      </Flex>
    </main>
  );
}
