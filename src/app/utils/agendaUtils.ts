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

    const haveTreatmentsEsthetics = getTreatmentPerType(selectedTreatments, ProductType.Esthetic)
    const haveTreatmentsMedics = getTreatmentPerType(selectedTreatments, ProductType.Medical)
    if (haveTreatmentsEsthetics) {
        return true;
    }

    if(haveTreatmentsMedics && product.type == ProductType.Esthetic) {
        return true;
    }

    if ((getTreatmentPerUnityType(selectedTreatments, UnityType.Hilos) && product.unityType == UnityType.Radiesse) ||
        (getTreatmentPerUnityType(selectedTreatments, UnityType.Radiesse) && product.unityType == UnityType.Hilos))
    {
        return true;
    }

    if ((getTreatmentPerUnityType(selectedTreatments, UnityType.Hilos) && product.unityType == UnityType.Belkyra) ||
        (getTreatmentPerUnityType(selectedTreatments, UnityType.Belkyra) && product.unityType == UnityType.Hilos))
    {
        return true;
    }

    if ((getTreatmentPerUnityType(selectedTreatments, UnityType.AcidoHialuronico) && product.unityType == UnityType.Vitaminas) ||
        (getTreatmentPerUnityType(selectedTreatments, UnityType.Vitaminas) && product.unityType == UnityType.AcidoHialuronico)) 
    {
        return true;
    }

    if (isIncompatibleWithSelectedTreatments(product.flowwwId, selectedTreatments)) {
        return true;
    }

    if (isIncompatibleWithSelectedTreatmentsByUnityType(product, selectedTreatments)) {
        return true;
    }


    if (cart.length > 0 && selectedTreatments.filter(x => x.unityType == product.unityType)
            .length >= sumPerTypeInCart[product.unityType]) {
        return true;
    }

    return false;
}

function getTreatmentPerType(selectedTreatments: Product[], proyctType : ProductType): boolean {
    return selectedTreatments.some(treatment => treatment.type === proyctType);
}

function getTreatmentPerUnityType(selectedTreatments: Product[], unityType : UnityType): boolean {
    return selectedTreatments.some(treatment => treatment.unityType === unityType); 
}

const incompatibleProductsMap: Record<number, number[]> = {
    2109: [860, 936, 935, 934],
    2110: [860, 936, 935, 934],
    860 :[2109, 2110],
    936 :[2109, 2110],
    935 :[2109, 2110],
    934 :[2109, 2110],
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


const incompatibleProductsUnityTypeMap: Record<number, UnityType[]> = {
    854: [UnityType.BabyBotox, UnityType.Botox],
};

function isIncompatibleWithSelectedTreatmentsByUnityType(product: Product, selectedTreatments: Product[]): boolean {

    if(selectedTreatments.filter(x => incompatibleProductsUnityTypeMap[x.flowwwId]).length > 0)
    {
        if(product.unityType == UnityType.Botox || product.unityType == UnityType.BabyBotox)
        {
            return true
        }
    } else{
        if(selectedTreatments.some(x => x.unityType == UnityType.Botox || x.unityType == UnityType.BabyBotox) && product.flowwwId == 854)
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

