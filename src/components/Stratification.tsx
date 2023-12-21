import {Alert, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState, useRef} from 'react';
import DeviceCountry, {
  TYPE_TELEPHONY,
  TYPE_CONFIGURATION,
  TYPE_ANY,
} from 'react-native-device-country';
import publicIP from 'react-native-public-ip';
import axios from 'axios';
import GameWeb from './GameWeb';
import FirstScreenGame from './FirstGameScreen';
import React from 'react';

const Stratification = () => {
  const [checkBrazil, setCheckBrazil] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DeviceCountry.getCountryCode(TYPE_CONFIGURATION)
      .then(result => {
        if (
          result.code.toLowerCase().includes('br') ||
          result.code.toLowerCase().includes('pt')
        ) {
          publicIP()
            .then(ip => {
              axios
                .get('https:ipinfo.io/' + `${ip}?token=878aca26a47573`)
                .then(response => {
                  if (
                    response.data.country?.toLowerCase().includes('br') ||
                    response.data.country?.toLowerCase().includes('pt')
                  ) {
                    setCheckBrazil(true);
                    setLoading(false);
                  } else {
                    setCheckBrazil(false);
                    setLoading(false);
                  }
                });
            })
            .catch(error => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
      });
  }, []);

  if (!loading) {
    if (checkBrazil) {
      return <GameWeb />;
    } else {
      return <FirstScreenGame />;
    }
  }
};

export default Stratification;
