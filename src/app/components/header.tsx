import Link from "next/link";

export function Header() {
	return (
		<div className="h-28 w-full flex flex-row justify-center items-center gap-x-8">
			<Link className="text-white" href="/">Query</Link>
			<Link className="text-white" href="/zustand">Zustand</Link>
		</div>
	)
}
