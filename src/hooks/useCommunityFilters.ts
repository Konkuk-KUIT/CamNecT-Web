import { useMemo, useState } from 'react';

type FilterablePost = {
  author: {
    major: string;
  };
  categories: string[];
};

const useCommunityFilters = <T extends FilterablePost>(posts: T[]) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'major' | 'interest'>('major');
  const [appliedMajor, setAppliedMajor] = useState<string | null>(null);
  const [appliedInterests, setAppliedInterests] = useState<string[]>([]);
  const [draftMajor, setDraftMajor] = useState<string | null>(null);
  const [draftInterests, setDraftInterests] = useState<string[]>([]);

  const activeFilters = useMemo(() => {
    const filters: string[] = [];
    if (appliedMajor) filters.push(appliedMajor);
    return filters.concat(appliedInterests);
  }, [appliedInterests, appliedMajor]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesMajor = appliedMajor ? post.author.major === appliedMajor : true;
      const matchesInterests =
        appliedInterests.length === 0
          ? true
          : appliedInterests.every((interest) => post.categories.includes(interest));

      return matchesMajor && matchesInterests;
    });
  }, [appliedInterests, appliedMajor, posts]);

  const openFilterModal = () => {
    setDraftMajor(appliedMajor);
    setDraftInterests(appliedInterests);
    setIsFilterOpen(true);
  };

  const handleCancel = () => {
    setIsFilterOpen(false);
  };

  const handleApply = () => {
    setAppliedMajor(draftMajor);
    setAppliedInterests(draftInterests);
    setIsFilterOpen(false);
  };

  const handleRemoveFilter = (filter: string) => {
    setAppliedMajor((prev) => (prev === filter ? null : prev));
    setAppliedInterests((prev) => prev.filter((item) => item !== filter));
    if (isFilterOpen) {
      setDraftMajor((prev) => (prev === filter ? null : prev));
      setDraftInterests((prev) => prev.filter((item) => item !== filter));
    }
  };

  const toggleDraftMajor = (department: string) => {
    setDraftMajor((prev) => (prev === department ? null : department));
  };

  const toggleDraftInterest = (item: string) => {
    setDraftInterests((prev) =>
      prev.includes(item) ? prev.filter((interest) => interest !== item) : [...prev, item],
    );
  };

  const hasDraftSelection = Boolean(draftMajor) || draftInterests.length > 0;

  return {
    isFilterOpen,
    activeTab,
    setActiveTab,
    activeFilters,
    filteredPosts,
    openFilterModal,
    handleCancel,
    handleApply,
    handleRemoveFilter,
    draftMajor,
    draftInterests,
    toggleDraftMajor,
    toggleDraftInterest,
    hasDraftSelection,
  };
};

export default useCommunityFilters;
