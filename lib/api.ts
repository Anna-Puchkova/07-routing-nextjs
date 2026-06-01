import axios from "axios";
import { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN");
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: NoteTag;
  perPage?: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = {
    page,
    perPage,
  };

  if (search?.trim()) {
    params.search = search;
  }

  if (tag) {
    params.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>("", {
    params,
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/${id}`);
  return data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>("", payload);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/${noteId}`);
  return data;
};
