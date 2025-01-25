import {useEffect, useState} from "react";
import {UserService} from "../../services/user/user.js";
import {Button, Column, DataTable, InputText, Dropdown} from "../../services/prime/primeComponents.js";
import {useNavigate} from "react-router-dom";

export const UserTable = () =>{
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        firstName:  null,
        minAge: null,
        maxAge:null,
        role: false,
    });
    const roles = [
        { name: 'All Users', code: '' },
        { name: 'Admin', code: 'admin' },
        { name: 'User', code: 'user' }
    ];
    
    const navigate = useNavigate();
    
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

    const actionBodyTemplate = (user) => {
        console.log(user)
        return <Button type="button" icon="pi pi-pencil" rounded onClick={()=> {navigate('/profile/update/'+user.id)}}></Button>;
    };

    const firstNameFilterTemplate = () => {
        return <InputText placeholder={'First Name'} value={filters.firstName} onChange={(e) => setFilters({...filters, firstName:  e.target.value}) } />;
    };

    const roleFilterTemplate = () => {
        return <Dropdown value={filters.role} onChange={(e) => setFilters({...filters, role:  e.value})} options={roles}
                         optionLabel="name"
                         placeholder="Select a Role" className="w-full md:w-14rem"/>
    }
    
    return (
        <>
            <DataTable  dataKey="id" value={ users } tableStyle={{ minWidth: '50rem' }} paginator showGridlines rows={10} filterDisplay="row"  loading={loading}
                        emptyMessage="No User found.">
                <Column field="firstName" header="First Name" filterField="firstName" filter filterElement={firstNameFilterTemplate} showFilterMenu={false} ></Column>
                <Column field="lastName" header="Last Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="role" header="Role"  filterField="firstName" filter filterElement={roleFilterTemplate} showFilterMenu={false} ></Column>
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={(user)=>actionBodyTemplate(user)} />
            </DataTable>
        </>
    )
}
