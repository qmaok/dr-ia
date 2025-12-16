/**
 * Prescription API Service
 * Handles communication with the Innovamed prescription generation API
 */

import {
    PrescriptionRequest,
    PrescriptionResponse,
    PrescriptionAPIError,
} from '../types/prescription';
import {
    validatePatientRequired,
    validateDoctorRequired,
    validateMedications,
    sanitizePhoneNumber,
    sanitizeMatriculaNumber,
} from '../utils/prescriptionValidator';
import { PRESCRIPTION_API_URL, CLIENT_APP_ID } from '../config/api';

/**
 * Sanitizes the prescription request before sending to API
 */
function sanitizeRequest(request: PrescriptionRequest): PrescriptionRequest {
    const sanitized = { ...request };

    // Sanitize patient phone if present
    if (sanitized.paciente.telefono) {
        sanitized.paciente.telefono = sanitizePhoneNumber(sanitized.paciente.telefono);
    }

    // Sanitize doctor phone if present
    if (sanitized.medico.telefono) {
        sanitized.medico.telefono = sanitizePhoneNumber(sanitized.medico.telefono);
    }

    // Sanitize matricula number
    if (sanitized.medico.matricula.numero) {
        sanitized.medico.matricula.numero = sanitizeMatriculaNumber(
            sanitized.medico.matricula.numero
        );
    }

    // Ensure clienteAppId is set
    sanitized.clienteAppId = CLIENT_APP_ID;

    return sanitized;
}

/**
 * Validates the prescription request
 */
function validateRequest(request: PrescriptionRequest): void {
    const errors: string[] = [];

    // Validate patient
    const patientValidation = validatePatientRequired(request.paciente);
    if (!patientValidation.valid) {
        errors.push(...patientValidation.errors);
    }

    // Validate doctor
    const doctorValidation = validateDoctorRequired(request.medico);
    if (!doctorValidation.valid) {
        errors.push(...doctorValidation.errors);
    }

    // Validate medications
    const medicationsValidation = validateMedications(request.medicamentos);
    if (!medicationsValidation.valid) {
        errors.push(...medicationsValidation.errors);
    }

    if (errors.length > 0) {
        throw new PrescriptionAPIError(
            'Errores de validación en la solicitud de receta',
            400,
            { validationErrors: errors }
        );
    }
}

/**
 * Generates a prescription by calling the API
 */
export async function generatePrescription(
    request: PrescriptionRequest
): Promise<PrescriptionResponse> {
    try {
        // Validate request
        validateRequest(request);

        // Sanitize request
        const sanitizedRequest = sanitizeRequest(request);

        // Make API call (Worker handles the /Receta path internally)
        const response = await fetch(PRESCRIPTION_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedRequest),
        });

        // Parse response
        const data = await response.json();

        // Handle error responses
        if (!response.ok) {
            throw new PrescriptionAPIError(
                data.message || 'Error al generar la receta',
                response.status,
                data
            );
        }

        // Return success response
        return {
            success: true,
            recetaId: data.recetaId || data.id || 'unknown',
            message: data.message,
            data,
        };
    } catch (error) {
        // Handle network errors
        if (error instanceof PrescriptionAPIError) {
            throw error;
        }

        // Handle fetch errors
        if (error instanceof TypeError) {
            throw new PrescriptionAPIError(
                'Error de conexión con el servidor',
                0,
                { originalError: error.message }
            );
        }

        // Handle unknown errors
        throw new PrescriptionAPIError(
            'Error desconocido al generar la receta',
            500,
            { originalError: error }
        );
    }
}

/**
 * Example usage function for testing
 */
export function createSamplePrescriptionRequest(): PrescriptionRequest {
    return {
        paciente: {
            apellido: 'González',
            nombre: 'Ana',
            tipoDoc: 'DNI',
            nroDoc: '30567890',
            fechaNacimiento: '2001-07-02',
            sexo: 'F',
            email: 'ana.gonzalez@example.com',
            telefono: '5491134567890',
        },
        medico: {
            apellido: 'Pérez',
            nombre: 'Juan',
            tipoDoc: 'DNI',
            nroDoc: '25123456',
            sexo: 'M',
            email: 'dr.perez@example.com',
            matricula: {
                tipo: 'MP',
                numero: '123456',
                provincia: 'Buenos Aires',
            },
        },
        medicamentos: [
            {
                cantidad: 2,
                regNo: '12345',
            },
        ],
        clienteAppId: CLIENT_APP_ID,
    };
}
