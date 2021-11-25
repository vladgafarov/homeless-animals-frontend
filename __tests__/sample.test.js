import {
   render,
   fireEvent,
   screen,
   waitFor,
   waitForElementToBeRemoved,
} from '../lib/testUtils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Groups from '../components/Groups/Groups'
import { renderHook, act } from '@testing-library/react-hooks'
import { useGetGroupsQuery } from '../components/redux/api/group/getGroups'

const groups = [
   {
      id: 1,
      name: 'ТестТестТест',
      ownerId: -204253585,
      groupId: 204253585,
      regions: ['1'],
      animalTypes: ['1'],
      link: 'https://vk.com/club204253585',
   },
]

jest.mock('@reduxjs/toolkit/query/react', () => {
   const originalModule = jest.requireActual('@reduxjs/toolkit/query/react')
   return {
      ...originalModule,
      fetchBaseQuery: ({ baseUrl = 'https://localhost:5001' }) => jest.fn(),
   }
})

jest.mock('../components/redux/api/group/getGroups', () => ({
   useGetGroupsQuery: jest.fn(() => ({
      data: groups,
      isLoading: false,
   })),
}))

export const handlers = [
   rest.get('https://localhost:5001/groups/list', (req, res, ctx) => {
      return res(
         ctx.json([
            {
               id: 1,
               name: 'ТестТестТест',
               ownerId: -204253585,
               groupId: 204253585,
               regions: ['1'],
               animalTypes: ['1'],
               link: 'https://vk.com/club204253585',
            },
         ]),
         ctx.delay(150)
      )
   }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('<Groups />', () => {
   it('should render properly with data', async () => {
      const { debug } = render(<Groups />)
      debug()
      // expect(useGetGroupsQuery).toHaveBeenCalled()
      // expect(useGetGroupsQuery).toHaveReturnedWith({
      //    data: groups,
      //    isLoading: false,
      // })
      // useGetGroupsQuery.mockClear()
   })

   // it('should be with loading', async () => {
   //    useGetGroupsQuery().isLoading = true
   //    const { debug } = render(<Groups />)
   //    // debug()
   // })
})
