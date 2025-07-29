import { useSearch } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

interface UsePaginationProps {
	itemsPerPage: number;
	totalItems: number;
}

interface UsePaginationReturn {
	currentPage: number;
	totalPages: number;
	startIndex: number;
	endIndex: number;
	goToPage: (page: number) => void;
}

export function usePagination({
	itemsPerPage,
	totalItems,
}: UsePaginationProps): UsePaginationReturn {
	const searchParams = useSearch({ strict: false }) as Record<string, string>;

	const currentPage = useMemo(() => {
		return Number.parseInt(searchParams?.page || "1", 10);
	}, [searchParams?.page]);

	const totalPages = useMemo(() => {
		return Math.ceil(totalItems / itemsPerPage);
	}, [totalItems, itemsPerPage]);

	const startIndex = useMemo(() => {
		return (currentPage - 1) * itemsPerPage;
	}, [currentPage, itemsPerPage]);

	const endIndex = useMemo(() => {
		return startIndex + itemsPerPage;
	}, [startIndex, itemsPerPage]);

	const goToPage = useCallback((page: number) => {
		const url = new URL(window.location.href);

		if (page === 1) {
			url.searchParams.delete("page");
		} else {
			url.searchParams.set("page", page.toString());
		}

		window.history.pushState({}, "", url.toString());
	}, []);

	return {
		currentPage,
		totalPages,
		startIndex,
		endIndex,
		goToPage,
	};
}
