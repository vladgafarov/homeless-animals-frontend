import { IGroupTimeInfo } from '@/components/redux/interfaces/IGroupTimeInfo'
import { ISelectedGroupsId } from '@/components/redux/postBuilder'

export const groups = [
   {
      id: 1,
      name: 'ТестТестТест',
      ownerId: -204253585,
      groupId: 204253585,
      regions: ['1'],
      animalTypes: ['1'],
      link: 'https://vk.com/club204253585',
   },
   {
      id: 2,
      name: 'Тест3',
      ownerId: -204749211,
      groupId: 204749211,
      regions: ['Пермь'],
      animalTypes: ['Кошки'],
      link: 'https://vk.com/public204749211',
   },
   {
      id: 6,
      name: 'тетс',
      ownerId: -207654520,
      groupId: 207654520,
      regions: ['string'],
      animalTypes: ['string'],
      link: 'https://vk.com/club207654520',
   },
   {
      id: 28,
      name: 'Testing',
      ownerId: -207655864,
      groupId: 207655864,
      regions: ['Testing'],
      animalTypes: ['Testing'],
      link: 'https://vk.com/public207655864',
   },
]

// it('Works')
export const selectedGroupsId1: ISelectedGroupsId = { 1: true, 3: true }
export const groupsTimeInfo1: Partial<IGroupTimeInfo>[] = [
   {
      groupId: 28,
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждый месяц',
   },
   {
      groupId: 2,
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждую неделю',
   },
]

export const outputValue1 = [
   {
      id: 2,
      nameGroup: 'Тест3',
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждую неделю',
   },
   {
      id: 28,
      nameGroup: 'Testing',
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждый месяц',
   },
]

// it('Works with empty value in groupsTimeInfo')
export const selectedGroupsId2: ISelectedGroupsId = { 1: true, 3: true }
export const groupsTimeInfo2: Partial<IGroupTimeInfo>[] = []
export const outputValue2 = [
   {
      id: 2,
      nameGroup: 'Тест3',
      publicationDataTime: new Date().toISOString(),
      publicationInterval: 'Каждый день',
   },
   {
      id: 28,
      nameGroup: 'Testing',
      publicationDataTime: new Date().toISOString(),
      publicationInterval: 'Каждый день',
   },
]

// it('Works with one selected group')
export const selectedGroupsId3: ISelectedGroupsId = { 0: true }
export const groupsTimeInfo3: Partial<IGroupTimeInfo>[] = [
   {
      groupId: 1,
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждый месяц',
   },
]
export const outputValue3 = [
   {
      id: 1,
      nameGroup: 'ТестТестТест',
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждый месяц',
   },
]

// it('Works with empty interval')
export const selectedGroupsId4: ISelectedGroupsId = { 1: true, 2: true }
export const groupsTimeInfo4: Partial<IGroupTimeInfo>[] = [
   {
      groupId: 2,
      publicationDataTime: '2021-11-30T20:04:00+00:00',
   },
   {
      groupId: 6,
      publicationDataTime: '2021-11-30T20:04:00+00:00',
   },
]
export const outputValue4 = [
   {
      id: 2,
      nameGroup: 'Тест3',
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждый день',
   },
   {
      id: 6,
      nameGroup: 'тетс',
      publicationDataTime: '2021-11-30T20:04:00+00:00',
      publicationInterval: 'Каждый день',
   },
]
