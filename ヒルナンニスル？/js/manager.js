function func(mode) {
    var url;
    if (mode=="edit") {
        url = "edit.html?name=";
    } else if(mode=="delete") {
        url = "delete.html?name=";
    }
    var radio = document.getElementsByName("radio");
    for(var i=0; i<radio.length; i++) {
        if(radio[i].checked) {
            var form = document.forms.form;
            form.setAttribute("action", url + radio[i].value);
            form.submit();
            break;
        }
    }
        
}
