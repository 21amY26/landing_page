import { cn } from '@/lib/utils';

export function DottedGlowBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="absolute left-1/2 top-[-18rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[rgba(120,222,171,0.16)] blur-3xl" />
      <div className="absolute right-[-10rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-[rgba(120,222,171,0.08)] blur-3xl" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(120,222,171,0.22)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#082108] to-transparent" />
    </div>
  );
}
