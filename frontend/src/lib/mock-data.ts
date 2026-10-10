import {
  PublishedEventSummary,
  PublishedEventDetails,
  SpringBootPagination,
  TicketSummary,
  TicketDetails,
  TicketStatus,
  EventSummary,
  EventStatusEnum,
} from "@/domain/domain";

export const MOCK_PUBLISHED_EVENTS: PublishedEventDetails[] = [
  {
    id: "f3405424-f381-468d-a30f-f81d4749c4d9",
    name: "Big Concert 2025",
    start: new Date("2025-05-06T14:30:45.000Z"),
    end: new Date("2025-05-06T16:30:45.000Z"),
    venue: "Big Concert Hall",
    ticketTypes: [
      {
        id: "f3405424-f391-468d-a40f-f81d4749c4d9",
        name: "Standard Ticket",
        price: 19.99,
        description: "General Admission with great views.",
      },
      {
        id: "f3405424-f391-468d-a40f-f81d4749c4d8",
        name: "VIP Ticket",
        price: 99.99,
        description: "VIP lounge access + welcome drinks.",
      },
      {
        id: "f3405424-f391-468d-a40f-f81d4749c4d7",
        name: "Platinum Ticket",
        price: 199.99,
        description: "Front-row seats + backstage pass.",
      },
    ],
  },
  {
    id: "2a06",
    name: "Tech Innovators Summit 2025",
    start: new Date("2025-05-08T09:00:00.000Z"),
    end: new Date("2025-05-08T21:00:00.000Z"),
    venue: "Metropolitan Convention Center",
    ticketTypes: [
      {
        id: "2a06-t1",
        name: "Conference Pass",
        price: 99.99,
        description: "Access to all keynotes and developer tracks.",
      },
      {
        id: "2a06-t2",
        name: "Workshop + Conference Pass",
        price: 149.99,
        description: "Hands-on workshops with industry leads.",
      },
    ],
  },
  {
    id: "008f",
    name: "Summer Music Festival",
    start: new Date("2025-06-15T12:00:00.000Z"),
    end: new Date("2025-06-15T23:00:00.000Z"),
    venue: "Sunset Beach Amphitheater",
    ticketTypes: [
      {
        id: "008f-t1",
        name: "Early Bird General Entry",
        price: 35.0,
        description: "All day festival admission.",
      },
      {
        id: "008f-t2",
        name: "VIP Festival Pass",
        price: 120.0,
        description: "Access to VIP stage zone and bar.",
      },
    ],
  },
  {
    id: "73ef",
    name: "Global AI & Cloud Expo",
    start: new Date("2025-07-20T10:00:00.000Z"),
    end: new Date("2025-07-21T18:00:00.000Z"),
    venue: "Grand Exhibition Arena",
    ticketTypes: [
      {
        id: "73ef-t1",
        name: "Visitor Pass",
        price: 0,
        description: "Free exhibition hall entry.",
      },
      {
        id: "73ef-t2",
        name: "Executive Pass",
        price: 250.0,
        description: "Networking lounges + VIP dinners.",
      },
    ],
  },
];

export function getMockPublishedEvents(
  page = 0,
  size = 4,
  query?: string,
): SpringBootPagination<PublishedEventSummary> {
  let items = [...MOCK_PUBLISHED_EVENTS];
  if (query && query.trim() !== "") {
    const q = query.toLowerCase();
    items = items.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        (e.venue && e.venue.toLowerCase().includes(q)),
    );
  }

  const totalElements = items.length;
  const totalPages = Math.ceil(totalElements / size) || 1;
  const start = page * size;
  const content: PublishedEventSummary[] = items
    .slice(start, start + size)
    .map((e) => ({
      id: e.id,
      name: e.name,
      start: e.start,
      end: e.end,
      venue: e.venue,
    }));

  return {
    content,
    pageable: {
      sort: { empty: true, sorted: false, unsorted: true },
      offset: start,
      pageNumber: page,
      pageSize: size,
      paged: true,
      unpaged: false,
    },
    last: page >= totalPages - 1,
    totalElements,
    totalPages,
    size,
    number: page,
    sort: { empty: true, sorted: false, unsorted: true },
    first: page === 0,
    numberOfElements: content.length,
    empty: content.length === 0,
  };
}

export function getMockPublishedEventDetails(
  id: string,
): PublishedEventDetails {
  const found = MOCK_PUBLISHED_EVENTS.find((e) => e.id === id);
  if (found) return found;

  return {
    id,
    name: "Featured Event",
    venue: "Main Hall",
    start: new Date("2025-05-10T18:00:00.000Z"),
    end: new Date("2025-05-10T22:00:00.000Z"),
    ticketTypes: [
      {
        id: "default-t1",
        name: "General Admission",
        price: 25.0,
        description: "Standard Entry",
      },
    ],
  };
}

export function getMockTickets(
  page = 0,
  size = 8,
): SpringBootPagination<TicketSummary> {
  const items: TicketSummary[] = [
    {
      id: "a271bce4-55f2-44e9-a8d6-bf25b1306bfc",
      status: TicketStatus.PURCHASED,
      ticketType: {
        id: "f3405424-f391-468d-a40f-f81d4749c4d8",
        name: "VIP Ticket",
        price: 99.99,
      },
    },
  ];

  return {
    content: items,
    pageable: {
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      pageNumber: page,
      pageSize: size,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: items.length,
    totalPages: 1,
    size,
    number: page,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    numberOfElements: items.length,
    empty: items.length === 0,
  };
}

export function getMockTicketDetails(id: string): TicketDetails {
  return {
    id,
    status: TicketStatus.PURCHASED,
    price: 99.99,
    description: "VIP Ticket Access",
    eventName: "Big Concert 2025",
    eventVenue: "Big Concert Hall",
    eventStart: new Date("2025-05-06T14:30:45.000Z"),
    eventEnd: new Date("2025-05-06T16:30:45.000Z"),
  };
}

export function getMockEvents(
  page = 0,
  size = 2,
): SpringBootPagination<EventSummary> {
  const items: EventSummary[] = MOCK_PUBLISHED_EVENTS.map((e) => ({
    id: e.id,
    name: e.name,
    venue: e.venue,
    start: e.start,
    end: e.end,
    status: EventStatusEnum.PUBLISHED,
    ticketTypes: e.ticketTypes.map((t) => ({
      id: t.id,
      name: t.name,
      price: t.price,
      description: t.description,
      totalAvailable: 100,
    })),
  }));

  const totalElements = items.length;
  const totalPages = Math.ceil(totalElements / size) || 1;
  const start = page * size;
  const content = items.slice(start, start + size);

  return {
    content,
    pageable: {
      sort: { empty: true, sorted: false, unsorted: true },
      offset: start,
      pageNumber: page,
      pageSize: size,
      paged: true,
      unpaged: false,
    },
    last: page >= totalPages - 1,
    totalElements,
    totalPages,
    size,
    number: page,
    sort: { empty: true, sorted: false, unsorted: true },
    first: page === 0,
    numberOfElements: content.length,
    empty: content.length === 0,
  };
}
