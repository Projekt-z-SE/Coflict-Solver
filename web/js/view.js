
class View{
    constructor() {
       this.leftTextPanel=new TextDisplay("textOneContent");
       this.rightTextPanel=new TextDisplay("textTwoContent");
       this.utility=new UtilityDisplay();
       this.list=new DifferenceList();
    }

    setLeftText(value){
        this.leftTextPanel.setText(value);
    }

    setRightText(value){
        this.rightTextPanel.setText(value);
    }

    setLeftFile(value){
        this.utility.setFirstPath(value);
    }

    setRightFile(value){
        this.utility.setSecondPath(value);
    }

    getLeftFile(){
        return this.utility.getFirstPath();
    }
    getRightFile(){
        return this.utility.getSecondPath();
    }

    addRow(leftText, rightText, id){
        this.list.addRow(leftText, rightText, id);
    }

    addRow(table){
        for (const element of table) {
            this.list.addRow(element[0], element[1], element[2]);

        }
    }

    addRows(json){
        this.list.addRows(json);
    }

    getChoosenElement(){
        return this.list.getSelected();
    }

    clearTable(){
        this.list.clearTable();
    }

    cancelCompare(){
        this.clearTable();
        document.getElementById("selection").hidden=true;
        document.getElementById("options").hidden=false;
    }

    solveCompare(){
        try{
            eel.solveConflict(this.getChoosenElement(), $('input[name="conflictOption"]:checked').val(), $('textarea[name="thirdOptionValue"]').val());

        }catch (e) {
            return;
        }
    }

    loadFile(){
        try{
            eel.setSplitSettings($('input[name="mode"]:checked').val(), parseInt(document.getElementById("N").value))
         if (document.getElementById('fileOnePath').value == '' || document.getElementById('fileTwoPath').value == '') {
             return;
         }
         this.clearTable();
         document.getElementById('textOneContent').contentEditable = true;
         document.getElementById('textOneContent').innerHTML = "";
         eel.loadFile(document.getElementById('fileOnePath').value, document.getElementById('fileTwoPath').value);
         document.getElementById("options").hidden = true;
         document.getElementById("selection").hidden = false;
        }catch (e) {
            return;
        }

    }

}
var viewObject=new View();
eel.expose(setLeftText);
function setLeftText(value) {
    viewObject.setLeftText(value);
}

eel.expose(setRightText);
function setRightText(value) {
    viewObject.setRightText(value);
}

eel.expose(addRow)
function addRow(leftElement, rightElement, id) {
    viewObject.addRow(leftElement, rightElement, id);
}

eel.expose(addRows)
function addRows(json) {
    viewObject.addRows(json)
}

