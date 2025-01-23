import {useEffect, useState} from "react";
import {DataTable,Column, Button, IconField, InputIcon, InputText, InputNumber} from "../../services/prime/primeComponents.js"
import {FlatService} from "../../services/flat/flat.js";

export const FlatTable= () =>{
    const [flats, setFlats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        city:  null ,
        minPrice: null ,
        maxPrice:null 
    });


    const flatService = new FlatService();
    
    const getFlats = async () => {
        setLoading(true)
        const result = await flatService.getFlats(filters);
        setFlats(result.data)
        setLoading(false)
    }

    const cityFilterTemplate = () => {
        return <InputText placeholder={'City'} value={filters.city} onChange={(e) => setFilters({...filters, city:  e.target.value}) } />;
    };

    const priceFilterTemplate = () => {
        return (
            <>
                <InputNumber
                    value={filters.minPrice}
                    onChange={(e) => setFilters((prev)=> ({...filters,minPrice:e.value})) }
                    className="w-full"
                    placeholder="Min Price"
                />
                <InputNumber
                    value={filters.maxPrice}
                    onChange={(e) => setFilters((prev)=> ({...filters,maxPrice:e.value})) }
                    className="w-full"
                    placeholder="Max Price"
                />
            </>
        );
    };
    
    useEffect(() => {
        getFlats();
    }, [filters]);
    
    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-cog" rounded></Button>;
    };
    
    const initFilters = () => {
        setFilters({
            city:  null ,
            minPrice:  null ,
            maxPrice: null ,
            
        });
    };
    const clearFilter = () => {
        initFilters();
    };
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
            </div>
        );
    };
    const header = renderHeader();

    return<>
        <DataTable  dataKey="id" value={ flats } tableStyle={{ minWidth: '50rem' }} paginator showGridlines rows={10}  filterDisplay="row" loading={loading}
                    header={header}
                    emptyMessage="No customers found.">
            <Column field="city" header="City" filterField="city" filter filterElement={cityFilterTemplate} showFilterMenu={false}></Column>
            <Column field="streetName" header="Street Name"></Column>
            <Column field="dates.seconds" header="Date Available"></Column>
            <Column field="price" header="Price" filterField="price" filter filterElement={priceFilterTemplate}  showFilterMenu={false}></Column>
            <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
        </DataTable>
    </>
}
