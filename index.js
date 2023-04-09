
const jpdbBaseURL="http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const studentDBName="STUDENT-DB";
const studentRelationName = "StudentData";
const connToken = "90932854|-31949281717191442|90948338";

$("#rollNo").focus();



function getStudent() {

    let studentIdJsonObj = getStudentAsJsonObj();
    
    jQuery.ajaxSetup ({async: false});
    
    let getRequest = createGET_BY_KEYRequest(connToken,  studentDBName, studentRelationName, studentIdJsonObj); 
    let resJsonObj =executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    
    jQuery.ajaxSetup ({async: true}); 
    
    if (resJsonObj.status ===400) {
    $("#save").prop("disabled", false); 
    $("#reset").prop("disabled", false); 
    $("#rollNo").focus();
    
     } else if (resJsonObj.status === 200) {
    
    $("#rollNo").prop("disabled", true);
     fillData(resJsonObj);
    
    $("#change").prop("disabled", false); 
    $("#reset").prop("disabled", false);
    
    $("#fullName").focus();
    
    }
}

function saveRecNo(jsonObj) {

    let lvData = JSON.parse(jsonObj.data);
    
    localStorage.setItem("recno", lvData.rec_no);
}

    function fillData(jsonObj) {

        saveRecNo(jsonObj); 
       let record = JSON.parse(jsonObj.data).record;

       $("#rollNo").val(record.rollNo) ;
       $("#fullName").val(record.fullName) ;
       $("#classes").val(record.classes) ;
       $("#birthDate").val(record.birthDate) ;
       $("#address").val(record.address)  ;
       $("#enrollmentDate").val(record.enrollmentDate)  ;
        
    }

function getStudentAsJsonObj(){
    let studentrollNo=$("#rollNo").val();
    let jsonstr={
        rollNo:studentrollNo
    };
    return JSON.stringify(jsonstr);
}

function validateData() {

    let rollNo, fullName, className, birthDate, address, enrollmentDate;
    rollNo = $("#rollNo").val();
    fullName = $("#fullName").val();
    className = $("#classes").val();
    birthDate = $("#birthDate").val();
    address = $("#address").val();
    enrollmentDate = $("#enrollmentDate").val();

    let jsonStrObj = {
        rollNo :rollNo,
        fullName:fullName,
        classes : className,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate
    };

    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#classes").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $('#rollNo').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#change').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#rollNo').focus();
    }

    function saveData() {

        let jsonStrObj = validateData();
        
        let putRequest = createPUTRequest(connToken, jsonStrObj, studentDBName, studentRelationName);
        
        jQuery.ajaxSetup({async: false}); 
        let resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML); 
        jQuery.ajaxSetup({async: true});
        
        resetForm();
        
        $('#rollNo').focus();

    }

    function changeData() {

        $("#change").prop("disabled", true); 
         let jsonstr = validateData();
       
        let updateRequest = createUPDATERecordRequest(connToken, jsonstr, studentDBName, studentRelationName,localStorage.getItem("recno") );
       
        jQuery.ajaxSetup({async: false});
        let resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
        jQuery.ajaxSetup({async: true});
        console.log(resJsonObj);
        
       resetForm();
      
        
         $('#rollNo').focus();
    }