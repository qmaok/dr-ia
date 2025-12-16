/**
 * Prescription templates for different insurance providers
 */

import { PrescriptionRequest } from '../types/prescription';
import { CLIENT_APP_ID } from '../config/api';

/**
 * Base patient data (can be customized per prescription)
 */
const basePatient = {
    apellido: 'González',
    nombre: 'Ana',
    tipoDoc: 'DNI' as const,
    nroDoc: '30567890',
    fechaNacimiento: '2001-07-02',
    sexo: 'F' as const,
    email: 'ana.gonzalez@example.com',
    telefono: '5491134567890',
};

/**
 * Base doctor data (can be customized per prescription)
 */
const baseDoctor = {
    apellido: 'Pérez',
    nombre: 'Juan',
    tipoDoc: 'DNI' as const,
    nroDoc: '25123456',
    sexo: 'M' as const,
    email: 'dr.perez@example.com',
    matricula: {
        tipo: 'MP' as const,
        numero: '123456',
        provincia: 'Buenos Aires',
    },
};

/**
 * Base medication data
 */
const baseMedication = {
    cantidad: 2,
    regNo: '12345',
};

/**
 * Template 1: OSDE
 */
export function createOSDEPrescription(): PrescriptionRequest {
    return {
        paciente: {
            ...basePatient,
            cobertura: {
                idFinanciador: 'OSDE', // You may need to use the actual ID from Innovamed
                numero: '23200126801',
            },
        },
        medico: baseDoctor,
        medicamentos: [baseMedication],
        clienteAppId: CLIENT_APP_ID,
    };
}

/**
 * Template 2: Luis Pasteur
 */
export function createLuisPasteurPrescription(): PrescriptionRequest {
    return {
        paciente: {
            ...basePatient,
            cobertura: {
                idFinanciador: 'Luis Pasteur', // You may need to use the actual ID from Innovamed
                numero: '42731800060',
            },
        },
        medico: baseDoctor,
        medicamentos: [baseMedication],
        clienteAppId: CLIENT_APP_ID,
    };
}

/**
 * Template 3: Accord Salud
 */
export function createAccordSaludPrescription(): PrescriptionRequest {
    return {
        paciente: {
            ...basePatient,
            cobertura: {
                idFinanciador: 'Accord Salud', // You may need to use the actual ID from Innovamed
                numero: '23256785',
            },
        },
        medico: baseDoctor,
        medicamentos: [baseMedication],
        clienteAppId: CLIENT_APP_ID,
    };
}

/**
 * Template 4: Private (No insurance)
 */
export function createPrivatePrescription(): PrescriptionRequest {
    return {
        paciente: basePatient,
        medico: baseDoctor,
        medicamentos: [baseMedication],
        clienteAppId: CLIENT_APP_ID,
    };
}

/**
 * Get all templates
 */
export const prescriptionTemplates = [
    { id: 'osde', name: 'OSDE', afiliado: '23200126801', create: createOSDEPrescription },
    { id: 'luis-pasteur', name: 'Luis Pasteur', afiliado: '42731800060', create: createLuisPasteurPrescription },
    { id: 'accord-salud', name: 'Accord Salud', afiliado: '23256785', create: createAccordSaludPrescription },
    { id: 'private', name: 'Particular (Sin obra social)', afiliado: 'N/A', create: createPrivatePrescription },
];
