import { Category } from '@interface/product';
import { Post } from 'app/types/blog';

export default function BlogCategorySelector({
  className,
  posts,
  activeCategories,
  setActiveCategories,
}: {
  className?: string;
  posts: Post[];
  activeCategories: string[];
  setActiveCategories: (value: string[]) => void;
}) {
  const uniqueCategories: Category[] = posts
    .slice(1)
    .reduce((accumulator, post) => {
      post.categories.forEach((category: Category) => {
        const exists = accumulator.some(
          existingCategory => existingCategory.name === category.name
        );

        if (!exists) {
          accumulator.push(category);
        }
      });

      return accumulator;
    }, [] as Category[]);

  function handleCategory(category: string) {
    let updatedCategories = [...activeCategories];

    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter(item => item !== category);
    } else {
      updatedCategories.push(category);
    }

    setActiveCategories(
      updatedCategories.length === 0 ? [] : updatedCategories
    );
  }

  return (
    <ul
      id="blogCategorySelector"
      className={`flex gap-4 overflow-x-scroll overflow-y-hidden md:overflow-auto pr-4 ${
        className ? className : ''
      }`}
    >
      <li
        className={`cursor-pointer transition-all flex justify-center items-center px-4 py-3 rounded-full text-xs shrink-0 ml-4 border border-hg-black ${
          activeCategories.length === 0
            ? 'bg-hg-primary border-hg-primary font-semibold'
            : ''
        }`}
        onClick={() => setActiveCategories([])}
      >
        Todas
      </li>
      {uniqueCategories.map((category: Category) => (
        <li
          className={`cursor-pointer flex justify-center items-center px-4 md:px-6 py-3 md:py-4 rounded-full text-xs md:text-sm shrink-0 border border-hg-black ${
            activeCategories.includes(category.name)
              ? 'bg-hg-primary border-hg-primary font-semibold'
              : ''
          }`}
          onClick={() => handleCategory(category.name)}
          key={category.name}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}
