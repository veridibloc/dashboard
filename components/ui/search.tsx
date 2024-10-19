'use client';

import { Input } from '@/components/ui/input';
import { DeleteIcon, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

export function SearchInput() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    setValue(searchParams.get('q') ?? "")
  }, [searchParams])

  function searchAction(formData: FormData) {
    let value = formData.get('q') as string;
    let params = new URLSearchParams({ q: value });
    window.history.pushState(null, '', `?${params}`)
  }

  const handleDelete = () => {
    window.history.pushState(null, '', '?')
  }

  return (
    <form action={searchAction} className="relative ml-auto flex-1">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <DeleteIcon onClick={handleDelete} className="absolute right-2 top-[.75rem] h-4 w-4 text-muted-foreground" />
    </form>
  );
}
