import { useState, FormEvent } from 'react'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api'
import { Container, RadioBox, TransactionTypeContainer } from './styles'

type TransactionType = 'deposit' | 'withdraw'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [transactionType, setTransactionType] = useState<TransactionType>('deposit')

  function handleCreateNewTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = { title, value, category, transactionType }
    api.post('/transactions', data)
  }

  return (
  <Modal 
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
  >

    <button 
      type="button" 
      onClick={onRequestClose}
      className="react-modal-close"
     >
      <img src={closeImg} alt="Fechar modal"/>
    </button>
    <Container onSubmit={handleCreateNewTransaction}>
      <h2>Cadastrar transação</h2>

      <input 
        type="text" 
        placeholder="Título"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <input 
        type="number" 
        placeholder="Valor" 
        value={value}  
        onChange={event => setValue(Number(event.target.value))}
      />
      <TransactionTypeContainer>
        <RadioBox 
          type="button" 
          onClick={() => setTransactionType('deposit')} 
          isSelected={transactionType === 'deposit'}
          selectedColor="green"
        >
          <img src={incomeImg} alt="Entrada"/>
          <span>Entrada</span>
        </RadioBox>
        <RadioBox 
          type="button" 
          onClick={() => setTransactionType('withdraw')} 
          isSelected={transactionType === 'withdraw'}
          selectedColor="red"
        >
          <img src={outcomeImg} alt="Saída"/>
          <span>Saída</span>
        </RadioBox>
      </TransactionTypeContainer>
      <input 
        type="text" 
        placeholder="Categoria"
        value={category}
        onChange={event => setCategory(event.target.value)}
       />
      <button type="submit">Cadastrar</button>
    </Container>  
  </Modal>
  )
}