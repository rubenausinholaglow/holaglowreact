'use client'
import { useState } from 'react';
import { CustomButtonFilter } from '@components/CustomButtonFilter';
import { FilterPageProps } from '@utils/props';

export const Filters: React.FC<FilterPageProps> = ({ onClickFilter }) => {

    const [inputValue, setInputValue] = useState('');


    const handleButtonClick = (id:string, isSelected : boolean) => {
        if (inputValue) {
            onClickFilter(id,inputValue,true);
        }
        else if(isSelected) {
            onClickFilter(id,'',true);
            
        } else {
            onClickFilter(id,'', false);
        }  
      };

    const onChangeText = (e :string) => {

    }

  return (
    <div id="filters" className='bg-white w-1/4 rounded-lg p-5 m-1' >
        <h1 className='text-black m-1 font-bold'>Filtros</h1>
        <div id="input" className='mt-1'>
            <input
                type="text"
                placeholder="Filtrar por título o descripción"
                className="border border-gray-400 rounded px-2 py-1 mt-2 text-black w-full"
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
        
        <div className='mt-5'>
            <h1 className='text-black m-1'>Precio entre</h1>
            <div id="MoneyFilter" className="grid grid-cols-2 gap-3">
                <CustomButtonFilter id="0-250" onClick={handleButtonClick} value="0€ - 250€" tag='MoneyFilter'/>
                <CustomButtonFilter id="250-500" onClick={handleButtonClick} value="250€ - 500€" tag='MoneyFilter'/>
                <CustomButtonFilter id="500" onClick={handleButtonClick} value="Más de 500€" tag='MoneyFilter'/>
            </div>
        </div>

        <div className='mt-5'>
            <h1 className='text-black m-1'>Zona</h1>
            <div id="Body" className="grid grid-cols-2 gap-3">
                <CustomButtonFilter id="TercioInferior" onClick={handleButtonClick} value="Tercio Inferior" tag='Body'/>
                <CustomButtonFilter id="TercioMedio" onClick={handleButtonClick} value="Tercio Medio" tag='Body'/>
                <CustomButtonFilter id="TercioSuperior" onClick={handleButtonClick} value="Tercio Superior" tag='Body'/>
                <CustomButtonFilter id="Piel" onClick={handleButtonClick} value="Piel" tag='Body'/>
                <CustomButtonFilter id="Pelo" onClick={handleButtonClick} value="Pelo" tag='Body'/>
            </div>
        </div>

        <div className='mt-5'>
            <h1 className='text-black m-1'>Categoria</h1>
            <div id="Category" className="grid grid-cols-2 gap-3">
                <CustomButtonFilter id="Arrugas" onClick={handleButtonClick} value="Arrugas" tag='Category'/>
                <CustomButtonFilter id="Calidad Piel" onClick={handleButtonClick} value="Calidad Piel" tag='Category'/>
                <CustomButtonFilter id="Pelo" onClick={handleButtonClick} value="Pelo" tag='Category'/>
                <CustomButtonFilter id="Relleno" onClick={handleButtonClick} value="Relleno" tag='Category'/>
                <CustomButtonFilter id="Lifting" onClick={handleButtonClick} value="Lifting" tag='Category'/>
                <CustomButtonFilter id="Otros" onClick={handleButtonClick} value="Otros" tag='Category'/>
            </div>
        </div>

        <div className='mt-5'>
            <h1 className='text-black m-1'>Packs</h1>
            <div id="Packs" className="grid grid-cols-2 gap-3">
                <CustomButtonFilter id="Packs" onClick={handleButtonClick} value="VerPacks" tag='Packs'/>
            </div>
        </div>
    
        <div className='mt-5'>
            <h1 className='text-black m-1'>Clínica</h1>
            <div id="Clinic" className="grid grid-cols-2 gap-3">
                <CustomButtonFilter id="Barcelona" onClick={handleButtonClick} value="Barcelona" tag='Clinic'/>
                <CustomButtonFilter id="Madrid" onClick={handleButtonClick} value="Madrid" tag='Clinic'/>
                <CustomButtonFilter id="Valencia" onClick={handleButtonClick} value="Valencia" tag='Clinic'/>
            </div>
        </div>
    
    </div>
    );
}