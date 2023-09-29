'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserService from '@services/UserService';

const Page = () => {
  let playerId = '';
  let playerToken = '';
  useEffect(() => {
    const userId = localStorage.getItem('id');
    const appointmentId = localStorage.getItem('appointmentId');
    const clinicId = localStorage.getItem('ClinicId');
    UserService.createCrisalixUser(userId!, appointmentId!, clinicId!).then(
      x => {
        playerId = x.playerId;
        playerToken = x.playerToken;
        const toExecute = new Function(script);
        toExecute();
      }
    );
  }, []);
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
      player.render('patient', options);
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
    player.render('patient', options);
  }
`;
  return (
    <section className="bg-hg-pink h-screen flex flex-col items-center">
      <div id="player"></div>
    </section>
  );
};

export default Page;
