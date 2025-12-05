import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchCharacterById } from '../api/rickApi';

export const CharacterDetail = ({ route }: any) => {
  const { id } = route.params;
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const json = await fetchCharacterById(id);
        setItem(json);
      } catch (e) {
        console.error(e);
      } finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!item) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No encontrado</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.headerRowCenter}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.statusBadge, item.status === 'Alive' ? styles.alive : item.status === 'Dead' ? styles.dead : styles.unknown]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.rowWrap}>
          <View style={styles.infoBlockSmall}>
            <Text style={styles.label}>Especie</Text>
            <Text style={styles.value}>{item.species}</Text>
          </View>
          <View style={styles.infoBlockSmall}>
            <Text style={styles.label}>Género</Text>
            <Text style={styles.value}>{item.gender}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Origen</Text>
          <Text style={styles.value}>{item.origin?.name}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Ubicación</Text>
          <Text style={styles.value}>{item.location?.name}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 18, alignItems: 'center', backgroundColor: '#F2F6FA' },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 5,
  },
  image: { width: 180, height: 180, borderRadius: 90, alignSelf: 'center', marginBottom: 14, backgroundColor: '#eee' },
  headerRowCenter: { width: '100%', alignItems: 'center', marginBottom: 6 },
  name: { fontSize: 22, fontWeight: '800', color: '#222', textAlign: 'center' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 18, marginTop: 8 },
  statusText: { color: '#fff', fontWeight: '700' },
  alive: { backgroundColor: '#34C759' },
  dead: { backgroundColor: '#FF3B30' },
  unknown: { backgroundColor: '#8E8E93' },
  rowWrap: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  infoBlockSmall: { flex: 1, paddingHorizontal: 6 },
  infoBlock: { marginTop: 14, width: '100%' },
  label: { color: '#666', fontSize: 12, marginBottom: 6 },
  value: { fontSize: 16, color: '#222', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#EEF0F3', width: '100%', marginTop: 14 }
});

export default CharacterDetail;
