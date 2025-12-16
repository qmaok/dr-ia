import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
    ChevronLeft,
    User,
    Mail,
    Lock,
    IdCard,
    Stethoscope,
    Info,
} from 'lucide-react-native';
import { useState } from 'react';

export default function DoctorProfile() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [specialty, setSpecialty] = useState('');

    const handleSubmit = () => {
        // TODO: Implement profile submission logic
        console.log('Profile submitted');
        router.replace('/doctor-dashboard');
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
                <Text style={styles.headerTitle}>Información del Médico</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.title}>Completa tu perfil profesional</Text>
                <Text style={styles.subtitle}>
                    Esta información será visible para los pacientes y verificará tu identidad profesional.
                </Text>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <User size={20} color="#2196F3" strokeWidth={2} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre completo"
                            placeholderTextColor="#9E9E9E"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <Mail size={20} color="#2196F3" strokeWidth={2} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico profesional"
                            placeholderTextColor="#9E9E9E"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <Lock size={20} color="#2196F3" strokeWidth={2} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#9E9E9E"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <Lock size={20} color="#2196F3" strokeWidth={2} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#9E9E9E"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <IdCard size={20} color="#2196F3" strokeWidth={2} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de matrícula"
                            placeholderTextColor="#9E9E9E"
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <Stethoscope size={20} color="#2196F3" strokeWidth={2} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Especialidad médica"
                            placeholderTextColor="#9E9E9E"
                            value={specialty}
                            onChangeText={setSpecialty}
                        />
                    </View>

                    <View style={styles.infoBox}>
                        <View style={styles.infoIconContainer}>
                            <Info size={20} color="#2196F3" strokeWidth={2} />
                        </View>
                        <Text style={styles.infoText}>
                            Como médico podrás revisar solicitudes de recetas generadas por IA y aprobar o rechazar prescripciones según tu criterio profesional.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#212121',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#757575',
        lineHeight: 20,
        marginBottom: 32,
    },
    formContainer: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    inputIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#212121',
        paddingVertical: 16,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        padding: 16,
        gap: 12,
        marginTop: 8,
    },
    infoIconContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: '#1976D2',
        lineHeight: 18,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
