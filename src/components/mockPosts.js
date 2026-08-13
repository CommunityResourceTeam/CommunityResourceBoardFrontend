export const MOCK_POSTS = [
  {
    _id: "post_456",
    authorId: "user_123",
    author: {
      id: "user_123",
      name: "Jane Doe"
    },
    title: "Food Bank",
    description: "Provides free groceries and meals to individuals and families experiencing food insecurity.",
    likesCount: 42,
    createdAt: "2026-08-11T17:00:00Z",
    location: {
      address: "123 Example St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      coordinates: { latitude: 47.6062, longitude: -122.3321 }
    },
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [],
      thursday: [{ open: "10:00", close: "18:00" }],
      friday: [{ open: "09:00", close: "15:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://example.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" }
    ],
    comments: [
      {
        id: "comment_789",
        author: {
          id: "user_987",
          name: "Sam Smith"
        },
        body: "They also have a Saturday distribution on the first weekend of the month!",
        createdAt: "2026-08-11T19:00:00Z"
      },
      {
        id: "comment_790",
        author: {
          id: "user_555",
          name: "Alex Jones"
        },
        body: "Be sure to bring a valid ID and proof of address.",
        createdAt: "2026-08-11T20:00:00Z"
      }
    ]
  },
  {
    _id: "post_457",
    authorId: "user_456",
    author: {
      id: "user_456",
      name: "Marcus Aurelius"
    },
    title: "Community Health Clinic",
    description: "Low-cost medical services, health screenings, and wellness checks.",
    likesCount: 18,
    createdAt: "2026-08-12T10:30:00Z",
    location: {
      address: "456 Healthcare Ave",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.6011, longitude: -122.3299 }
    },
    hours: {
      monday: [{ open: "08:00", close: "16:00" }],
      tuesday: [{ open: "08:00", close: "16:00" }],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    website: "https://healthclinic.org",
    tags: [
      { tagId: "2", name: "Healthcare" },
      { tagId: "1", name: "Free" }
    ],
    comments: [
      {
        id: "comment_801",
        author: {
          id: "user_321",
          name: "Dr. Taylor"
        },
        body: "Walk-ins are welcome before 2:00 PM on Mondays and Tuesdays.",
        createdAt: "2026-08-12T14:00:00Z"
      }
    ]
  }
];