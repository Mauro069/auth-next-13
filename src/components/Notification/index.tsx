import { StatusNotification } from '@/interfaces'
import styles from './styles.module.scss'

interface Props {
  status: StatusNotification
  msj: string | null
}

export const Notification = ({ status, msj }: Props) => {
  return (
    <div className={`${styles.notification} ${styles[status!]}`}>
      <p>{msj}</p>
    </div>
  )
}
