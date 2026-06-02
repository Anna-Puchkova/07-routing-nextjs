"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

import type { NoteTag } from "@/types/note";
import css from "./NotesPage.module.css";
import Modal from "@/components/Modal/Modal";

export default function NotesClient({ tag }: { tag?: NoteTag }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPage(1);
    setSearch("");
  }, [tag]);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag,
      }),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.left}>
          <SearchBox onSearch={handleSearch} />
        </div>

        <div className={css.center}>
          <div className={css.center}>
            {(data?.totalPages ?? 0) > 1 && (
              <Pagination
                pageCount={data?.totalPages ?? 0}
                currentPage={page}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>

        <div className={css.right}>
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            + Add note
          </button>
        </div>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      {data && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
