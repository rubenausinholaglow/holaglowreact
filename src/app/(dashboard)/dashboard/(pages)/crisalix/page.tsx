'use client';

import React, { useEffect, useState } from 'react';
import UserService from '@services/UserService';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { CrisalixUser } from 'app/types/crisalix';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { useCrisalix } from './useCrisalix';

const Page = () => {
  const [id, setId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerToken, setPlayerToken] = useState('');
  const [simulationReady, setSimulationReady] = useState(false);
  const [almostReady, setAlmostReady] = useState(false);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const [lastSimulatorId, setLastSimulatorId] = useState('');

  const userCrisalix = useCrisalix(state => state);
  const {
    storedClinicId,
    user,
    storedAppointmentId,
    checkSimulator,
    setCheckSimulator,
    storedClinicFlowwwId,
  } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setCheckSimulator(true);
    const existsCrisalixUser =
      userCrisalix.crisalixUser.length > 0
        ? userCrisalix.crisalixUser[0]
        : null;

    if (existsCrisalixUser == null) {
      createCrisalixUser(user?.id || '', storedAppointmentId, storedClinicId);
    }

    if (existsCrisalixUser != null) {
      setId(existsCrisalixUser.id);
      setPlayerToken(existsCrisalixUser.playerToken);
      setPlayerId(existsCrisalixUser.playerId);
    }
    setTimeout(
      () => {
        setAlmostReady(true);
      },
      1 * 60 * 1000
    );

    UserService.getSimulationReady(
      existsCrisalixUser!.id,
      storedClinicFlowwwId!
    ).then(x => {
      setSimulationReady(x.has3d);
      setLastSimulatorId(x.lastSimulatorId);
    });
  }, []);

  async function createCrisalixUser(
    userId: string,
    appointmentId: string,
    clinicId: string
  ) {
    await UserService.createCrisalixUser(userId, appointmentId, clinicId).then(
      async x => {
        const crisalixUser: CrisalixUser = {
          id: x.id,
          playerId: x.player_id,
          playerToken: x.playerToken,
          name: x.name,
        };
        userCrisalix.addCrisalixUser(crisalixUser);
        setId(x.id);
        setPlayerToken(x.playerToken);
        setPlayerId(x.player_Id);
      }
    );
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const checksimulationReady = () => {
      if (id === '' || playerToken === '') return;

      UserService.getSimulationReady(id, storedClinicFlowwwId!).then(x => {
        setSimulationReady(x.has3d);
        setLastSimulatorId(x.lastSimulatorId);
        if (!x && checkSimulator) {
          timerId = setTimeout(checksimulationReady, 15 * 1000);
        }
      });
    };

    if (id !== '' && playerToken !== '') {
      timerId = setTimeout(checksimulationReady, 15 * 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [id, playerToken, storedClinicFlowwwId, checkSimulator]);

  useEffect(() => {
    if (playerId == '' || playerToken == '') return;
    const script = `
        var url = 'https://api3d.crisalix.com/v2/player.js';
        var scriptLoaded = false;
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--; ) {
          if (scripts[i].src == url && !scriptLoaded) scriptLoaded = true;
        }
        if(!scriptLoaded){
          const scriptTag = document.createElement("script");
          scriptTag.src = url;
          document.head.appendChild(scriptTag);
          scriptTag.addEventListener('load', function() {
            var player_token = '${playerToken}';
            var player = new CrisalixPlayer(player_token);
            var options = {
              container: document.getElementById('player'),
              reconstruction_type: 'face',
              player_id: '${playerId}'
            };
            if (${lastSimulatorId}) {
              options['simulation_id'] = ${lastSimulatorId};
            }
            options['locale'] = 'es';
            player.render('surgeon', options);
          });
        }
        else {
          var player_token = '${playerToken}';
          var player = new CrisalixPlayer(player_token);
          var options = {
            container: document.getElementById('player'),
            reconstruction_type: 'face',
            player_id: '${playerId}'
          };
          options['locale'] = 'es';
          if (${lastSimulatorId}) {
            options['simulation_id'] = ${lastSimulatorId};
          }
          player.render('surgeon', options);
        }
      `;
    const toExecute = new Function(script);
    toExecute();
  }, [loadPlayer]);

  const startPlayer = () => {
    setLoadPlayer(true);
  };

  return (
    <MainLayout isDashboard hideContactButtons hideProfessionalSelector>
      {user?.firstName && (
        <div className="absolute inset-0 flex justify-center items-center">
          <Flex layout="col-center" className="max-w-[80%]">
            {!simulationReady && !loadPlayer && !almostReady && (
              <p className="font-bold text-4xl mb-2">
                {user?.firstName}, estamos generando tu 3D/Avatar...
              </p>
            )}
            {!simulationReady && !loadPlayer && almostReady && (
              <p className="font-bold text-4xl mb-2">
                {user?.firstName}, en breve podrás ver tu 3D
              </p>
            )}
            {simulationReady && !loadPlayer && (
              <div>
                <p className="font-bold text-4xl mb-2">
                  {user?.firstName}, ¿Listo para ver tu 3D?
                </p>

                <Button size="lg" onClick={startPlayer}>
                  Ver 3D
                </Button>
              </div>
            )}
            {simulationReady && loadPlayer && (
              <div id="player" className="w-full h-[1000px]"></div>
            )}
          </Flex>
        </div>
      )}
    </MainLayout>
  );
};

export default Page;
