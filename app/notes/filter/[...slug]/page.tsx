import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

type Params = {
  slug: string[];
};

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

function parseTag(slug?: string): NoteTag | undefined {
  if (!slug || slug === "all") return undefined;
  return TAGS.includes(slug as NoteTag) ? (slug as NoteTag) : undefined;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const tag = parseTag(slug?.[0]);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
