import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, ChevronLeft } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#2196F3" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Iniciar Sesión</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>Dr.</Text>
            </View>
            <Text style={styles.brandText}>Dr IA</Text>
          </View>

          <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
          <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>

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

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Text style={styles.submitButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>
              ¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate</Text>
            </Text>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  brandText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2196F3',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 32,
    textAlign: 'center',
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
  forgotPassword: {
    fontSize: 14,
    color: '#2196F3',
    textAlign: 'right',
    marginBottom: 24,
    fontWeight: '600',
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
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  registerLink: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  registerLinkBold: {
    fontWeight: '700',
    color: '#2196F3',
  },
});
