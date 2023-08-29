import NotificationContext from '@/context/NotificationContext'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

interface AuthFetchProps {
  endpoint: string
  redirectRoute?: string
  formData: any
  options?: AxiosRequestConfig<any>
}

export function useAuthFetch () {
  const { showNotification } = useContext(NotificationContext)
  const router = useRouter()

  const authRouter = async ({
    endpoint,
    formData,
    redirectRoute,
    options
  }: AuthFetchProps) => {
    try {
      const { data } = await axios.post(
        `/api/auth/${endpoint}`,
        formData,
        options
      )

      showNotification({
        msj: data.message,
        open: true,
        status: 'success'
      })

      if (redirectRoute) router.push(redirectRoute)
    } catch (error: any) {
      showNotification({
        msj: error.response.data.message as string,
        open: true,
        status: 'error'
      })
    }
  }

  return authRouter
}
