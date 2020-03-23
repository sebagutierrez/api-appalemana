export interface CohorteProperties {
    id_cohorte: number,
    nombre_cohorte: string
}

export interface Concepto {
    concept_id_HIBA: bigint,
    termino_preferido: string,
    id_cohorte: number,
}

export interface Cohorte {
    data: {
        cohorte: CohorteProperties,
        conceptos: Concepto[]
    },
    message: string
}