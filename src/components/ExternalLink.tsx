import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & {
  href: string
  children: ReactNode
  cursor?: string
}

/** Every outbound link goes through here so target/rel can never be forgotten. */
export function ExternalLink({ href, children, cursor = 'OPEN ↗', ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cursor={cursor} {...rest}>
      {children}
    </a>
  )
}
