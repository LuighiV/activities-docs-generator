const DEFAULT_AGE_COLUMN = 0;
const DEFAULT_DATE_COLUMN = 1;
const DEFAULT_NAME_COLUMN = 2;
const DEFAULT_TYPE_COLUMN = 3;

var sheet = SpreadsheetApp.getActiveSheet();
var header = sheet.getDataRange().getValues()[0];

/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
  return createSelectionCard(e, DEFAULT_AGE_COLUMN, DEFAULT_DATE_COLUMN, DEFAULT_NAME_COLUMN, DEFAULT_TYPE_COLUMN);
}

/**
 * Main function to generate the main card.
 * @param {String} age Age of the activity the original text.
 * @param {String} date Date for the activity.
 * @param {String} name Name of the activity.
 * @param {String} type Type for the activity.
 * @return {CardService.Card} The card to show to the user.
 */
function createSelectionCard(e, age, date, name, type) {
  var hostApp = e['hostApp'];
  var builder = CardService.newCardBuilder();

  // "From" language selection & text input section
  var fromSection = CardService.newCardSection()
    .addWidget(generateDropdown('age', 'Edad: ', age))
    .addWidget(generateDropdown('date', 'Fecha: ', date))
    .addWidget(generateDropdown('name', 'Nombre: ', name))
    .addWidget(generateDropdown('type', 'Tipo: ', type))

  builder.addSection(fromSection);

  //Buttons section
  builder.addSection(CardService.newCardSection()
    .addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText('Generar')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setOnClickAction(CardService.newAction().setFunctionName('generateDoc'))
        .setDisabled(false))));

  return builder.build();

}

function generateDropdown(fieldName, fieldTitle, previousSelected) {

  var selectionInput = CardService.newSelectionInput().setTitle(fieldTitle)
    .setFieldName(fieldName)
    .setType(CardService.SelectionInputType.DROPDOWN);

  header.forEach((title, index, array) => {
    selectionInput.addItem(title, index, index == previousSelected);
  })

  return selectionInput;
}

function generateDoc (e){
  var age = parseInt(e.formInput.age);
  var name = parseInt(e.formInput.name);
  var date = parseInt(e.formInput.date);
  var type = parseInt(e.formInput.type);
  
  var title = SpreadsheetApp.getActiveSpreadsheet().getName();
  var range = sheet.getDataRange()
  var filter = range.getFilter() || range.createFilter();
  filter.sort(1,true)
  
  var mapped = range.getValues().slice(1).reduce(function(r,a){

    var idx = r.findIndex(function(element){
      //Logger.log(element)
      return (element['age']===a[age])
    })

    if(idx<0){
      r.push({
        age: a[age],
        dates: [
          {
            id:a[date],
            activities: [
              {
                type:a[type],
                text:a[name]
              }
            ]
          }
        ]
      })
    }
    else{
      var jdx = r[idx]['dates'].findIndex(function(element){
        return (element['id'].valueOf()===a[date].valueOf())
      })
      if(jdx<0){
        r[idx]['dates'].push({
          id:a[date],
          activities: [
            {
              type:a[type],
              text:a[name]
            }
          ]
        })
      }
      else{
        r[idx]['dates'][jdx]['activities'].push(
          {
            type:a[type],
            text:a[name]
          } 
        )
      }
    }
    return r;
  },[])

  Logger.log(mapped)
  var doc = DocumentApp.create(title);
  var body = doc.getBody()

  body.appendParagraph("Lista de actividades.");

  mapped.map(function(value){
    body.appendParagraph(Utilities.formatString('%i años', value['age']))
    body.appendHorizontalRule

    value['dates'].map(function(date){
      body.appendParagraph(LanguageApp.translate(Utilities.formatDate(date['id'], "GMT", "EEEE, d MMMM"),'en','es'))
      date['activities'].map(function(activity){
        var list = body.appendListItem(activity['text'])
        list.setGlyphType(DocumentApp.GlyphType.BULLET);
      })
    })
  })

}
