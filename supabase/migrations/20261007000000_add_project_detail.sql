alter table public.proyek
add column if not exists detail text;

update public.proyek
set detail = deskripsi
where detail is null;
