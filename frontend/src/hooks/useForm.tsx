import { useEffect, useState } from 'react'

export type FormProps = {
  inputs: { [key: string]: any }
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  clearForm: () => void
  resetForm: () => void
}

export const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial)
  const initialValues = Object.values(initial).join('')

  useEffect(() => {
    setInputs(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name, type }: { value: any; name: string; type: string } =
      event.target

    if (type === 'number') {
      value = parseInt(value)
    }

    if (type === 'file') {
      ;[value] = Array.from(event.target.files!)
    }

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const resetForm = () => {
    setInputs(initial)
  }

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, '']),
    )

    setInputs(blankState)
  }

  return { inputs, handleChange, resetForm, clearForm }
}
