import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { fetchCharacters } from '../api/rickApi';

export const CharactersList = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async (pageUrl?: string, reset = false) => {
    try {
      setLoading(true);
      const json = await fetchCharacters(pageUrl);
      setNext(json.info.next);
      setData(prev => (reset ? json.results : [...prev, ...json.results]));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onRefresh = () => { load(undefined, true); };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CharacterDetail', { id: item.id })} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.species}>{item.species} • {item.gender}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, item.status === 'Alive' ? styles.aliveDot : item.status === 'Dead' ? styles.deadDot : styles.unknownDot]} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personajes</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        onEndReached={() => { if (next) load(next); }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 12 }} /> : null}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor="#2C6BED" />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6FA', paddingTop: 8 },
  title: { fontSize: 20, fontWeight: '700', color: '#111', paddingHorizontal: 16, marginBottom: 6 },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: { width: 84, height: 84, borderRadius: 12, marginRight: 14, backgroundColor: '#eee' },
  name: { fontSize: 16, fontWeight: '700', color: '#222' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, justifyContent: 'space-between' },
  species: { color: '#666' },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 10, height: 10, borderRadius: 10, marginRight: 8 },
  aliveDot: { backgroundColor: '#34C759' },
  deadDot: { backgroundColor: '#FF3B30' },
  unknownDot: { backgroundColor: '#8E8E93' },
  statusText: { color: '#666', fontSize: 12, fontWeight: '700' }
});

export default CharactersList;
