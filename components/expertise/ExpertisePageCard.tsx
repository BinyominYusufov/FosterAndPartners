'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExpertisePageCardItem {
  slug: string;
  titleKey: string;
  image: string;
}

interface ExpertisePageCardProps {
  item: ExpertisePageCardItem;
  title: string;
  className?: string;
}

export function ExpertisePageCard({ item, title, className }: ExpertisePageCardProps) {
  return (
    <Link
      href={`/expertise/${item.slug}`}
      className={cn(
        'group block overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors hover:border-neutral-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300',
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-neutral-100 px-5 py-4">
        <h3 className="text-sm font-normal text-neutral-800 md:text-base">{title}</h3>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors group-hover:border-neutral-300 group-hover:text-neutral-900">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
