const DEFAULT_SECTONS_NAME = 0;
const DEFAULT_SECTION_AGE_COLUMN = 1;
const DEFAULT_SECTION_NAME_COLUMN = 0;

const DEFAULT_AGE_COLUMN = 0;
const DEFAULT_DATE_COLUMN = 1;
const DEFAULT_NAME_COLUMN = 2;
const DEFAULT_TYPE_COLUMN = 3;

const SUMMARY_SHEET_NAME = "Resumen";

var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheets = spreadsheet.getSheets();
/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
  return createSelectionCard(
    e,
    DEFAULT_SECTONS_NAME,
    DEFAULT_SECTION_AGE_COLUMN,
    DEFAULT_SECTION_NAME_COLUMN,
    DEFAULT_AGE_COLUMN,
    DEFAULT_DATE_COLUMN,
    DEFAULT_NAME_COLUMN,
    DEFAULT_TYPE_COLUMN
  );
}

/**
 * Main function to generate the main card.
 * @param {String} age Age of the activity the original text.
 * @param {String} date Date for the activity.
 * @param {String} name Name of the activity.
 * @param {String} type Type for the activity.
 * @return {CardService.Card} The card to show to the user.
 */
function createSelectionCard(
  e,
  sectionsSheet,
  ageSectionColumn,
  nameSectionColumn,
  age,
  date,
  name,
  type
) {
  var builder = CardService.newCardBuilder();
  var sheetNames = sheets.map(function (element) {
    return element.getName();
  });

  var infoSections = CardService.newTextParagraph().setText(
    "Seleccionar la hoja con la información de las aulas:"
  );

  var sections = CardService.newCardSection()
    .addWidget(infoSections)
    .addWidget(
      generateDropdown(
        sheetNames,
        "sectionsSheet",
        "Aulas: ",
        sectionsSheet
      ).setOnChangeAction(
        CardService.newAction().setFunctionName("handleSheetChange")
      )
    );

  var headerSection = spreadsheet
    .getSheetByName(sheetNames[sectionsSheet])
    .getDataRange()
    .getValues()[0];

  var infoSectionColumns = CardService.newTextParagraph().setText(
    "Seleccionar las columnas que contienen el nombre del aula y la edad:"
  );
  sections
    .addWidget(infoSectionColumns)
    .addWidget(
      generateDropdown(
        headerSection,
        "ageSectionColumn",
        "Columna Edad: ",
        ageSectionColumn
      )
    )
    .addWidget(
      generateDropdown(
        headerSection,
        "nameSectionColumn",
        "Columna Aula: ",
        nameSectionColumn
      )
    );

  builder.addSection(sections);

  //Buttons section
  builder.addSection(
    CardService.newCardSection().addWidget(
      CardService.newButtonSet().addButton(
        CardService.newTextButton()
          .setText("Generar Hoja Resumen")
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setOnClickAction(
            CardService.newAction().setFunctionName("generateSummary")
          )
          .setDisabled(false)
      )
    )
  );

  var summarySheet = spreadsheet.getSheetByName(SUMMARY_SHEET_NAME);
  if (summarySheet) {
    var header = summarySheet.getDataRange().getValues()[0];

    var infoSummaryColumns = CardService.newTextParagraph().setText(
      "Seleccionar las columnas  en la hoja 'Resumen' para generar el documento:"
    );
    // "From" language selection & text input section
    var fromSection = CardService.newCardSection()
      .addWidget(infoSummaryColumns)
      .addWidget(generateDropdown(header, "age", "Edad: ", age))
      .addWidget(generateDropdown(header, "date", "Fecha: ", date))
      .addWidget(generateDropdown(header, "name", "Nombre: ", name))
      .addWidget(generateDropdown(header, "type", "Tipo: ", type));

    builder.addSection(fromSection);
  } else {
    var infoNotSummary = CardService.newTextParagraph().setText(
      "No existe hoja 'Resumen', hacer clic en el botón de arriba para generarla."
    );
    // "From" language selection & text input section
    var fromSection = CardService.newCardSection().addWidget(infoNotSummary);

    builder.addSection(fromSection);
  }

  //Buttons section
  builder.addSection(
    CardService.newCardSection().addWidget(
      CardService.newButtonSet().addButton(
        CardService.newTextButton()
          .setText("Generar")
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setOnClickAction(
            CardService.newAction().setFunctionName("generateDoc")
          )
          .setDisabled(summarySheet ? false : true)
      )
    )
  );

  return builder.build();
}

function handleSheetChange(e) {
  var sheetIdx = parseInt(e.formInput.sectionsSheet);

  return CardService.newNavigation().updateCard(
    createSelectionCard(
      e,
      sheetIdx,
      DEFAULT_SECTION_AGE_COLUMN,
      DEFAULT_SECTION_NAME_COLUMN,
      DEFAULT_AGE_COLUMN,
      DEFAULT_DATE_COLUMN,
      DEFAULT_NAME_COLUMN,
      DEFAULT_TYPE_COLUMN
    )
  );
}

function generateDropdown(values, fieldName, fieldTitle, previousSelected) {
  var selectionInput = CardService.newSelectionInput()
    .setTitle(fieldTitle)
    .setFieldName(fieldName)
    .setType(CardService.SelectionInputType.DROPDOWN);

  values.forEach((title, index, array) => {
    selectionInput.addItem(title, index, index == previousSelected);
  });

  return selectionInput;
}

function generateSummary(e) {
  var sheetIdx = parseInt(e.formInput.sectionsSheet);
  var age = parseInt(e.formInput.ageSectionColumn);
  var name = parseInt(e.formInput.nameSectionColumn);

  var sheetNames = sheets.map(function (element) {
    return element.getName();
  });

  console.log(sheetNames);
  console.log(sheetNames[sheetIdx]);
  var sheet = spreadsheet.getSheetByName(sheetNames[sheetIdx]);
  var range = sheet.getDataRange();
  var filter = range.getFilter() || range.createFilter();
  filter.sort(age + 1, true);

  var values = range.getValues().slice(1);

  var summarySheet = spreadsheet.getSheetByName(SUMMARY_SHEET_NAME);
  if (summarySheet) {
    summarySheet.clear();
  } else {
    summarySheet = spreadsheet.insertSheet(SUMMARY_SHEET_NAME);
  }

  var summaryHeader = [["Edad", "Fecha", "Actividad", "Tipo", "Aula"]];
  var range = summarySheet.getRange(
    1,
    1,
    summaryHeader.length,
    summaryHeader[0].length
  );
  range.setValues(summaryHeader);

  values.forEach(function (element) {
    copyToSummary(e, summarySheet, element[name], element[age], 0, 1, 2);
  });

  return CardService.newNavigation().updateCard(
    createSelectionCard(
      e,
      sheetIdx,
      age,
      name,
      DEFAULT_AGE_COLUMN,
      DEFAULT_DATE_COLUMN,
      DEFAULT_NAME_COLUMN,
      DEFAULT_TYPE_COLUMN
    )
  );
}

function copyToSummary(
  e,
  summarySheet,
  sectionName,
  sectionAge,
  dateColumn,
  activityColumn,
  typeColumn
) {
  var sectionSheet = spreadsheet.getSheetByName(sectionName);
  var sectionRange = sectionSheet.getDataRange();
  var sectionValues = sectionRange.getValues().slice(1);

  var extendedValues = sectionValues.map(function (element) {
    return [
      sectionAge,
      element[dateColumn],
      element[activityColumn],
      element[typeColumn],
      sectionName,
    ];
  });

  var lastRow = summarySheet.getLastRow();
  var range = summarySheet.getRange(
    lastRow + 1,
    1,
    extendedValues.length,
    extendedValues[0].length
  );
  range.setValues(extendedValues);
}

function generateDoc(e) {
  var age = parseInt(e.formInput.age);
  var name = parseInt(e.formInput.name);
  var date = parseInt(e.formInput.date);
  var type = parseInt(e.formInput.type);

  var title = spreadsheet.getName();
  var sheet = spreadsheet.getSheetByName(SUMMARY_SHEET_NAME);
  var range = sheet.getDataRange();
  var filter = range.getFilter() || range.createFilter();
  filter.sort(1, true);

  var mapped = range
    .getValues()
    .slice(1)
    .reduce(function (r, a) {
      var idx = r.findIndex(function (element) {
        //Logger.log(element)
        return element["age"] === a[age];
      });

      if (idx < 0) {
        r.push({
          age: a[age],
          dates: [
            {
              id: a[date],
              activities: [
                {
                  type: a[type],
                  text: a[name],
                },
              ],
            },
          ],
        });
      } else {
        var jdx = r[idx]["dates"].findIndex(function (element) {
          return element["id"].valueOf() === a[date].valueOf();
        });
        if (jdx < 0) {
          r[idx]["dates"].push({
            id: a[date],
            activities: [
              {
                type: a[type],
                text: a[name],
              },
            ],
          });
        } else {
          r[idx]["dates"][jdx]["activities"].push({
            type: a[type],
            text: a[name],
          });
        }
      }
      return r;
    }, []);

  Logger.log(mapped);
  var doc = DocumentApp.create(title);
  var body = doc.getBody();

  body.appendParagraph("Lista de actividades.");

  mapped.map(function (value) {
    body.appendParagraph(Utilities.formatString("%i años", value["age"]));
    body.appendHorizontalRule;

    value["dates"].map(function (date) {
      body.appendParagraph(
        LanguageApp.translate(
          Utilities.formatDate(date["id"], "GMT", "EEEE, d MMMM"),
          "en",
          "es"
        )
      );
      date["activities"].map(function (activity) {
        var list = body.appendListItem(activity["text"]);
        list.setGlyphType(DocumentApp.GlyphType.BULLET);
      });
    });
  });
}
