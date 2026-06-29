// PageWrapper: centers content, sets max-width, adds padding
// Every page wraps its content in this

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <main className={`max-w-6xl mx-auto px-4 sm:px-6 ${className || ''}`}>
            {children}
        </main>
    );
}
