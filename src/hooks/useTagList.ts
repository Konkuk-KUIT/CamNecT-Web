import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { requestTagList } from "../api/auth";

type SignupTagItem = {
  id: number;
  name: string;
  category?: number;
};

type SignupTagCategory = {
  id: number;
  name: string;
  tags: SignupTagItem[];
};

type FilterTagItem = {
  id: string;
  name: string;
  category?: string;
};

type FilterTagCategory = {
  id: string;
  name: string;
  tags: FilterTagItem[];
};

export const useTagList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tagList"],
    queryFn: () => requestTagList(),
  });

  const tagData = data?.data;

  const {
    signupCategories,
    signupTags,
    filterCategories,
    filterTags,
    mapTagNamesToIds,
  } = useMemo(() => {
    if (!tagData) {
      return {
        signupCategories: [] as SignupTagCategory[],
        signupTags: [] as SignupTagItem[],
        filterCategories: [] as FilterTagCategory[],
        filterTags: [] as FilterTagItem[],
        mapTagNamesToIds: (names: string[]) => {
          void names;
          return [] as number[];
        },
      };
    }

    const signupCategories: SignupTagCategory[] = tagData.map((category) => ({
      id: category.categoryId,
      name: category.categoryName,
      tags: category.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        category: category.categoryId,
      })),
    }));

    const signupTags = signupCategories.flatMap((category) => category.tags);
    const tagNameToId = new Map(
      signupTags.map((tag) => [tag.name, tag.id] as const),
    );

    const filterCategories: FilterTagCategory[] = signupCategories.map((category) => ({
      id: String(category.id),
      name: category.name,
      tags: category.tags.map((tag) => ({
        id: String(tag.id),
        name: tag.name,
        category: String(category.id),
      })),
    }));

    const filterTags = filterCategories.flatMap((category) => category.tags);

    const mapTagNamesToIds = (names: string[]) =>
      names
        .map((name) => tagNameToId.get(name))
        .filter((id): id is number => typeof id === "number");

    return {
      signupCategories,
      signupTags,
      filterCategories,
      filterTags,
      mapTagNamesToIds,
    };
  }, [tagData]);

  return {
    signupCategories,
    signupTags,
    filterCategories,
    filterTags,
    mapTagNamesToIds,
    isLoading,
    isError,
  };
};
