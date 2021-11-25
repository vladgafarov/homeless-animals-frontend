import { Option } from '../components/Groups/MultiInput'

export const prepareMultiInput = (values: Option[]): string[] => {
   const res: string[] = []

   values.forEach(({ value }) => {
      res.push(value)
   })

   return res
}
