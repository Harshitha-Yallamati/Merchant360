import { type LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export function PlaceholderPage({ title, icon: Icon, description }: PlaceholderPageProps) {
  return (
    <div className="animate-fade-in pb-12 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      </div>

      <section className="flex-1 rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-[#0b0f19] flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
          <Icon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">Coming Soon</h2>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">{description}</p>
      </section>
    </div>
  );
}
