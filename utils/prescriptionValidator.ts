/**
 * Validation utilities for prescription data
 */

import { DocumentType } from '../types/prescription';

/**
 * Validates document number based on document type
 */
export function validateDocumentNumber(
    nroDoc: string,
    tipoDoc: DocumentType
): { valid: boolean; error?: string } {
    const cleanDoc = nroDoc.trim();

    switch (tipoDoc) {
        case 'DNI':
            if (cleanDoc.length < 4 || cleanDoc.length > 9) {
                return { valid: false, error: 'DNI debe tener entre 4 y 9 caracteres' };
            }
            break;
        case 'Pasaporte':
            if (cleanDoc.length < 5 || cleanDoc.length > 12) {
                return { valid: false, error: 'Pasaporte debe tener entre 5 y 12 caracteres' };
            }
            break;
        case 'LE':
        case 'LC':
            if (cleanDoc.length < 1 || cleanDoc.length > 16) {
                return { valid: false, error: `${tipoDoc} debe tener entre 1 y 16 caracteres` };
            }
            break;
        case 'CI':
            if (cleanDoc.length < 6 || cleanDoc.length > 9) {
                return { valid: false, error: 'CI debe tener entre 6 y 9 caracteres' };
            }
            break;
    }

    return { valid: true };
}

/**
 * Validates date format (accepts AAAA-MM-DD or DD/MM/AAAA)
 */
export function validateDateFormat(date: string): { valid: boolean; error?: string } {
    const isoFormat = /^\d{4}-\d{2}-\d{2}$/;
    const slashFormat = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!isoFormat.test(date) && !slashFormat.test(date)) {
        return {
            valid: false,
            error: 'Formato de fecha inválido. Use AAAA-MM-DD o DD/MM/AAAA',
        };
    }

    return { valid: true };
}

/**
 * Validates email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
    if (!email.includes('@')) {
        return { valid: false, error: 'Email debe contener @' };
    }
    return { valid: true };
}

/**
 * Removes non-numeric characters from phone numbers
 */
export function sanitizePhoneNumber(phone: string): string {
    return phone.replace(/[^\d]/g, '');
}

/**
 * Removes non-numeric characters from matricula number
 */
export function sanitizeMatriculaNumber(numero: string): string {
    return numero.replace(/[^\d]/g, '');
}

/**
 * Validates CUIL format
 */
export function validateCUIL(cuil: string): { valid: boolean; error?: string } {
    const cleanCuil = cuil.replace(/[^\d]/g, '');

    if (cleanCuil.length < 11 || cleanCuil.length > 13) {
        return { valid: false, error: 'CUIL debe tener entre 11 y 13 dígitos' };
    }

    return { valid: true };
}

/**
 * Validates required fields for patient
 */
export function validatePatientRequired(patient: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!patient.apellido || patient.apellido.length < 1 || patient.apellido.length > 50) {
        errors.push('Apellido del paciente es requerido (1-50 caracteres)');
    }

    if (!patient.nombre || patient.nombre.length < 1 || patient.nombre.length > 50) {
        errors.push('Nombre del paciente es requerido (1-50 caracteres)');
    }

    if (!patient.tipoDoc) {
        errors.push('Tipo de documento del paciente es requerido');
    }

    if (!patient.nroDoc) {
        errors.push('Número de documento del paciente es requerido');
    } else if (patient.tipoDoc) {
        const docValidation = validateDocumentNumber(patient.nroDoc, patient.tipoDoc);
        if (!docValidation.valid) {
            errors.push(docValidation.error!);
        }
    }

    if (!patient.fechaNacimiento) {
        errors.push('Fecha de nacimiento del paciente es requerida');
    } else {
        const dateValidation = validateDateFormat(patient.fechaNacimiento);
        if (!dateValidation.valid) {
            errors.push(dateValidation.error!);
        }
    }

    if (!patient.sexo) {
        errors.push('Sexo del paciente es requerido');
    }

    if (patient.email) {
        const emailValidation = validateEmail(patient.email);
        if (!emailValidation.valid) {
            errors.push(`Email del paciente: ${emailValidation.error}`);
        }
    }

    return { valid: errors.length === 0, errors };
}

/**
 * Validates required fields for doctor
 */
export function validateDoctorRequired(doctor: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!doctor.apellido || doctor.apellido.length < 1 || doctor.apellido.length > 50) {
        errors.push('Apellido del médico es requerido (1-50 caracteres)');
    }

    if (!doctor.nombre || doctor.nombre.length < 1 || doctor.nombre.length > 50) {
        errors.push('Nombre del médico es requerido (1-50 caracteres)');
    }

    if (!doctor.tipoDoc) {
        errors.push('Tipo de documento del médico es requerido');
    }

    if (!doctor.nroDoc) {
        errors.push('Número de documento del médico es requerido');
    } else if (doctor.tipoDoc) {
        const docValidation = validateDocumentNumber(doctor.nroDoc, doctor.tipoDoc);
        if (!docValidation.valid) {
            errors.push(docValidation.error!);
        }
    }

    if (!doctor.sexo) {
        errors.push('Sexo del médico es requerido');
    }

    if (!doctor.matricula) {
        errors.push('Matrícula del médico es requerida');
    } else {
        if (!doctor.matricula.tipo) {
            errors.push('Tipo de matrícula es requerido');
        }
        if (!doctor.matricula.numero) {
            errors.push('Número de matrícula es requerido');
        }
        if (doctor.matricula.tipo === 'MP' && !doctor.matricula.provincia) {
            errors.push('Provincia es requerida para matrícula provincial (MP)');
        }
    }

    if (doctor.email) {
        const emailValidation = validateEmail(doctor.email);
        if (!emailValidation.valid) {
            errors.push(`Email del médico: ${emailValidation.error}`);
        }
    }

    return { valid: errors.length === 0, errors };
}

/**
 * Validates medications array
 */
export function validateMedications(medications: any[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!medications || medications.length === 0) {
        errors.push('Debe incluir al menos un medicamento');
        return { valid: false, errors };
    }

    medications.forEach((med, index) => {
        if (!med.cantidad || med.cantidad < 1) {
            errors.push(`Medicamento ${index + 1}: cantidad es requerida y debe ser mayor a 0`);
        }

        // If regNo is empty, other fields are required
        if (!med.regNo) {
            if (!med.nombreProducto) {
                errors.push(`Medicamento ${index + 1}: nombreProducto es requerido si no se envía regNo`);
            }
            if (!med.nombreDroga) {
                errors.push(`Medicamento ${index + 1}: nombreDroga es requerido si no se envía regNo`);
            }
            if (!med.presentacion) {
                errors.push(`Medicamento ${index + 1}: presentacion es requerida si no se envía regNo`);
            }
        }
    });

    return { valid: errors.length === 0, errors };
}
