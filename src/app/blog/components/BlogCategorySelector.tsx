const CATEGORIES = [
  'Arrugas',
  'Relleno',
  'Piel',
  'Cabello',
  'Glow On',
  'Historias reales',
];

export default function BlogCategorySelector({
  className,
}: {
  className?: string;
}) {
  return (
    <ul
      id="blogCategorySelector"
      className={`flex gap-4 overflow-x-scroll overflow-y-hidden md:overflow-auto ${
        className ? className : ''
      }`}
    >
      <li className="flex justify-center items-center bg-hg-black100 text-hg-black300 border border-hg-black100 px-4 py-3 rounded-full text-xs shrink-0 ml-4">
        Todas
      </li>
      {CATEGORIES.map(category => (
        <li
          className="flex justify-center items-center bg-white text-hg-black300 border border-hg-black300 px-4 py-3 rounded-full text-xs shrink-0"
          key={category}
        >
          {category}
        </li>
      ))}
    </ul>
  );
}
