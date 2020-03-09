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
        query_cohortes: Cohorte[],
        query_conceptos: Concepto[]
    },
    message: string
}