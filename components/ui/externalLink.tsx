import { ChildrenProps } from '@/types/childrenProps';

interface Props extends ChildrenProps{
  href: string;
  className?: string;
}

export function ExternalLink({href, children, className} : Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-blue-500 underline ${className}`}
    >
      {children}
    </a>
  );
}