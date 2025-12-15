import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Mail,
  Lock,
  Cake,
  Ruler,
  Weight,
  AlertTriangle,
  Activity,
  ChevronLeft,
} from 'lucide-react-native';
import { useState } from 'react';

export default function RegisterScreen() {
  const router = useRouter();
  const [selectedPersonality, setSelectedPersonality] = useState('ceci');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#2196F3" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Información del Paciente</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <User
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
                strokeWidth={2}
              />
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#9E9E9E"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Mail
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
                strokeWidth={2}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Lock
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
                strokeWidth={2}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#9E9E9E"
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Lock
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
                strokeWidth={2}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#9E9E9E"
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <View style={styles.inputWrapper}>
                <Cake
                  size={20}
                  color="#2196F3"
                  style={styles.inputIcon}
                  strokeWidth={2}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Edad"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <View style={styles.inputWrapper}>
                <Ruler
                  size={20}
                  color="#2196F3"
                  style={styles.inputIcon}
                  strokeWidth={2}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Altura (cm)"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Weight
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
                strokeWidth={2}
              />
              <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                placeholderTextColor="#9E9E9E"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <AlertTriangle
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
                strokeWidth={2}
              />
              <TextInput
                style={styles.input}
                placeholder="Alergias conocidas (separadas por ..."
                placeholderTextColor="#9E9E9E"
                multiline
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Activity
                size={20}
                color="#2196F3"
                style={styles.inputIcon}
                strokeWidth={2}
              />
              <TextInput
                style={styles.input}
                placeholder="Antecedentes médicos relevantes"
                placeholderTextColor="#9E9E9E"
                multiline
              />
            </View>
          </View>

          <View style={styles.personalitySection}>
            <Text style={styles.personalityTitle}>
              Personalidad del asistente médico
            </Text>
            <Text style={styles.personalitySubtitle}>
              Elige el estilo de comunicación que prefieras
            </Text>

            <View style={styles.personalityOptions}>
              <TouchableOpacity
                style={[
                  styles.personalityCard,
                  selectedPersonality === 'rene' && styles.personalityCardActive,
                ]}
                onPress={() => setSelectedPersonality('rene')}
              >
                <View style={styles.personalityIcon}>
                  <User size={28} color="#616161" strokeWidth={2} />
                </View>
                <Text style={styles.personalityName}>René</Text>
                <Text style={styles.personalityDescription}>
                  Estilo profesional y directo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.personalityCard,
                  selectedPersonality === 'ceci' && styles.personalityCardActive,
                ]}
                onPress={() => setSelectedPersonality('ceci')}
              >
                <View style={styles.personalityIcon}>
                  <User size={28} color="#2196F3" strokeWidth={2} />
                </View>
                <Text style={styles.personalityName}>Ceci</Text>
                <Text style={styles.personalityDescription}>
                  Estilo cálido y empático
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Text style={styles.submitButtonText}>Completar Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  personalitySection: {
    marginTop: 24,
    marginBottom: 32,
  },
  personalityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  personalitySubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  personalityOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  personalityCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 20,
    alignItems: 'center',
  },
  personalityCardActive: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  personalityIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  personalityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  personalityDescription: {
    fontSize: 13,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
