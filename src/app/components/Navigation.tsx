const NAV_ITEMS = [
  { name: 'Tratamientos' },
  { name: 'Clínicas' },
  { name: 'Sobre nosotros' },
];

export default function Navigation() {
  return (
    <nav>
      <ul className="flex flex-row gap-16">
        {NAV_ITEMS.map(navItem => (
          <li className="" key={navItem.name}>
            {navItem.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}
