import { useEffect } from 'react';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import { dermaService } from '@services/DermaService';
import { useDermaStore } from 'app/stores/dermaStore';

export const HandleNextMultistep = ({
  router,
  nextUrl,
}: {
  router: any;
  nextUrl: string;
}) => {
  const { id, setId, pain, skinType } = useDermaStore(state => state);

  useEffect(() => {
    const dermaQuestions = {
      id,
      pain,
      skinType,
    };

    dermaService.update(dermaQuestions as DermaQuestions).then(x => {
      if (id === undefined) {
        setId(x.toString());
      }
    });

    router.push(nextUrl);
  }, []);

  return null;
};
