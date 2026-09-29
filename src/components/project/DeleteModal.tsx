'use client';

import { useState } from 'react';

type DeleteModalProps = {
  proyek: { id: number | string; judul: string };
  action: (formData: FormData) => void | Promise<void>;
};

export default function DeleteModal({ proyek, action }: DeleteModalProps) {
  const [modalTerbuka, setModalTerbuka] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalTerbuka(true)}
        className="rounded-lg bg-red-950/60 px-3 py-1.5 text-xs text-red-300 transition-colors hover:bg-red-950"
      >
        Hapus
      </button>

      {modalTerbuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Tutup dialog"
            className="absolute inset-0 cursor-default bg-slate-950/75"
            onClick={() => setModalTerbuka(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hapus-proyek-title"
            className="relative w-full max-w-md rounded-xl border border-red-900 bg-card p-6 text-text shadow-xl"
            onKeyDown={(event) => {
              if (event.key === 'Escape') setModalTerbuka(false);
            }}
          >
            <h2 id="hapus-proyek-title" className="mb-3 text-xl font-bold text-text">
              Konfirmasi Hapus
            </h2>
            <p className="mb-2 text-gray-300">Apakah kamu yakin ingin menghapus proyek berikut?</p>
            <p className="mb-4 font-semibold text-text">{proyek.judul}</p>
            <p className="mb-6 text-sm text-red-600">Tindakan ini tidak dapat dibatalkan.</p>

            <form action={action} className="flex justify-end gap-3">
              <input type="hidden" name="id" value={proyek.id} />
              <button
                type="button"
                onClick={() => setModalTerbuka(false)}
                className="rounded-lg bg-surface px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-surface/80"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}