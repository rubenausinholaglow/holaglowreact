import { CartItem, PackUnitiesScheduled, Product, ProductType, UnityType } from "@interface/product";

 function getCountTreatmentsToSchedule(
    product: Product,
    cart : CartItem[],
    treatmentPacks : PackUnitiesScheduled[]
  ): Record<UnityType, number> {
    const counts: any = {
      [UnityType.None]: 0,
      [UnityType.AcidoHialuronico]: 0,
      [UnityType.BabyBotox]: 0,
      [UnityType.Botox]: 0,
      [UnityType.Piel]: 0,
      [UnityType.PielProfunda]: 0,
      [UnityType.Peeling]: 0,
      [UnityType.Radiesse]: 0,
      [UnityType.Belkyra]: 0,
      [UnityType.Hilos]: 0,
      [UnityType.Lifting]: 0,
    };

    cart.forEach(item => {
      if (
        !item.isPack &&
        !item.isScheduled &&
        item.unityType === product.unityType
      ) {
        counts[item.unityType]++;
      }
    });

    treatmentPacks.forEach(pack => {
      if (!pack.isScheduled) {
        counts[pack.type]++;
      }
    });

    return counts;
  }

export function isDisableAddQuantity(selectedTreatments: Product[], product: Product, cart: CartItem[], treatmentPacks: PackUnitiesScheduled[]): boolean {
    
    
    const sumPerTypeInCart = getCountTreatmentsToSchedule(
      product,
      cart,
      treatmentPacks
    );
    
    if(sumPerTypeInCart[product.unityType] == 0) return true;

    if(selectedTreatments.length == 0) return false;
    
    if (cart.length > 0 && selectedTreatments.filter(x => x.unityType == product.unityType)
            .length >= sumPerTypeInCart[product.unityType]) {
        return true;
    }

    const haveTreatmentsEsthetics = getTreatmentPerType(selectedTreatments, ProductType.Esthetic)
    const haveTreatmentsMedics = getTreatmentPerType(selectedTreatments, ProductType.Medical)
    if (haveTreatmentsEsthetics) {
        return true;
    }

    if(haveTreatmentsMedics && product.type == ProductType.Esthetic) {
        return true;
    }

    if (isIncompatibleWithSelectedTreatments(product.flowwwId, selectedTreatments)) {
        return true;
    }

 

    return false;
}

function getTreatmentPerType(selectedTreatments: Product[], proyctType : ProductType): boolean {
    return selectedTreatments.some(treatment => treatment.type === proyctType);
}

const incompatibleProductsMap: Record<number, number[]> = {
    2109: [860, 936, 935, 934],
    2110: [860, 936, 935, 934],
    860 :[2109, 2110],
    936 :[2109, 2110],
    935 :[2109, 2110],
    934 :[2109, 2110],
    854 : [851, 850, 856],
    851 : [854],
    850 : [854],
    856 : [854],
    858 : [2015],
    2015 : [858],
    859: [4129],
    4129: [859]
};

function isIncompatibleWithSelectedTreatments(flowwwId: number, selectedTreatments: Product[]): boolean {

    if(incompatibleProductsMap[flowwwId])
    {

        if(selectedTreatments.some(x => x.flowwwId) && incompatibleProductsMap[flowwwId].some(x => selectedTreatments.some(y => y.flowwwId == x)))
        {
            return true
        }
        
    }  
    return false;
}

export  function getValidTypes() {
    const types = [ProductType.Esthetic, ProductType.Medical];
    return types;
  }

export function getValidUnityTypes(treatmentPacks : PackUnitiesScheduled[]) {
    const packTypes = treatmentPacks.map(pack => pack.type);
    return packTypes;
  }


export function getInvalidProducts(cart: CartItem[]): string[] {

  const invalidProducts = ['4107', '866'];
  const specialProductsPacks = ['855', '854'];
  const specialPacks= ['5492', '5497', '974', '5465'];

  if(cart.find(x => !specialPacks.includes(x.flowwwId.toString())))
  {
    invalidProducts.push(...specialProductsPacks); 
  }  
  return invalidProducts;
}

interface ProductsWithUpgrades  {
    productName : string;
} 

export const productsAndSessions : ProductsWithUpgrades[] = [
    {
      productName: 'Microneedling',
    },
    {
      productName: 'Rafiofrecuencia',
    },
    {
      productName: 'Peeling Químico',
    },
    {
      productName: 'Hydrafacial',
    },
]