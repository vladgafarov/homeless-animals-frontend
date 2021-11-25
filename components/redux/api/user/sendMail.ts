import { backendApi } from '../backend'

const sendMail = backendApi.injectEndpoints({
   endpoints: build => ({
      sendMail: build.mutation<void, { invitedUserId: string }>({
         query: ({ invitedUserId }) => ({
            url: `invited/mail?invitedUserId=${invitedUserId}`,
            credentials: 'include',
            responseHandler: res => res.text(),
            validateStatus: (response, result) =>
               response.status === 200 && !result.isError,
         }),
      }),
   }),
   overrideExisting: false,
})

export const { useSendMailMutation } = sendMail
