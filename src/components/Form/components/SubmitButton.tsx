import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'

interface SubmitButtonProps {
  buttonText: string
  isLoading?: boolean
}

export function SubmitButton ({ buttonText, isLoading }: SubmitButtonProps) {
  return (
    <button className={styles.submitButton} type='submit' disabled={isLoading}>
      {isLoading ? <Loader /> : buttonText}
    </button>
  )
}
