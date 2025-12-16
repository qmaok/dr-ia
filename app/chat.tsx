import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Send, MoreVertical, FileText } from 'lucide-react-native';
import { useState } from 'react';
import { generatePrescription } from '../services/prescriptionService';
import { PrescriptionAPIError } from '../types/prescription';
import { prescriptionTemplates } from '../services/prescriptionTemplates';

export default function ChatScreen() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPrescriptionId, setLastPrescriptionId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const handleGeneratePrescription = async () => {
    setIsGenerating(true);
    try {
      // Create prescription request from selected template
      const template = prescriptionTemplates[selectedTemplate];
      const request = template.create();

      // Call the API
      const response = await generatePrescription(request);

      if (response.success) {
        setLastPrescriptionId(response.recetaId);
        Alert.alert(
          'Receta Generada',
          `Receta creada exitosamente.\nID: ${response.recetaId}`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Error', response.message || 'Error al generar la receta');
      }
    } catch (error) {
      if (error instanceof PrescriptionAPIError) {
        Alert.alert(
          'Error de Validación',
          error.message,
          [{ text: 'OK' }]
        );
        console.error('Prescription API Error:', error.details);
      } else {
        Alert.alert('Error', 'Error inesperado al generar la receta');
        console.error('Unexpected error:', error);
      }
    } finally {
      setIsGenerating(false);
    }
  };

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
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>Demo: Generación de Receta</Text>
          <Text style={styles.demoDescription}>
            Selecciona una obra social y genera la receta
          </Text>

          <View style={styles.templateSelector}>
            <Text style={styles.templateSelectorTitle}>Obra Social / Cobertura:</Text>
            <View style={styles.templateButtons}>
              {prescriptionTemplates.map((template, index) => (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templateButton,
                    selectedTemplate === index && styles.templateButtonActive,
                  ]}
                  onPress={() => setSelectedTemplate(index)}
                >
                  <Text
                    style={[
                      styles.templateButtonText,
                      selectedTemplate === index && styles.templateButtonTextActive,
                    ]}
                  >
                    {template.name}
                  </Text>
                  {template.afiliado !== 'N/A' && (
                    <Text
                      style={[
                        styles.templateButtonAfiliado,
                        selectedTemplate === index && styles.templateButtonAfiliadoActive,
                      ]}
                    >
                      {template.afiliado}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
            onPress={handleGeneratePrescription}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <FileText size={24} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.generateButtonText}>
                  Generar Receta: {prescriptionTemplates[selectedTemplate].name}
                </Text>
              </>
            )}
          </TouchableOpacity>

          {lastPrescriptionId && (
            <View style={styles.successCard}>
              <Text style={styles.successTitle}>✓ Última receta generada</Text>
              <Text style={styles.successId}>ID: {lastPrescriptionId}</Text>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>ℹ️ Información</Text>
            <Text style={styles.infoText}>
              Esta es una demostración de la integración con la API de Innovamed.
              {'\n\n'}
              <Text style={styles.infoBold}>Template seleccionado:</Text> {prescriptionTemplates[selectedTemplate].name}
              {'\n'}
              <Text style={styles.infoBold}>Afiliado:</Text> {prescriptionTemplates[selectedTemplate].afiliado}
              {'\n\n'}
              Datos de prueba:{'\n'}
              • Paciente: Ana González{'\n'}
              • Médico: Dr. Juan Pérez{'\n'}
              • Medicamento: Código 12345
            </Text>
          </View>
        </View>
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
  demoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  demoTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
    textAlign: 'center',
  },
  demoDescription: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  generateButton: {
    backgroundColor: '#2196F3',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  generateButtonDisabled: {
    backgroundColor: '#90CAF9',
    shadowOpacity: 0.1,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  successCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  successId: {
    fontSize: 14,
    color: '#388E3C',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: '700',
  },
  templateSelector: {
    marginBottom: 20,
  },
  templateSelectorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 12,
  },
  templateButtons: {
    gap: 10,
  },
  templateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  templateButtonActive: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  templateButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  templateButtonTextActive: {
    color: '#2196F3',
  },
  templateButtonAfiliado: {
    fontSize: 13,
    color: '#757575',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  templateButtonAfiliadoActive: {
    color: '#1976D2',
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

