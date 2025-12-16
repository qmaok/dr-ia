/**
 * TypeScript type definitions for the Innovamed Prescription API
 * Based on: https://innovamed.atlassian.net/wiki/spaces/DQBI2/pages/2086174790/Generar+Receta
 */

// Enums for validation
export type DocumentType = 'Pasaporte' | 'DNI' | 'LE' | 'LC' | 'CI';
export type Sex = 'F' | 'M' | 'X' | 'O';
export type MatriculaType = 'MP' | 'MN';

// Patient types
export interface PatientDomicilio {
    calle?: string;
    numero?: string;
    direccion?: string;
    piso?: string;
    dpto?: string;
    codigoPostal?: string;
    localidad?: string;
    municipio?: string;
    provincia?: string;
    pais?: string;
    observacion?: string;
}

export interface PatientCobertura {
    idFinanciador?: string;
    plan?: string;
    planId?: number;
    numero?: string;
    dniTitular?: string;
}

export interface Patient {
    apellido: string;
    nombre: string;
    tipoDoc: DocumentType;
    nroDoc: string;
    fechaNacimiento: string; // AAAA-MM-DD or DD/MM/AAAA
    sexo: Sex;
    cuil?: string;
    localidad?: string;
    provincia?: string;
    pais?: string;
    email?: string;
    telefono?: string;
    cobertura?: PatientCobertura;
    domicilio?: PatientDomicilio;
}

// Doctor types
export interface DoctorMatricula {
    tipo: MatriculaType;
    numero: string;
    provincia?: string; // Required if tipo is "MP"
    profesion?: string;
    especialidad?: string;
}

export interface DoctorSello {
    linea1?: string;
    linea2?: string;
    linea3?: string;
    linea4?: string;
}

export interface Doctor {
    apellido: string;
    nombre: string;
    tipoDoc: DocumentType;
    nroDoc: string;
    sexo: Sex;
    matricula: DoctorMatricula;
    fechaNacimiento?: string;
    email?: string;
    telefono?: string;
    pais?: string;
    firmalink?: string;
    firmabase64?: string;
    idTributario?: string;
    idREFEPS?: string;
    sello?: DoctorSello;
}

// Medication types
export interface Medication {
    cantidad: number;
    regNo?: string; // If empty, nombreProducto, nombreDroga, and presentacion are required
    nombreProducto?: string;
    nombreDroga?: string;
    presentacion?: string;
}

// Postdated prescriptions
export interface RecetasPostadatas {
    cantidad: number;
    diasAPosdatar: number;
}

// Place of attention
export interface LugarAtencionDomicilio {
    calle?: string;
    numero?: string;
    direccion?: string;
}

export interface LugarAtencion {
    domicilio?: LugarAtencionDomicilio;
}

// Main prescription request
export interface PrescriptionRequest {
    paciente: Patient;
    medico: Doctor;
    medicamentos: Medication[];
    clienteAppId: number;
    lugarAtencion?: LugarAtencion;
    recetasPostadatas?: RecetasPostadatas;
}

// API Response types
export interface PrescriptionSuccessResponse {
    success: true;
    recetaId: string;
    message?: string;
    data?: any;
}

export interface PrescriptionErrorResponse {
    success: false;
    error: string;
    message: string;
    details?: any;
}

export type PrescriptionResponse = PrescriptionSuccessResponse | PrescriptionErrorResponse;

// Helper type for API errors
export class PrescriptionAPIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public details?: any
    ) {
        super(message);
        this.name = 'PrescriptionAPIError';
    }
}
