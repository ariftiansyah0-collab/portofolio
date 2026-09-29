'use client';

import { useState } from 'react';
import Image from 'next/image';

type EditModalProps = {
  proyek: {
    id: number | string;
    judul: string;
    deskripsi: string | null;
    teknologi: string | null;
    link: string | null;
    gambar: string | null;
  };
  action: (formData: FormData) => void | Promise<void>;
};

export default function EditModal({ proyek, action }: EditModalProps) {
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const idModal = `edit-proyek-title-${proyek.id}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setModalTerbuka(true)}
        className="rounded-lg bg-primary/20 px-3 py-1.5 text-xs text-blue-200 transition-colors hover:bg-primary/35"
      >
        Edit
      </button>

      {modalTerbuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <button
            type="button"
            aria-label="Tutup dialog"
            className="absolute inset-0 cursor-default bg-slate-950/75"
            onClick={() => setModalTerbuka(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={idModal}
            className="relative my-auto w-full max-w-2xl rounded-xl border border-border bg-card p-6 text-text shadow-xl"
            onKeyDown={(event) => {
              if (event.key === 'Escape') setModalTerbuka(false);
            }}
          >
            <h2 id={idModal} className="mb-5 text-xl font-bold text-text">
              Edit Proyek
            </h2>

            <form action={action} className="space-y-4">
              <input type="hidden" name="id" value={proyek.id} />
              <div>
                <label htmlFor={`edit-judul-${proyek.id}`} className="mb-1 block text-sm font-medium text-gray-300">
                  Judul Proyek
                </label>
                <input
                  id={`edit-judul-${proyek.id}`}
                  name="judul"
                  defaultValue={proyek.judul}
                  required
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor={`edit-teknologi-${proyek.id}`} className="mb-1 block text-sm font-medium text-gray-300">
                  Teknologi (pisah koma)
                </label>
                <input
                  id={`edit-teknologi-${proyek.id}`}
                  name="teknologi"
                  defaultValue={proyek.teknologi ?? ''}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor={`edit-deskripsi-${proyek.id}`} className="mb-1 block text-sm font-medium text-gray-300">
                  Deskripsi
                </label>
                <textarea
                  id={`edit-deskripsi-${proyek.id}`}
                  name="deskripsi"
                  defaultValue={proyek.deskripsi ?? ''}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor={`edit-link-${proyek.id}`} className="mb-1 block text-sm font-medium text-gray-300">
                  Link Proyek (opsional)
                </label>
                <input
                  id={`edit-link-${proyek.id}`}
                  name="link"
                  type="url"
                  defaultValue={proyek.link ?? ''}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor={`edit-gambar-${proyek.id}`} className="mb-1 block text-sm font-medium text-gray-300">
                  Foto Proyek
                </label>
                {proyek.gambar && (
                  <div className="relative mb-3 h-40 w-full overflow-hidden rounded-lg bg-surface">
                    <Image src={proyek.gambar} alt={`Foto ${proyek.judul}`} fill className="object-cover" />
                  </div>
                )}
                <input
                  id={`edit-gambar-${proyek.id}`}
                  name="gambar"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text file:mr-3 file:rounded-md file:border-0 file:bg-primary/30 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-blue-200"
                />
                <p className="mt-1 text-xs text-gray-400">Pilih foto baru untuk mengganti foto saat ini. JPG, PNG, atau WebP, maksimal 5 MB.</p>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalTerbuka(false)}
                  className="rounded-lg bg-surface px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-surface/80"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}