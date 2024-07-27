import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
export default class MyLeaves extends LightningElement {

    MyLeaves = [];
    myLeavesWireResult;
    @wire(getMyLeaves)
    wiredMyLeaves(result){
        this.myLeavesWireResult = result;
        if(result.data){
            this.MyLeaves = result.data;
        }
        if(result.error){
            console.log('Error occured while fetching my leaves ', result.error);
        }
    }

}