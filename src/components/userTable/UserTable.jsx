import {useEffect, useState} from "react";
import {UserService} from "../../services/user/user.js";
import {Button, Column, DataTable} from "../../services/prime/primeComponents.js";

export const UserTable = () =>{
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        name:  null ,
        minAge: null ,
        maxAge:null
    });
    
    const userService = new UserService();
    
    const getUsers = async () => {
        setLoading(true)
        const result = await userService.getUsers(filters);
        setUsers(result.data)
        setLoading(false)
    }
    useEffect(() => {
        getUsers();
    }, [filters]);

    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-cog" rounded></Button>;
    };
    
    return (
        <>
            <DataTable  dataKey="id" value={ users } tableStyle={{ minWidth: '50rem' }} paginator showGridlines rows={10} loading={loading}
                        emptyMessage="No User found.">
                <Column field="firstName" header="First Name" ></Column>
                <Column field="lastName" header="Last Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="role" header="Role"></Column>
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>
        </>
    )
}
