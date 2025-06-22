import { useEffect, useState } from 'react'
import { notaFiscalService } from '../../services/notaFiscalService'
import type { NotaFiscal } from '../../types'

interface Props {
  id: number
}

export default function UpdateNotaFiscal({ id }: Props) {
  const [nota, setNota] = useState<NotaFiscal | null>(null)

  useEffect(() => {
    notaFiscalService.getById(id).then(setNota)
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (nota) {
      await notaFiscalService.update(id, nota)
      alert('Nota atualizada!')
    }
  }

  if (!nota) return <p>Carregando...</p>

  return (
    <form onSubmit={handleSubmit}>
      <h2>Atualizar Nota Fiscal</h2>
      <input type="date" value={nota.dataEmissao} onChange={(e) => setNota({ ...nota, dataEmissao: e.target.value })} />
      <input type="number" value={nota.ordemDeServico} onChange={(e) => setNota({ ...nota, ordemDeServico: Number(e.target.value) })} />
      <input type="number" value={nota.valorTotal} onChange={(e) => setNota({ ...nota, valorTotal: Number(e.target.value) })} />
      <button type="submit">Atualizar</button>
    </form>
  )
}
