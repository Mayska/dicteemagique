
function init(){
    $.get('/mot', function(data){
        initStart();
        var template = $('#template').html();
        console.log(data);
        $('#selectMot').val(data.selectMot);
        var rendered = Mustache.render(template, data);
        $('#target').html(rendered);
    });
}

function valider(){
    $("#erreur").hide();
    if($('#monMot').val() == ""){
        $("#erreur").html("Champs vide");
        $("#erreur").show();
    }
    else{
        initHide();
        if($('#monMot').val().toLowerCase() == $('#selectMot').val().toLowerCase()){
            $("#exact").show("slow");
        }
        else{
            //console.log("ERREUR")
            $("#erreur").html("ERREUR => " + $('#selectMot').val());
            $("#erreur").show("slow");
        }
        $("#new").show("slow");
    } 
}

function effacer(){
    $("#monMot").val("");
}

function lettre(string){
    if(string != 'ap'){
        var mot = $("#monMot").val() + string;
        $("#monMot").val(mot);
    }
    else{
        var mot = $("#monMot").val() + "'";
        $("#monMot").val(mot);
    }
    $("#monMot").focus();
}

function initStart(){
    $("#exact").hide();
    $("#erreur").hide();
    $("#new").hide();
    $("#monMot").val("").focus();
    $("#valide").show();
    $("#effacer").show();
    $("#lettre").show();
}

function initHide(){
    $("#valide").hide();
    $("#effacer").hide();
    $("#lettre").hide();
}