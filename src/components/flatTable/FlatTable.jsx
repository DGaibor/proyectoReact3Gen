import {useEffect, useState} from "react";
import {DataTable,Column, Button} from "../../services/prime/primeComponents.js"
import {FlatService} from "../../services/flat/flat.js";

export const FlatTable= () =>{
    const [flats, setFlats] = useState([]);
    
    const flatService = new FlatService();
    
    const getFlats = async () => {
        const result = await flatService.getFlats();
        console.log(result.data);
        setFlats(result.data)
    }

    useEffect(() => {
        getFlats();
    }, []);
    
    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-cog" rounded></Button>;
    };


    return<>
        <DataTable  dataKey="id" value={flats} tableStyle={{ minWidth: '50rem' }}>
            <Column field="city" header="City"></Column>
            <Column field="streetName" header="Street Name"></Column>
            <Column field="dates.seconds" header="Date Available"></Column>
            <Column field="price" header="Price"></Column>
            <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
        </DataTable>
    </>
}
