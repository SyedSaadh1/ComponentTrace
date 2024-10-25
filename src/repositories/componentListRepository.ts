import { ComponentList } from '../models/componentInterface';
import { ComponentModel } from '../models/ComponentList';
 
 
export let findAllComponents = ()=> {
    return ComponentModel.find({});
}
 
export let storeComponents = (components:ComponentList)=> {
    return ComponentModel.insertMany(components);
}

export let updateComponents = (components:ComponentList)=> {
    return ComponentModel.updateOne({_id:components.componentId},{$set:{wareHouseLocation:components.wareHouseLocation}});
}
 
export let deleteComponents = (componentMasterId:Number)=> {
    return ComponentModel.deleteOne({_id:componentMasterId});
}
 

