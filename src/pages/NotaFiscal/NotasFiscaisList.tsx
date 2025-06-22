import { useEffect, useState } from 'react'
import { notaFiscalService } from '../../services/notaFiscalService'
import type { NotaFiscal } from '../../types'

export default function NotasFiscaisList() {
  const [notas, setNotas] = useState<NotaFiscal[]>([])

  useEffect(() => {
    notaFiscalService.getAll().then(setNotas)
  }, [])

  return (
    <div>
      <h2>Lista de Notas Fiscais</h2>
      <ul>
        {notas.map((nota) => (
          <li key={nota.id}>
            ID: {nota.id} | Data: {nota.dataEmissao} | Valor Total: R$ {nota.valorTotal} | OS: {nota.ordemDeServico}
          </li>
        ))}
      </ul>
    </div>
  )
}
