import { useState } from 'react'
import { notaFiscalService } from '../../services/notaFiscalService'
import type { NotaFiscal } from '../../types'

export default function CreateNotaFiscal() {
  const [dataEmissao, setDataEmissao] = useState('')
  const [ordemDeServico, setOrdemDeServico] = useState(0)
  const [valorTotal, setValorTotal] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const novaNota = { dataEmissao, ordemDeServico, valorTotal }
    await notaFiscalService.create(novaNota as Omit<NotaFiscal, 'id'>)
    alert('Nota Fiscal criada com sucesso!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Nota Fiscal</h2>
      <input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} placeholder="Data de Emissão" />
      <input type="number" value={ordemDeServico} onChange={(e) => setOrdemDeServico(Number(e.target.value))} placeholder="ID da OS" />
      <input type="number" value={valorTotal} onChange={(e) => setValorTotal(Number(e.target.value))} placeholder="Valor Total" />
      <button type="submit">Criar</button>
    </form>
  )
}
