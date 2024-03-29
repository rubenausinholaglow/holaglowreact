import { Category } from '@interface/product';

export default function BlogCategories({
  categories,
  className,
}: {
  categories: Category[];
  className?: string;
}) {
  return (
    <ul className={`flex gap-4 ${className ? className : ''}`}>
      {categories.map(category => (
        <li
          className="bg-hg-tertiary100 text-hg-tertiary px-4 py-2 rounded-full text-xs"
          key={category.name}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}
