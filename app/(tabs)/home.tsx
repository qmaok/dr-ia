import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  MessageSquare,
  Info,
  ChevronUp,
  History,
  Building2,
  MoreVertical,
  Settings,
  LogOut,
} from 'lucide-react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>Dr.</Text>
          </View>
          <View>
            <Text style={styles.greeting}>¡Hola, demio!</Text>
            <Text style={styles.subGreeting}>¿Cómo te sientes hoy?</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsModalVisible(true)}
        >
          <MoreVertical size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => router.push('/chat')}
        >
          <View style={styles.aiCardHeader}>
            <MessageSquare size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.aiCardTitle}>Asistent Médico IA</Text>
          </View>
          <Text style={styles.aiCardDescription}>
            Describe tus síntomas y obtén una solicitud de receta médica generada por IA
          </Text>
          <View style={styles.aiCardButton}>
            <Text style={styles.aiCardButtonText}>Iniciar Chat</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.requestCard}>
          <View style={styles.requestHeader}>
            <Text style={styles.requestLabel}>Solicitud médica</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>EN PROCESO</Text>
            </View>
          </View>

          <Text style={styles.requestTime}>15:21 - 15:36</Text>

          <View style={styles.progressBar}>
            <View style={styles.progressBarFill} />
          </View>

          <TouchableOpacity
            style={styles.requestInfo}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <View style={styles.requestInfoLeft}>
              <View style={styles.infoIconContainer}>
                <Info size={20} color="#2196F3" strokeWidth={2} />
              </View>
              <Text style={styles.requestInfoText}>
                Un médico ya está revisando tu solicitud
              </Text>
            </View>
            <ChevronUp
              size={20}
              color="#757575"
              style={{
                transform: [{ rotate: isExpanded ? '0deg' : '180deg' }],
              }}
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.expandedText}>
                Si tienes dudas durante la revisión, escríbeme por el chat.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(tabs)/history')}
            >
              <View style={styles.quickActionIconContainer}>
                <History size={32} color="#2196F3" strokeWidth={2} />
              </View>
              <Text style={styles.quickActionTitle}>Mi Historial</Text>
              <View style={styles.quickActionImage}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>📋</Text>
                </View>
              </View>
              <Text style={styles.quickActionSubtitle}>
                Ver recetas y consultas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(tabs)/pharmacies')}
            >
              <View style={styles.quickActionIconContainer}>
                <Building2 size={32} color="#2196F3" strokeWidth={2} />
              </View>
              <Text style={styles.quickActionTitle}>Farmacias</Text>
              <View style={styles.quickActionImage}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>💊</Text>
                </View>
              </View>
              <Text style={styles.quickActionSubtitle}>
                Encuentra farmacias cercanas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setIsModalVisible(false);
                // Navigate to configuration screen (to be implemented)
              }}
            >
              <View style={styles.modalIconContainer}>
                <Settings size={24} color="#2196F3" strokeWidth={2} />
              </View>
              <Text style={styles.modalOptionText}>Configuración</Text>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setIsModalVisible(false);
                router.replace('/login');
              }}
            >
              <View style={styles.modalIconContainer}>
                <LogOut size={24} color="#F44336" strokeWidth={2} />
              </View>
              <Text style={[styles.modalOptionText, styles.logoutText]}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  subGreeting: {
    fontSize: 14,
    color: '#757575',
  },
  menuButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  aiCard: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  aiCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  aiCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  aiCardDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.95,
  },
  aiCardButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  aiCardButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2196F3',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  requestLabel: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  requestTime: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#2196F3',
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  requestInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestInfoText: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '600',
    flex: 1,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  expandedText: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  quickActionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
    textAlign: 'center',
  },
  quickActionImage: {
    width: '100%',
    height: 60,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 32,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  logoutText: {
    color: '#F44336',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
});
