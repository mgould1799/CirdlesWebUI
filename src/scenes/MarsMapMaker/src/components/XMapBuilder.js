import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {FORMAT_M21, readToText} from "./BuilderComponents/Helpers/FileHelpers"
import {fileTextToState} from "./BuilderComponents/Helpers/FileHelpers"
//import './css/MapBuilder.css'
import  {fieldsDict}  from "./BuilderComponents/Helpers/fieldsDict.jsx"
import saveAs from 'file-saver';
import mapPrinter from "./BuilderComponents/Main/mapPrinter"
import XRenderFormats from "./BuilderComponents/Main/XRenderFormats"
import DefaultInfo from "./BuilderComponents/Main/DefaultInfo";
import legend from "../M3Legend.jpg"

import {
    removeMapValue,
    setUserField,
    addToBeMapped,
    enableSesarField,
    disableSesarField,
    enableUserField,
    decoupleOldUserFieldsMapValues,
    replaceM21Null, removeExtraM21Field
} from "./BuilderComponents/Helpers/CallBacks"
import {LegendPopup} from "./LegendPopup";




class XMapBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            file: [], fields: {}, mapValues: {}, sesarFields:fieldsDict,
        }

    }


        handleFileUpload= async (e) =>{
        //console.log("e", e)
        await this.setState({file: e[0]})
        //console.log("state: ", this.state.file)

        const fileContents = await readToText(this.state.file)
        // console.log("fc:", fileContents);


        this.setState({fields:await fileTextToState(fileContents)})

    }



    // changeFormat=(e,sesarField)=>{
    //     var sesarFields = this.state.sesarFields;
    //     var newFormat = e.target.value;
    //
    //     if (newFormat !== sesarFields[sesarField].format) {
    //         var stateObject = sesarFields[sesarField];
    //         stateObject.format = newFormat;
    //         this.setState(preState => ({
    //             sesarFields: {...sesarFields,
    //                 [sesarField]: stateObject }
    //
    //         } ) )
    //     }
    // }

    currentMapValueFields=(oldVal)=>{
        if(oldVal==="size") return "NULL"
        return (this.state.mapValues[oldVal].userValues)};

    removeFieldCallBack = (oldField,originField) =>{

        let newFields = enableUserField(oldField,this.state.fields);
        let  newMapValues = {...this.state.mapValues};
        delete newMapValues[originField].extra ;
        newMapValues[originField].userValues = newMapValues[originField].userValues.splice(0,1)
        console.log(newMapValues);
        this.setState(preState => ({
            fields: newFields,

            mapValues : newMapValues //{...preState.mapValues, [sesarValues.selectedField]: newMapValue}
        }))
    }

    callBack =(sesarValues,userField,format,oldField)=> { //on button click toggles disable for option and sets mapping variable
        console.log("kallbacking", sesarValues, "uf", userField, "form", format , "oldfield",oldField)
        let newSesarFields = disableSesarField(this.state.sesarFields,sesarValues); //returns state.sesarFields
        let newMapValues = addToBeMapped(this.state.mapValues,userField, sesarValues, format); //returns state.mapValues
        console.log("new map values",newMapValues)
        let newFields = setUserField(this.state.fields,userField, sesarValues); //returns state.fields
        console.log(newFields["FACILITY_CODE"], "\n",newFields);

        if(oldField !== null ) {
            console.log("made it!",oldField)
            let userFieldsToEnable = this.currentMapValueFields(oldField);
            newFields = enableUserField(userFieldsToEnable,newFields);
            newSesarFields = enableSesarField(oldField,newSesarFields);
            newMapValues = removeMapValue(oldField,newMapValues);
        }

        this.setState(preState => ({
            fields: newFields,
            sesarFields:  newSesarFields,
            mapValues : newMapValues
        }))
    };
    removeM21Field =(sesarField,selectedValue,index)=>{
        var newMapValues = removeExtraM21Field(this.state.mapValues,sesarField,selectedValue,index)
        if(selectedValue !== "NULL") {
            var newFields = enableUserField(selectedValue, this.state.fields);
        }else newFields = this.state.fields;
        this.setState(preState => ({
            fields: newFields,
            mapValues : newMapValues
        }))
    }

    multiCallBack=(sesarValues,userField,format,oldValues)=> { //on button click toggles disable for option and sets mapping variable
        console.log("MCB",sesarValues,"uf",userField,format,oldValues)
        //sets mappedTo in new fields
        let newFields = setUserField(this.state.fields,userField, sesarValues); //returns state.fields
        // adds new MapValues
        // let newMapValues = addToBeMapped(this.state.mapValues,userField, sesarValues, format); //returns state.mapValues
        let mapValues = this.state.mapValues;
        let nullIndex = mapValues[sesarValues.selectedField].userValues.indexOf("NULL");

        if(nullIndex !== -1) {
            mapValues = replaceM21Null(mapValues, sesarValues, userField, nullIndex)
        } else if(userField[0] !== "NULL"){
            mapValues = addToBeMapped(mapValues,userField,sesarValues,format)
        }
        //sets values no longer selected to not disabled and no mapped to
        newFields = enableUserField(oldValues,newFields)
        // removes oldvalues from MappingValues
        mapValues = decoupleOldUserFieldsMapValues(oldValues,mapValues[sesarValues.selectedField])



        this.setState(preState => ({
            fields: newFields,
            mapValues : {...preState.mapValues, [sesarValues.selectedField]: mapValues}
        }))
    };

    setExtraM21Field = (sesarField,selectedValue,index)=>{
        console.log("SetM21 \n sesarField:",sesarField,"SelectedValues:",selectedValue)
        let newFields = setUserField(this.state.fields,selectedValue, {selectedField:sesarField}); //returns state.fields

        var newMapValues = replaceM21Null(this.state.mapValues,{selectedField:sesarField},selectedValue,index)

        this.setState(preState => ({
            fields: {...newFields},
            mapValues : {...newMapValues}
        }))
    }



    renderfields=()=> {

        let userFields = Object.keys(this.state.fields);

        if (userFields.length > 0) {
            return Object.entries(this.state.fields).map(([each, value]) => { //each is the sesar field object
                   // console.log("renderformats",value)
                    return <div> <XRenderFormats
                                    key={"RF-"+each}
                                    userField={{fieldName:each,...value}}
                                    sesarFields={this.state.sesarFields}
                                    allUserFields={this.state.fields}
                                    decouple={this.decoupleOldUserFieldsMapValues}
                                    callBack={this.callBack}
                                    multiCallBack={this.multiCallBack}
                                    changeFormat={this.changeFormat}
                                    addConversionValue={this.addConversionValue}
                                    defaultUnit={this.state.mapValues.defaultUnit}
                                    //removeFieldCallBack={this.removeFieldCallBack}
                                    mapValues ={this.state.mapValues}
                                    addExtraM21Field={this.addExtraM21Field}
                                    setExtraM21Field ={this.setExtraM21Field}
                                    removeM21Field={this.removeM21Field}
                    />
                    </div>

            } )
        }
        return <div> >:)</div>
    }

    setUnit=(e)=>{
        let unit = e.target.value;
        let newSesarFields = disableSesarField(this.state.sesarFields,{selectedField:"size_unit CM IS COMMON"})
        this.setState(preState => ({mapValues : {...preState.mapValues, defaultUnit : unit },sesarFields:{...newSesarFields} }) )};

    addConversionValue = (targetValue,extra ) => {
        let temp = this.state.mapValues[targetValue]

        if(extra){temp.extra = {field: extra.field , unit : extra.unit}}

        this.setState(preState =>({mapValues : { ...preState.mapValues , [targetValue]: temp  } }))
    }

    addExtraM21Field = (target)=>{
        var temp = addToBeMapped(this.state.mapValues,["NULL"],{selectedField:target},FORMAT_M21);
        this.setState(preState => ({

            mapValues : {...temp}
        }))
    }



/*############ Takes in state of generated mapValues and produces  .js map file*/
 makeMapFile=()=>{
     var blob = new Blob([ mapPrinter(this.state.mapValues)], {type: "text/plain;charset=utf-8"});
     saveAs(blob, "testfile1.txt");
    ;
 }

 setDateFormatting=(dateFormat)=>{this.setState(prevState =>({ mapValues : {...this.state.mapValues, userDateFormat:dateFormat}}))}

    render() {


        console.log("STATE",this.state.sesarFields)
        return (

            <div style={{margin:"20px","margin-top":"50px"}}>

                <div className=" row ">

                            <div className={"col-lg-4"} />

                    File Input
                    <div className={"col-lg-3"} >
                        <input  type="file" onChange={event => this.handleFileUpload(event.target.files)}/>
                    </div>

                    <div className={"col-lg-1"}>
                        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal">
                            Help
                        </button>
                        <LegendPopup/>
                    </div>

                </div>

                <div className={"row"}>
                    <div className={"col-lg-3"} />
                    <div className={"col-lg-9"}>
                    <DefaultInfo setDateFormatting={this.setDateFormatting}
                                 userFields={this.state.fields}
                                    setUnit={this.setUnit}/>
                    </div>
                </div>








                {this.renderfields()}
                <div className="">
                <button onClick={this.makeMapFile} > Create Map File</button>
                </div>
                </div>
        )
    }
}



export default (XMapBuilder);
