import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsPageClient from "@/app/notes/[id]/NoteDetails.client";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsPageClient />
      </HydrationBoundary>
    </Modal>
  );
}
