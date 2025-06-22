import { useEffect, useState } from 'react'
import { notaFiscalService } from '../../services/notaFiscalService'
import type { NotaFiscal } from '../../types'

interface Props {
  id: number
}

export default function NotaFiscalDetail({ id }: Props) {
  const [nota, setNota] = useState<NotaFiscal | null>(null)

  useEffect(() => {
    notaFiscalService.getById(id).then(setNota)
  }, [id])

  if (!nota) return <p>Carregando...</p>

  return (
    <div>
      <h2>Detalhes da Nota Fiscal</h2>
      <p>ID: {nota.id}</p>
      <p>Data de Emissão: {nota.dataEmissao}</p>
      <p>Ordem de Serviço: {nota.ordemDeServico}</p>
      <p>Valor Total: R$ {nota.valorTotal}</p>
    </div>
  )
}
