import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import EnviromentButton from '../../components/EnviromentButton';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import PlantCardPrimary from '../../components/PlantCardPrimary';
import api from '../../service/api';
import colors from '../../styles/colors';
import { styles } from './styles';

interface EnviromentProps {
  key: string;
  title: string;
}

interface IPlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

function PlantSelect() {
  const [environment, setEnviroment] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<IPlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<IPlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadedAll, setLoadedAll] = useState();

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);
    if (environment === 'all') {
      setFilteredPlants(plants);
    } else {
      const filtered = plants.filter((plant) => {
        plant.environments.includes(environment);
      });
      setFilteredPlants(filtered);
    }
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      setIsLoading(true);
    }

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((value) => value + 1);
    fetchPlants();
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get(
        'plants_environments?_sort=title&_order+asc'
      );
      setEnviroment([{ key: 'all', title: 'Todos' }, ...data]);
    }

    fetchEnviroment();
    fetchPlants();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Header />
            <Text style={styles.title}>Em qual hambiente </Text>
            <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
          </View>
          <View>
            <FlatList
              horizontal
              data={environment}
              renderItem={({ item }) => (
                <EnviromentButton
                  key={item.key}
                  title={item.title}
                  active={item.key === environmentSelected}
                  onPress={() => handleEnvironmentSelected(item.key)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.environmentList}
            />
          </View>
          <View style={styles.plants}>
            <FlatList
              data={filteredPlants}
              renderItem={({ item }) => (
                <PlantCardPrimary key={item.id} data={item} />
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              onEndReachedThreshold={0.1}
              onEndReached={({ distanceFromEnd }) =>
                handleFetchMore(distanceFromEnd)
              }
              ListFooterComponent={
                loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
              }
            />
          </View>
        </View>
      )}
    </>
  );
}

export default PlantSelect;
