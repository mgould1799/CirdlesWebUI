import ConversionField from "../ConversionField"
import React from "react"
import One2One from "../One2One"
import Multi2One from "../Multi2One"
import {FORMAT_CONV, FORMAT_DATE, FORMAT_M21, FORMAT_121, CM, MM} from "../Helpers/FileHelpers"
import {allowedMulti} from "../Helpers/renderSelectOptions"



function ShowOnFormat(props){
    var userField = props.userField;




    if(allowedMulti.includes(props.selectedField)) {  //props.format === FORMAT_M21
        // console.log("switch m21")
        return <Multi2One addFieldCount={props.addFieldCount}
                          collapseOnFinish={props.collapseOnFinish}
                          selectedField={props.selectedField}
                          allUserFields={props.allUserFields}
                          decouple={props.decouple}
                          multiCallBack={props.multiCallBack}
                          originField={props.originField}
                          registerExtraFields={props.registerExtraFields}
                          minusField={props.minusField}
                          removeFieldCallBack={props.removeFieldCallBack}
                          mapValues ={props.mapValues}
                          setExtraM21Field={props.setExtraM21Field}
                          removeM21Field={props.removeM21Field}
        />
    }

    // else if(props.format == (FORMAT_121 || FORMAT_DATE)) {
    //
    //     // console.log("switch 121")
    //     return <One2One
    //         selectedField={props.selectedField}
    //         changeFormat={props.changeFormat}
    //         handleSelect={props.handleSelect}/>
    // }

    else if(props.format == (FORMAT_CONV)) {
        // console.log("switch conv")
        return <ConversionField addFieldCount={(props.addFieldCount >= 1 ? 1 : 0)}
                                selectedField={props.selectedField}
                                allUserFields={props.allUserFields}
                                multiCallBack={props.multiCallBack}
                                originField={props.originField}
                                addConversionValue={props.addConversionValue}
                                defaultUnit={props.defaultUnit}
                                minusField={props.minusField}
                                removeFieldCallBack={props.removeFieldCallBack}/>
    }

            // console.log("null format return")
         else    return null
    }


export function FormatSwitch(props){
    //console.log("praps",props)



   return <div className="inline col-lg-9">
        <h4 className="inline">{props.originField}</h4>
        <h5 className="subText inline "> &emsp;{props.exampleValue}</h5>
        {ShowOnFormat(props)}
    </div>

var userField = props.userField;

}
