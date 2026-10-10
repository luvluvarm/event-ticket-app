import {
  CreateEventRequest,
  EventDetails,
  EventSummary,
  isErrorResponse,
  PublishedEventDetails,
  PublishedEventSummary,
  SpringBootPagination,
  TicketDetails,
  TicketSummary,
  TicketValidationRequest,
  TicketValidationResponse,
  UpdateEventRequest,
} from "@/domain/domain";
import {
  getMockPublishedEvents,
  getMockPublishedEventDetails,
  getMockTickets,
  getMockTicketDetails,
  getMockEvents,
} from "./mock-data";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const createEvent = async (
  accessToken: string,
  request: CreateEventRequest,
): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const updateEvent = async (
  accessToken: string,
  id: string,
  request: UpdateEventRequest,
): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/events/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listEvents = async (
  accessToken: string,
  page: number,
): Promise<SpringBootPagination<EventSummary>> => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/events?page=${page}&size=2`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as SpringBootPagination<EventSummary>;
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable, using mock events", err);
  }

  return getMockEvents(page, 2);
};

export const getEvent = async (
  accessToken: string,
  id: string,
): Promise<EventDetails> => {
  const response = await fetch(`${API_BASE}/api/v1/events/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as EventDetails;
};

export const deleteEvent = async (
  accessToken: string,
  id: string,
): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const responseBody = await response.json();
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listPublishedEvents = async (
  page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/published-events?page=${page}&size=4`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as SpringBootPagination<PublishedEventSummary>;
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable, using mock published events", err);
  }

  return getMockPublishedEvents(page, 4);
};

export const searchPublishedEvents = async (
  query: string,
  page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
  try {
    const response = await fetch(
      `${API_BASE}/api/v1/published-events?q=${query}&page=${page}&size=4`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as SpringBootPagination<PublishedEventSummary>;
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable, using mock search", err);
  }

  return getMockPublishedEvents(page, 4, query);
};

export const getPublishedEvent = async (
  id: string,
): Promise<PublishedEventDetails> => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/published-events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as PublishedEventDetails;
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable, using mock event details", err);
  }

  return getMockPublishedEventDetails(id);
};

export const purchaseTicket = async (
  accessToken: string,
  eventId: string,
  ticketTypeId: string,
): Promise<void> => {
  const response = await fetch(
    `${API_BASE}/api/v1/events/${eventId}/ticket-types/${ticketTypeId}/tickets`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const responseBody = await response.json();
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }
};

export const listTickets = async (
  accessToken: string,
  page: number,
): Promise<SpringBootPagination<TicketSummary>> => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/tickets?page=${page}&size=8`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as SpringBootPagination<TicketSummary>;
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable, using mock tickets", err);
  }

  return getMockTickets(page, 8);
};

export const getTicket = async (
  accessToken: string,
  id: string,
): Promise<TicketDetails> => {
  try {
    const response = await fetch(`${API_BASE}/api/v1/tickets/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as TicketDetails;
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable, using mock ticket details", err);
  }

  return getMockTicketDetails(id);
};

export const getTicketQr = async (
  accessToken: string,
  id: string,
): Promise<Blob> => {
  const response = await fetch(`${API_BASE}/api/v1/tickets/${id}/qr-codes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return await response.blob();
  } else {
    throw new Error("Unable to get ticket QR code");
  }
};

export const validateTicket = async (
  accessToken: string,
  request: TicketValidationRequest,
): Promise<TicketValidationResponse> => {
  const response = await fetch(`${API_BASE}/api/v1/ticket-validations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    if (isErrorResponse(responseBody)) {
      throw new Error(responseBody.error);
    } else {
      console.error(JSON.stringify(responseBody));
      throw new Error("An unknown error occurred");
    }
  }

  return responseBody as Promise<TicketValidationResponse>;
};
