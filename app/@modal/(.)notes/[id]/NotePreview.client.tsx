"use client";

import { useParams, useRouter } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";

export default function NotePreview() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params?.id;

  if (!id) return null;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  return (
    <Modal>
      <div className={css.container}>
        <button onClick={() => router.back()}>Close</button>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}

        {note && (
          <>
            <h2>{note.title}</h2>
            <p>{note.tag}</p>
            <p>{note.content}</p>
            <p>{new Date(note.createdAt).toLocaleDateString()}</p>
          </>
        )}
      </div>
    </Modal>
  );
}
