export interface MockUser {
  id: string
  name: string
  age: number
  town: string
  distanceMiles: number
  bio: string
  avatar: string
  interests: Array<{ interestId: string; level: number }>
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'm1',
    name: 'Margaret',
    age: 68,
    town: 'Riverside',
    distanceMiles: 0.8,
    bio: 'Retired teacher, always got a new book on the go.',
    avatar: '👵',
    interests: [
      { interestId: 'reading', level: 9 },
      { interestId: 'gardening', level: 7 },
      { interestId: 'cards', level: 5 },
    ],
  },
  {
    id: 'm2',
    name: 'Tom',
    age: 71,
    town: 'Oakfield',
    distanceMiles: 12.4,
    bio: 'Ex-postman. Still walk further than my dog wants to.',
    avatar: '👴',
    interests: [
      { interestId: 'walking', level: 10 },
      { interestId: 'birdwatching', level: 8 },
      { interestId: 'history', level: 4 },
    ],
  },
  {
    id: 'm3',
    name: 'Priya',
    age: 64,
    town: 'Riverside',
    distanceMiles: 1.6,
    bio: 'Learning to make my grandmother\'s recipes properly.',
    avatar: '👩',
    interests: [
      { interestId: 'cooking', level: 9 },
      { interestId: 'crafts', level: 6 },
      { interestId: 'music', level: 5 },
    ],
  },
  {
    id: 'm4',
    name: 'Derek',
    age: 75,
    town: 'Millbrook',
    distanceMiles: 3.2,
    bio: 'Chess on Tuesdays, complaints about the weather every day.',
    avatar: '👴',
    interests: [
      { interestId: 'chess', level: 10 },
      { interestId: 'history', level: 8 },
      { interestId: 'reading', level: 6 },
    ],
  },
  {
    id: 'm5',
    name: 'Sheila',
    age: 66,
    town: 'Riverside',
    distanceMiles: 2.1,
    bio: 'Grandkids keep me young. So does line dancing.',
    avatar: '👩',
    interests: [
      { interestId: 'dancing', level: 9 },
      { interestId: 'grandkids', level: 10 },
      { interestId: 'music', level: 7 },
    ],
  },
  {
    id: 'm6',
    name: 'Frank',
    age: 79,
    town: 'Elmswood',
    distanceMiles: 18.7,
    bio: 'Allotment keeps me out of trouble most days.',
    avatar: '👴',
    interests: [
      { interestId: 'gardening', level: 10 },
      { interestId: 'birdwatching', level: 6 },
      { interestId: 'walking', level: 5 },
    ],
  },
  {
    id: 'm7',
    name: 'Carol',
    age: 62,
    town: 'Millbrook',
    distanceMiles: 3.9,
    bio: 'Trying to finally understand this smartphone.',
    avatar: '👩',
    interests: [
      { interestId: 'tech', level: 8 },
      { interestId: 'crafts', level: 7 },
      { interestId: 'volunteering', level: 6 },
    ],
  },
  {
    id: 'm8',
    name: 'Ray',
    age: 70,
    town: 'Riverside',
    distanceMiles: 0.4,
    bio: 'Local history buff, will talk your ear off about the old mill.',
    avatar: '👴',
    interests: [
      { interestId: 'history', level: 10 },
      { interestId: 'reading', level: 7 },
      { interestId: 'walking', level: 6 },
    ],
  },
  {
    id: 'm9',
    name: 'Angela',
    age: 65,
    town: 'Elmswood',
    distanceMiles: 16.2,
    bio: 'Swim club three mornings a week, rain or shine.',
    avatar: '👩',
    interests: [
      { interestId: 'swimming', level: 9 },
      { interestId: 'travel', level: 7 },
      { interestId: 'cooking', level: 5 },
    ],
  },
  {
    id: 'm10',
    name: 'George',
    age: 73,
    town: 'Oakfield',
    distanceMiles: 11.8,
    bio: 'Volunteer driver, always up for a day trip.',
    avatar: '👴',
    interests: [
      { interestId: 'volunteering', level: 9 },
      { interestId: 'travel', level: 8 },
      { interestId: 'cards', level: 6 },
    ],
  },
]
