'use client';
import React, { useEffect, useState } from 'react';
import UserService from '@services/UserService';
import MainLayout from 'app/components/layout/MainLayout';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

const Page = () => {
  const [id, setId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerToken, setPlayerToken] = useState('');
  const [simulationReady, setSimulationReady] = useState(false);
  const [almostReady, setAlmostReady] = useState(false);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const username =
    typeof window !== 'undefined' ? localStorage.getItem('username') : null;

  useEffect(() => {
    const userId = localStorage.getItem('id');
    const appointmentId = localStorage.getItem('appointmentId');
    const clinicId = localStorage.getItem('ClinicId');
    UserService.createCrisalixUser(userId!, appointmentId!, clinicId!).then(
      x => {
        setPlayerId(x.playerId);
        setPlayerToken(x.playerToken);
        setId(x.id);
      }
    );

    setTimeout(
      () => {
        setAlmostReady(true);
      },
      1 * 60 * 1000
    );
  }, []);

  const checksimulationReady = () => {
    if (id == '' || playerToken == '') return;
    const clinicId = localStorage.getItem('ClinicId');
    UserService.getSimulationReady(id, clinicId!).then(x => {
      setSimulationReady(x);
      if (!x) {
        setTimeout(() => {
          checksimulationReady();
        }, 15 * 1000);
      }
    });
  };
  useEffect(() => {
    checksimulationReady();
  }, [playerId, playerToken]);

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
    <MainLayout isDashboard>
      {username && (
        <Container>
          <Flex layout="col-center">
            {!simulationReady && !loadPlayer && (
              <p className="font-bold text-4xl mb-2">
                {username}, estamos generando tu 3D/Avatar...
              </p>
            )}
            {!simulationReady && !loadPlayer && almostReady && (
              <p className="font-bold text-4xl mb-2">
                {username}, en breves podrás ver tu 3D
              </p>
            )}
            {simulationReady && !loadPlayer && (
              <div>
                <p className="font-bold text-4xl mb-2">
                  {username}, ¿Listo para ver tu 3D?
                </p>

                <Button size="lg" style="primary" onClick={startPlayer}>
                  Ver 3D
                </Button>
              </div>
            )}
            {simulationReady && loadPlayer && (
              <div id="player" className="w-full h-[1000px]"></div>
            )}
          </Flex>
        </Container>
      )}
    </MainLayout>
  );
};

export default Page;
