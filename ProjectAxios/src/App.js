/* eslint-disable eqeqeq */
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {apiPoke} from './api';

// import { Container } from './styles';
//xhrAdapter
//

const ProjectAxios = () => {
  const [pokemon1, setPokemon1] = useState();
  const [pokemon2, setPokemon2] = useState();
  const [pokemon3, setPokemon3] = useState();

  let label = 1;

  
  async function loadPokemonAxios() {
    //let response;

    const response = await apiPoke.get('pokemon/pichu')

    console.log(response);

    apiPoke
      .get('pokemon/ditto')
      .then(
        response =>
          new Promise(resolve => setTimeout(() => resolve(response), 1000)),
      )
      .then(function (response) {
        console.log(response.data.name);
        switch (label) {
          case 1:
            setPokemon1(response.data.name);
            break;
          case 2:
            setPokemon2(response.data.name);
            break;
          case 3:
            setPokemon3(response.data.name);
            break;
        }
        label++;
      });

    fetch('https://pokeapi.co/api/v2/pokemon/charmander')
      .then(response => response.json())
      .then(response => {
        console.log(response.name);
        switch (label) {
          case 1:
            setPokemon1(response.name);
            break;
          case 2:
            setPokemon2(response.name);
            break;
          case 3:
            setPokemon3(response.name);
            break;
        }
        label++;
      })
      .catch(error => {
        console.error(error);
      });

    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then(response => response.json())
      .then(response => {
        console.log(response.name);
        switch (label) {
          case 1:
            setPokemon1(response.name);
            break;
          case 2:
            setPokemon2(response.name);
            break;
          case 3:
            setPokemon3(response.name);
            break;
        }
        label++;
      })
      .catch(error => {
        console.error(error);
      });
  }
  

  useEffect(() => {
    loadPokemonAxios();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text>{pokemon1 != undefined ? pokemon1 : 'Não Carregado'}</Text>
      <Text>{pokemon2 != undefined ? pokemon2 : 'Não Carregado'}</Text>
      <Text>{pokemon3 != undefined ? pokemon3 : 'Não Carregado'}</Text>
    </>
  );
};

export default ProjectAxios;
