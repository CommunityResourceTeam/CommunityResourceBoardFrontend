export const MOCK_POSTS = [
  {
    _id: "post_456",
    authorId: "user_123",
    author: {
      id: "user_123",
      name: "Jane Doe"
    },
    title: "West Seattle Food Bank",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    description: "Provides free groceries to residents of West Seattle. Also offers rent and utilities assistance, clothing, and bus tickets.",
    likesCount: 42,
    createdAt: "2026-08-11T17:00:00Z",
    location: {
      address: "4425 41st Ave SW",
      city: "Seattle",
      state: "WA",
      zip: "98116",
      coordinates: { latitude: 47.5636, longitude: -122.3877 }
    },
    hours: {
      monday: [],
      tuesday: [{ open: "10:00", close: "14:00" }],
      wednesday: [{ open: "12:00", close: "19:00" }],
      thursday: [{ open: "10:00", close: "14:00" }],
      friday: [{ open: "10:00", close: "14:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://westseattlefoodbank.org",
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
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    likesCount: 18,
    createdAt: "2026-08-12T10:30:00Z",
    title: "Neighborcare Health at Columbia City",
    description: "Low-cost primary medical and dental care for individuals and families regardless of income or insurance status.",
    location: {
      address: "4400 37th Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5590, longitude: -122.2864 }
    },
    hours: {
      monday: [{ open: "08:00", close: "17:00" }],
      tuesday: [{ open: "08:00", close: "17:00" }],
      wednesday: [{ open: "09:30", close: "17:00" }],
      thursday: [{ open: "08:00", close: "17:00" }],
      friday: [{ open: "08:00", close: "17:00" }],
      saturday: [{ open: "09:30", close: "13:30" }],
      sunday: []
    },
    website: "https://neighborcare.org",
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
      },
      {
        id: "comment_802",
        author: {
          id: "user_654",
          name: "Elena Rostova"
        },
        body: "Staff is very kind and sliding scale options helped immensely.",
        createdAt: "2026-08-12T16:20:00Z"
      }
    ]
  },
  {
    _id: "post_458",
    authorId: "user_789",
    author: {
      id: "user_789",
      name: "Sarah Jenkins"
    },
    imageUrl: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80",
    likesCount: 29,
    createdAt: "2026-08-10T09:15:00Z",
    title: "Downtown Emergency Service Center (DESC)",
    description: "Emergency shelter, clinical services, and case management for adults experiencing chronic homelessness, mental illness, or chemical dependency.",
    location: {
      address: "515 3rd Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.5985, longitude: -122.3295 }
    },
    hours: {
      monday: [{ open: "08:00", close: "16:45" }],
      tuesday: [{ open: "08:00", close: "16:45" }],
      wednesday: [{ open: "08:00", close: "16:45" }],
      thursday: [{ open: "08:00", close: "16:45" }],
      friday: [{ open: "08:00", close: "16:45" }],
      saturday: [{ open: "08:00", close: "16:45" }],
      sunday: [{ open: "08:00", close: "16:45" }]
    },
    website: "https://www.desc.org",
    tags: [
      { tagId: "3", name: "Shelter" },
      { tagId: "1", name: "Free" },
      { tagId: "4", name: "Walk-In Intake" }
    ],
    comments: [
      {
        id: "comment_803",
        author: {
          id: "user_111",
          name: "Michael Chen"
        },
        body: "Intake queue starts early in the morning, so try arriving around 7:30 AM if possible.",
        createdAt: "2026-08-10T11:00:00Z"
      }
    ]
  },
  {
    _id: "post_459",
    authorId: "user_234",
    author: {
      id: "user_234",
      name: "David Kim"
    },
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    likesCount: 15,
    createdAt: "2026-08-09T14:20:00Z",
    title: "SPL Homework Help — Columbia Branch",
    description: "Free after-school tutoring for K-12 students. Trained volunteers help with any subject; no appointment or library card needed.",
    location: {
      address: "4721 Rainier Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5657, longitude: -122.2871 }
    },
    hours: {
      monday: [],
      tuesday: [{ open: "16:00", close: "19:00" }],
      wednesday: [{ open: "18:00", close: "19:30" }],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    website: "https://www.spl.org/programs-and-services/learning/student-success/homework-help",
    tags: [
      { tagId: "5", name: "Education" },
      { tagId: "1", name: "Free" },
      { tagId: "6", name: "Youth" }
    ],
    comments: [
      {
        id: "comment_804",
        author: {
          id: "user_888",
          name: "Priya Patel"
        },
        body: "Great math tutors here for middle schoolers!",
        createdAt: "2026-08-09T16:45:00Z"
      },
      {
        id: "comment_805",
        author: {
          id: "user_777",
          name: "Carlos M."
        },
        body: "They also provide laptops to use during the session.",
        createdAt: "2026-08-09T18:10:00Z"
      }
    ]
  },
  {
    _id: "post_460",
    authorId: "user_567",
    author: {
      id: "user_567",
      name: "Maria Rodriguez"
    },
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    likesCount: 33,
    createdAt: "2026-08-08T11:45:00Z",
    title: "Northwest Justice Project",
    description: "Free civil legal aid for low-income individuals — housing, government benefits, consumer issues, and family safety cases.",
    location: {
      address: "401 2nd Ave S, Suite 407",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.6014, longitude: -122.3305 }
    },
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [{ open: "09:00", close: "17:00" }],
      thursday: [{ open: "09:00", close: "17:00" }],
      friday: [{ open: "09:00", close: "17:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://nwjustice.org",
    tags: [
      { tagId: "7", name: "Legal Services" },
      { tagId: "1", name: "Free" }
    ],
    comments: [
      {
        id: "comment_806",
        author: {
          id: "user_444",
          name: "Jordan Lee"
        },
        body: "Call their CLEAR hotline first to get an intake evaluation.",
        createdAt: "2026-08-08T13:30:00Z"
      }
    ]
  },
  {
    _id: "post_461",
    authorId: "user_890",
    author: {
      id: "user_890",
      name: "James Wilson"
    },
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    likesCount: 22,
    createdAt: "2026-08-07T16:00:00Z",
    title: "Rainier Valley Food Bank — Mobile Market",
    description: "Weekly pop-up grocery market where guests choose fresh produce and pantry staples. One shopping visit per household.",
    location: {
      address: "9021 Rainier Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5233, longitude: -122.2685 }
    },
    hours: {
      monday: [],
      tuesday: [],
      wednesday: [{ open: "09:00", close: "14:00" }],
      thursday: [],
      friday: [{ open: "09:00", close: "14:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://www.rvfb.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" },
      { tagId: "8", name: "Mobile Service" }
    ],
    comments: [
      {
        id: "comment_807",
        author: {
          id: "user_222",
          name: "Anita Thorne"
        },
        body: "Fresh fruit selection was fantastic this week! Lines move fast.",
        createdAt: "2026-08-07T18:00:00Z"
      }
    ]
  }
];