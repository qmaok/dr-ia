import { View, Text, StyleSheet } from 'react-native';
import { Building2 } from 'lucide-react-native';

export default function PharmaciesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farmacias Cercanas</Text>
      </View>
      <View style={styles.content}>
        <Building2 size={64} color="#BDBDBD" strokeWidth={1.5} />
        <Text style={styles.emptyText}>Buscando farmacias cercanas</Text>
        <Text style={styles.emptySubtext}>
          Aquí encontrarás farmacias donde puedes retirar tus recetas
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
