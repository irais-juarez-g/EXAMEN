import React, { useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Linking, Share, Platform } from 'react-native';
import * as Location from 'expo-location';

const Locations = () => {
  const [deviceCoords, setDeviceCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const getDeviceLocation = async () => {
    try {
      setLoading(true);
      setStatusMsg('Solicitando permiso...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatusMsg('Permiso denegado');
        setLoading(false);
        return;
      }
      setStatusMsg('Obteniendo ubicación...');
      const loc = await Location.getCurrentPositionAsync({});
      setDeviceCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setStatusMsg('Ubicación obtenida');
    } catch (e: any) {
      setStatusMsg('Error: ' + (e.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.topButton, loading ? styles.topButtonDisabled : null]}
          activeOpacity={0.85}
          onPress={() => { if (!loading) getDeviceLocation(); }}
          accessibilityRole="button"
          accessibilityLabel="Obtener mi ubicación"
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.topButtonText}>OBTENER MI UBICACIÓN</Text>}
        </TouchableOpacity>

        {statusMsg ? (
          <Text style={[styles.status, statusMsg.includes('denegado') || statusMsg.startsWith('Error') ? styles.statusError : styles.statusOk]}>{statusMsg.startsWith('Ubicación') ? '✅ ' + statusMsg : statusMsg}</Text>
        ) : null}

        {deviceCoords ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ubicación obtenida</Text>
            <Text style={styles.coordText}><Text style={styles.coordLabel}>Lat:</Text> {Number(deviceCoords.latitude).toFixed(6)}</Text>
            <Text style={styles.coordText}><Text style={styles.coordLabel}>Lon:</Text> {Number(deviceCoords.longitude).toFixed(6)}</Text>

            <View style={styles.rowButtons}>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => {
                  const url = Platform.select({
                    ios: `maps:0,0?q=${deviceCoords.latitude},${deviceCoords.longitude}`,
                    default: `geo:${deviceCoords.latitude},${deviceCoords.longitude}?q=${deviceCoords.latitude},${deviceCoords.longitude}`
                  }) || `https://www.google.com/maps/search/?api=1&query=${deviceCoords.latitude},${deviceCoords.longitude}`;
                  Linking.openURL(url).catch(() => {
                    const web = `https://www.google.com/maps/search/?api=1&query=${deviceCoords.latitude},${deviceCoords.longitude}`;
                    Linking.openURL(web);
                  });
                }}
              >
                <Text style={styles.mapButtonText}>Abrir en Maps</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => {
                  const text = `Mi ubicación: ${deviceCoords.latitude.toFixed(6)}, ${deviceCoords.longitude.toFixed(6)}`;
                  Share.share({ message: text });
                }}
              >
                <Text style={styles.shareButtonText}>Compartir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  topButton: {
    width: '100%',
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    elevation: 3,
  },
  topButtonDisabled: { opacity: 0.85 },
  topButtonText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.6 },
  status: { marginTop: 12, color: '#333', textAlign: 'center' },
  statusOk: { color: '#1E7E34' },
  statusError: { color: '#C92A2A' },
  card: { marginTop: 18, width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 4, borderWidth: 1, borderColor: '#F2F4F6' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 8 },
  coordText: { fontSize: 16, color: '#222', marginTop: 4 },
  coordLabel: { color: '#666', fontWeight: '700' },
  rowButtons: { flexDirection: 'row', marginTop: 12 },
  mapButton: { marginRight: 10, backgroundColor: '#0A84FF', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  mapButtonText: { color: '#fff', fontWeight: '700' },
  shareButton: { backgroundColor: '#ECEFF5', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  shareButtonText: { color: '#111', fontWeight: '700' }
});

export default Locations;
