import { UnityType } from "@interface/product";

const AHProducts: string[] = [
    '2112',
    '2113',
    '674',
    '847',
    '848',
    '849',
    '852',
    '853',
    '857'
];

const AHProduct1000 : string[] = [
    '855',
    '854'
]
const BabyBotox: string[] = [
    '850',
    '856'
];


const Botox: string[] = [

    '851',
    '867'
];

const Hydrafacial: string[] = [
    '5519',
    '2147',
];



interface ProductPackSchedule {
    name: string;
    packId: string;
    productId: string[];
}


export const PacksConfigured: ProductPackSchedule[] = [
    {
        name: 'Armonización Facial',
        packId: '973',
        productId: AHProducts
    },
    {
        name:  'Pack Prevención',
        packId: '970',
        productId: [
            ...AHProducts,
            ...BabyBotox
        ]
    },
    {
        name: 'Pack Wellaging Basic',
        packId: '972',
        productId: [
            ...AHProducts,
            ...Botox
        ]
    },
    {
        name: 'Pack Wellaging Esencial',
        packId: '971',
        productId: [
            ...AHProducts,
            ...Botox
        ]
    },
    {
        name: 'Pack Lifting',
        packId: '5466',
        productId: [
            ...AHProducts,
            '2015'
        ]
    },
    {
        name: 'Pack Wellaging Plus',
        packId: '974',
        productId: [
            ...AHProducts,
            ...Botox,
            ...AHProduct1000
        ]
    },
    {
        name: 'Full Face',
        packId: '5465',
        productId: [
            ...AHProducts,
            ...Botox,
            ...AHProduct1000
        ]
    },
    {
        name: 'Pack Cóctel',
        packId: '5487',
        productId: [
            ...AHProducts,
            ...Botox,
            ...Hydrafacial,
        ]
    },
    {
        name: 'Pack Banquete',
        packId: '5492',
        productId: [
            ...AHProducts,
            ...Botox,
            ...Hydrafacial,
            ...AHProduct1000,
            '925',
            '2109',
        ]
    },
    {
        name: 'Pack Baile',
        packId: '5497',
        productId: [
            ...AHProducts,
            ...Botox,
            ...Hydrafacial,
            ...AHProduct1000,
            '925',
            '2109',
        ]
    },
]


interface PackProductsUnityTypes {
    packId: string;
    productId: string[];
    unityType: UnityType[];
}

export const PacksProductsUnityTypes : PackProductsUnityTypes[] = [
    {
        packId: '5487',
        productId: [
            ...Hydrafacial,
        ],
        unityType: [UnityType.AcidoHialuronico, UnityType.Botox]
    }
]