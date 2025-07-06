"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	// const query = searchParams.get("topic") || "";

	const [searchQuery, setsearchQuery] = useState("");

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchQuery) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "topic",
					value: searchQuery,
				});
				router.push(newUrl, { scroll: false });
			} else {
				if (pathname === "/learning-modules") {
					const newUrl = removeKeysFromUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ["topic"],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchQuery, router, searchParams, pathname]);

	return (
		<div className='relative flex items-center gap-2 border border-input rounded-md bg-background px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-ring'>
			<Image src='/icons/search.svg' alt='search' width={15} height={15} />{" "}
			<input
				type='text'
				placeholder='Search Modules...'
				className='flex-1 bg-transparent text-sm placeholder:text-muted-foreground outline-none'
				value={searchQuery}
				onChange={(e) => setsearchQuery(e.target.value)}
			/>
		</div>
	);
};

export default SearchInput;
