import { startOfMonth, endOfMonth } from 'date-fns';


async function validarLeitura(measure_type: string, leituras: any[]): Promise<boolean> {

    const inicioMes = startOfMonth(new Date());
    const fimMes = endOfMonth(new Date());

    for (const leitura of leituras) {
        if (
          leitura.tipoLeitura === measure_type &&
          leitura.dataLeitura >= inicioMes &&
          leitura.dataLeitura <= fimMes
        ) {
          return true;
        }
      }
    
      return false;
    }


export default validarLeitura;