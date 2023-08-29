'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { AxiosRequestConfig } from 'axios'
import { useSearchParams } from 'next/navigation'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const searchParams = useSearchParams()
  const authFetch = useAuthFetch()

  const changePassword = async (formData: any) => {
    startLoading()

    const token = searchParams.get('token')

    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    }

    await authFetch({
      endpoint: 'change-password',
      redirectRoute: '/',
      formData,
      options
    })

    finishLoading()
  }

  return (
    <>
      <Form
        title='Cambiat tu contraseña'
        description='Formulario para cambiar tu contraseña'
        onSubmit={changePassword}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            placeholder='Ingresa tu nueva contraseña...'
            label='Contraseña'
            name='newPassword'
            type='password'
          />
          <Form.Input
            placeholder='Repite tu contraseña...'
            label='Confirmar contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        <Form.SubmitButton
          buttonText='Cambiar Contraseña'
          isLoading={isLoading}
        />
      </Form>
    </>
  )
}
