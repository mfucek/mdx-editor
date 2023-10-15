import '../styles/colors.css';
import '../styles/globals.css';

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	// cookies().set('tracking', 'true');

	return (
		<html lang="en" className="h-full overflow-auto">
			<body className="scroll-smooth h-full">{children}</body>
		</html>
	);
}
