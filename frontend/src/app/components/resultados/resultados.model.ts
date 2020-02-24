import { Termino } from './resultados-termino.model';


export interface Resultado {
    data: {
        query_padres_termino_preferido: Termino[];
        query_termino_preferido: Termino[];
        query_hijos_termino_preferido: Termino[];
    }
    message: string;
}