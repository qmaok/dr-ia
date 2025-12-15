import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Send, MoreVertical } from 'lucide-react-native';

export default function ChatScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#2196F3" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Dra. Ceci</Text>
          <Text style={styles.headerSubtitle}>Asistente Médico IA</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="hola"
            placeholderTextColor="#9E9E9E"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2196F3',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#757575',
  },
  menuButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    flexGrow: 1,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
