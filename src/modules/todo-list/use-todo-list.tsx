import { todoListApi } from "@/shared/api/api";
import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "react-query";

export const useTodoList = () => {
  const {
    data,
    error,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfiniteQueryOptions(),
  });

  const todoItems = data?.pages.flatMap((page) => page.data) || [];

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div className="" ref={cursorRef}>
      {!hasNextPage && <div className="text-white text-center text-3xl mt-4">No data for loading</div>}
      {isFetchingNextPage && <div className="text-white text-center text-3xl mt-4">Loading...</div>}
    </div>
  );

  return { todoItems, error, isLoading, isPlaceholderData, cursor };
};

// вызывает колбек, когда элемент появляется в области видимости
export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    //браузерное API, которое позволяет отслеживать появление элемента в области видимости
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, [onIntersect]); // Include onIntersect in the dependency array
}