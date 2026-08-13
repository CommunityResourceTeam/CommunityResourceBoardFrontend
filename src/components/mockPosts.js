export const MOCK_POSTS = [
  {
    _id: "post_456",
    authorId: "user_123",
    title: "Food Bank",
    description: "Provides free groceries and meals to individuals and families experiencing food insecurity.",
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
    comments: []
  },
  {
    _id: "post_457",
    authorId: "user_456",
    title: "Community Health Clinic",
    description: "Low-cost medical services, health screenings, and wellness checks.",
    location: {
      address: "456 Healthcare Ave",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.6011, longitude: -122.3299 }
    },
    hours: {
      monday: [{ open: "08:00", close: "16:00" }],
      tuesday: [{ open: "08:00", close: "16:00" }]
    },
    website: "https://healthclinic.org",
    tags: [
      { tagId: "2", name: "Healthcare" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_458",
    authorId: "user_789",
    title: "Downtown Emergency Shelter",
    description: "Overnight shelter and case management services for individuals experiencing homelessness.",
    location: {
      address: "789 Pine St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      coordinates: { latitude: 47.6101, longitude: -122.3344 }
    },
    hours: {
      monday: [{ open: "18:00", close: "08:00" }],
      tuesday: [{ open: "18:00", close: "08:00" }],
      wednesday: [{ open: "18:00", close: "08:00" }],
      thursday: [{ open: "18:00", close: "08:00" }],
      friday: [{ open: "18:00", close: "08:00" }],
      saturday: [{ open: "18:00", close: "08:00" }],
      sunday: [{ open: "18:00", close: "08:00" }]
    },
    website: "https://desc.org",
    tags: [
      { tagId: "3", name: "Shelter" },
      { tagId: "1", name: "Free" },
      { tagId: "4", name: "24/7 Intake" }
    ],
    comments: []
  },
  {
    _id: "post_459",
    authorId: "user_234",
    title: "Youth Tutoring Center",
    description: "Free after-school tutoring and homework help for K-12 students in reading, math, and science.",
    location: {
      address: "321 Learning Ln",
      city: "Seattle",
      state: "WA",
      zip: "98108",
      coordinates: { latitude: 47.5480, longitude: -122.2801 }
    },
    hours: {
      monday: [{ open: "15:00", close: "18:00" }],
      tuesday: [{ open: "15:00", close: "18:00" }],
      wednesday: [{ open: "15:00", close: "18:00" }],
      thursday: [{ open: "15:00", close: "18:00" }],
      friday: [],
      saturday: [{ open: "10:00", close: "13:00" }],
      sunday: []
    },
    website: "https://youthtutoring.org",
    tags: [
      { tagId: "5", name: "Education" },
      { tagId: "1", name: "Free" },
      { tagId: "6", name: "Youth" }
    ],
    comments: []
  },
  {
    _id: "post_460",
    authorId: "user_567",
    title: "Legal Aid Society",
    description: "Free legal consultations for housing disputes, immigration questions, and family law matters.",
    location: {
      address: "555 Justice Blvd",
      city: "Seattle",
      state: "WA",
      zip: "98122",
      coordinates: { latitude: 47.6142, longitude: -122.3011 }
    },
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [{ open: "09:00", close: "17:00" }],
      thursday: [{ open: "09:00", close: "17:00" }],
      friday: [{ open: "09:00", close: "12:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://legalaidseattle.org",
    tags: [
      { tagId: "7", name: "Legal Services" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_461",
    authorId: "user_890",
    title: "Mobile Food Pantry",
    description: "Weekly mobile pantry distributing fresh produce and pantry staples at rotating neighborhood locations.",
    location: {
      address: "Varies — check website",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5375, longitude: -122.2871 }
    },
    hours: {
      saturday: [{ open: "10:00", close: "14:00" }]
    },
    website: "https://mobilepantryseattle.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" },
      { tagId: "8", name: "Mobile Service" }
    ],
    comments: []
  }
];