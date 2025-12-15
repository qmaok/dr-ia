import { View, Text, StyleSheet } from 'react-native';
import { History } from 'lucide-react-native';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Historial</Text>
      </View>
      <View style={styles.content}>
        <History size={64} color="#BDBDBD" strokeWidth={1.5} />
        <Text style={styles.emptyText}>No hay historial disponible</Text>
        <Text style={styles.emptySubtext}>
          Tus consultas y recetas aparecerán aquí
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#757575',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 8,
    textAlign: 'center',
  },
});
