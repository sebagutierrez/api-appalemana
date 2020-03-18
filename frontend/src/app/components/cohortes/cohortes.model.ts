export interface Cohorte {
    id_cohorte: number,
    nombre_cohorte: string
}

export interface Concepto {
    concept_id_HIBA: bigint,
    termino_preferido: string,
    id_cohorte: number,
}

export interface Cohortes {
    data: {
        cohortes: [{
            cohorte: Cohorte,
            conceptos: Concepto[]
        }]
    },
    message: string
}