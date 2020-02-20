import { Resultados } from './resultados.model';


export interface ResultadosObjeto {
    data: {
        query_padres_termino_preferido: Resultados[];
        query_termino_preferido: Resultados[];
        query_hijos_termino_preferido: Resultados[];
    }
    message: string;
}