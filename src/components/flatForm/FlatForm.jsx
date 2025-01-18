import { useRef, useState} from "react";
import {FloatLabel,InputText,Button,InputNumber, Calendar} from "../../services/prime/primeComponents.js"
import {FlatService} from "../../services/flat/flat.js";

export const FlatForm = () => {
    
    const city = useRef()
    const streetName = useRef()
    const [dates, setDates] = useState(null);
    const [price, setPrice] = useState(null);
    
    const flatService = new FlatService();
    
    const submit = async (e) => {
        e.preventDefault();

        const flat = {
            city: city.current?.value,
            streetName: city.current?.value,
            dates: dates,
            price: price
        }
        const result = await flatService.createFlat(flat)
        alert(result.message)
        

    }
    
    return <>
        <form onSubmit={(e)=> submit(e)}>
            <div className="card flex justify-content-center">
                <FloatLabel className={'field-label'}>
                    <InputText ref={city} id="city" defaultValue={''} />
                    <label htmlFor="city">City</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <InputText ref={streetName} id="streetName" defaultValue={''} />
                    <label htmlFor="streetName">Street Name</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <InputNumber  id="price"  value={price} onChange={(e) => setPrice(e.value)} mode="currency" currency="USD" locale="en-US"/>
                    <label htmlFor="price">Price</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="single"  id="dateAvailable" defaultValue={''} />
                    <label htmlFor="dateAvailable">Date Available</label>
                </FloatLabel>
            </div>
            <Button type={'submit'} className={'field-label'} label={'Create Flat'} />

        </form>
    </>
}
