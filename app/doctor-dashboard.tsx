import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, FileText, CheckCircle } from 'lucide-react-native';

export default function DoctorDashboard() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ChevronLeft size={24} color="#212121" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>Dr</Text>
                    </View>
                    <View>
                        <Text style={styles.doctorName}>Dr. pepe</Text>
                        <Text style={styles.doctorSubtitle}>Panel de Control Médico</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.menuButton}>
                    <View style={styles.menuDot} />
                    <View style={styles.menuDot} />
                    <View style={styles.menuDot} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <FileText size={24} color="#FF9800" strokeWidth={2} />
                        </View>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Solicitudes</Text>
                        <Text style={styles.statLabel}>Pendientes</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIconContainer, styles.statIconGreen]}>
                            <CheckCircle size={24} color="#4CAF50" strokeWidth={2} />
                        </View>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Total Revisadas</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.requestsCard}
                    onPress={() => router.push('/prescription-requests')}
                >
                    <View style={styles.requestsHeader}>
                        <FileText size={24} color="#FFFFFF" strokeWidth={2} />
                        <Text style={styles.requestsTitle}>Solicitudes de Recetas</Text>
                    </View>
                    <Text style={styles.requestsDescription}>
                        Revisa y aprueba las solicitudes de recetas generadas por IA
                    </Text>
                    <View style={styles.requestsButton}>
                        <Text style={styles.requestsButtonText}>Ver Solicitudes (0)</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.emptyStateContainer}>
                    <View style={styles.emptyIconContainer}>
                        <FileText size={64} color="#BDBDBD" strokeWidth={1.5} />
                    </View>
                    <Text style={styles.emptyStateTitle}>No hay solicitudes aún</Text>
                    <Text style={styles.emptyStateDescription}>
                        Las solicitudes de recetas aparecerán aquí cuando los pacientes las generen.
                    </Text>
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
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginLeft: 12,
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
    doctorName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212121',
    },
    doctorSubtitle: {
        fontSize: 12,
        color: '#757575',
    },
    menuButton: {
        flexDirection: 'column',
        gap: 4,
        padding: 8,
    },
    menuDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#212121',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statIconGreen: {
        backgroundColor: '#E8F5E9',
    },
    statValue: {
        fontSize: 32,
        fontWeight: '700',
        color: '#212121',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#757575',
        textAlign: 'center',
    },
    requestsCard: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    requestsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    requestsTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    requestsDescription: {
        fontSize: 14,
        color: '#FFFFFF',
        lineHeight: 20,
        marginBottom: 20,
        opacity: 0.95,
    },
    requestsButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    requestsButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2196F3',
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
});
