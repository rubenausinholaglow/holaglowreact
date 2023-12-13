export const filterItems = [
  {
    typeFilter: 'MoneyFilter',
    textFilter: 'Precio',
    buttons: [
      {
        id: '0-250',
        value: '0€ - 250€',
        tag: 'MoneyFilter',
        selected: false,
      },
      {
        id: '250-500',
        value: '250€ - 500€',
        tag: 'MoneyFilter',
        selected: false,
      },
      {
        id: '500',
        value: 'Más de 500€',
        tag: 'MoneyFilter',
        selected: false,
      },
    ],
  },
  {
    typeFilter: 'Body',
    textFilter: 'Zona',
    buttons: [
      {
        id: '1',
        value: 'Cuerpo',
        tag: 'Body',
        selected: false,
      },
      {
        id: '2',
        value: 'Tercio Superior',
        tag: 'Body',
        selected: false,
      },
      {
        id: '3',
        value: 'Tercio Medio',
        tag: 'Body',
        selected: false,
      },
      {
        id: '4',
        value: 'Tercio Inferior',
        tag: 'Body',
        selected: false,
      },
      {
        id: '5',
        value: 'Piel',
        tag: 'Body',
        selected: false,
      },
      {
        id: '6',
        value: 'Pelo',
        tag: 'Body',
        selected: false,
      },
    ],
  },
  {
    typeFilter: 'Category',
    textFilter: 'Categoria',
    buttons: [
      {
        id: '1',
        value: 'Arrugas',
        tag: 'Category',
        selected: false,
      },
      {
        id: '2',
        value: 'Calidad de la Piel',
        tag: 'Category',
        selected: false,
      },
      {
        id: '3',
        value: 'Caida del pelo',
        tag: 'Category',
        selected: false,
      },
      {
        id: '4',
        value: 'Relleno',
        tag: 'Category',
        selected: false,
      },
      {
        id: '5',
        value: 'Lifting',
        tag: 'Category',
        selected: false,
      },
      {
        id: '6',
        value: 'Otros',
        tag: 'Category',
        selected: false,
      },
    ],
  },
  {
    typeFilter: 'Packs',
    textFilter: 'Packs',
    buttons: [
      {
        id: 'Packs',
        value: 'Packs',
        tag: 'Packs',
        selected: true,
      },
    ],
  },
  {
    typeFilter: 'Type',
    textFilter: 'Tipo',
    buttons: [
      {
        id: '2',
        value: 'Tratamiento',
        tag: 'Type',
        selected: true,
      },
      {
        id: '3',
        value: 'Producto',
        tag: 'Type',
        selected: false,
      },
    ],
  },
];
