import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, FileText, CheckCircle2 } from 'lucide-react-native';
import { useState } from 'react';
import { generatePrescription } from '../services/prescriptionService';
import { PrescriptionAPIError } from '../types/prescription';
import { prescriptionTemplates } from '../services/prescriptionTemplates';

export default function PrescriptionRequests() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('pending');
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
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ChevronLeft size={24} color="#212121" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Solicitudes de Recetas</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'pending' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('pending')}
                >
                    <FileText
                        size={20}
                        color={activeTab === 'pending' ? '#2196F3' : '#757575'}
                        strokeWidth={2}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'pending' && styles.activeTabText,
                        ]}
                    >
                        Pendientes (0)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'reviewed' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('reviewed')}
                >
                    <CheckCircle2
                        size={20}
                        color={activeTab === 'reviewed' ? '#2196F3' : '#757575'}
                        strokeWidth={2}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'reviewed' && styles.activeTabText,
                        ]}
                    >
                        Revisadas (0)
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {activeTab === 'pending' ? (
                    <View>
                        <View style={styles.demoSection}>
                            <Text style={styles.demoTitle}>Simulador de Solicitudes (Demo)</Text>
                            <Text style={styles.demoDescription}>
                                Genera solicitudes de prueba para verificar el flujo
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
                                            Generar Solicitud de Prueba
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>

                            {lastPrescriptionId && (
                                <View style={styles.successCard}>
                                    <Text style={styles.successTitle}>✓ Solicitud generada</Text>
                                    <Text style={styles.successId}>ID: {lastPrescriptionId}</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.emptyStateContainer}>
                            <View style={styles.emptyIconContainer}>
                                <FileText size={64} color="#BDBDBD" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.emptyStateTitle}>
                                No hay otras solicitudes
                            </Text>
                            <Text style={styles.emptyStateDescription}>
                                Las nuevas solicitudes aparecerán aquí cuando los pacientes las generen.
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.emptyStateContainer}>
                        <View style={styles.emptyIconContainer}>
                            <CheckCircle2 size={64} color="#BDBDBD" strokeWidth={1.5} />
                        </View>
                        <Text style={styles.emptyStateTitle}>
                            No hay solicitudes revisadas
                        </Text>
                        <Text style={styles.emptyStateDescription}>
                            Las solicitudes que apruebes o rechaces aparecerán aquí.
                        </Text>
                    </View>
                )}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212121',
    },
    placeholder: {
        width: 32,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#2196F3',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#757575',
    },
    activeTabText: {
        color: '#2196F3',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    emptyStateContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginTop: 40,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212121',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateDescription: {
        fontSize: 14,
        color: '#757575',
        textAlign: 'center',
        lineHeight: 20,
    },
    demoSection: {
        marginBottom: 24,
    },
    demoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212121',
        marginBottom: 8,
    },
    demoDescription: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 20,
        lineHeight: 20,
    },
    templateSelector: {
        marginBottom: 20,
    },
    templateSelectorTitle: {
        fontSize: 14,
        fontWeight: '600',
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
});

