import { useState } from 'react';
import { Product } from '@interface/product';
import { useSessionStore } from 'app/stores/globalStore';

const useSelectTreatments = () => {
    const { setSelectedTreatments, selectedTreatments } = useSessionStore(
        state => state
    );

    const validTypes = [2, 3, 7];

    const addProduct = (product: Product) => {
        if (validTypes.includes(product.type)) {
            setSelectedTreatments([...selectedTreatments, product]);
        }
    };

    const removeProduct = (product: Product) => {
        const indexToRemove = selectedTreatments.findIndex(item => item.id === product.id);

        if (indexToRemove !== -1) {
            const updatedTreatments = [...selectedTreatments];
            updatedTreatments.splice(indexToRemove, 1);

            setSelectedTreatments(updatedTreatments);
        }
    };

    return { addProduct, removeProduct };
};

export default useSelectTreatments;
