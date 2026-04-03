import { cn } from '@/lib/utils';

export function CanvasText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn('relative inline-flex px-1.5', className)}>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-1 top-1 -z-10 rounded-[18px] border border-[rgba(120,222,171,0.22)] bg-[linear-gradient(120deg,rgba(120,222,171,0.18),rgba(120,222,171,0.05))] shadow-[0_0_0_1px_rgba(120,222,171,0.04)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-1 bottom-0 top-0 -z-10 rounded-[16px] border border-[rgba(120,222,171,0.12)] [background-image:radial-gradient(circle_at_1px_1px,rgba(120,222,171,0.32)_1px,transparent_0)] [background-size:10px_10px]"
      />
      <span className="relative">{children}</span>
    </span>
  );
}
